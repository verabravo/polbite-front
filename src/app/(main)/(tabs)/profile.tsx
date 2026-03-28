import { useEffect, useCallback, useState } from 'react';
import { View, ScrollView, Pressable, Alert, RefreshControl, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogOut, ChevronRight, Target, Activity, Utensils, Heart, Edit2 } from 'lucide-react-native';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import { Typography } from '../../../ui/components/common/Typography';
import { Card } from '../../../ui/components/common/Card';
import { Skeleton } from '../../../ui/components/common/Skeleton';
import { ErrorState } from '../../../ui/components/common/ErrorState';
import { Button } from '../../../ui/components/common/Button';
import { useAuthStore } from '../../../application/stores/useAuthStore';
import { useProfileStore } from '../../../application/stores/useProfileStore';
import {
  GOAL_LABELS,
  ACTIVITY_LABELS,
  SEX_LABELS,
  RESTRICTION_LABELS,
} from '../../../shared/constants';
import {
  type BiologicalSex,
  type ActivityLevel,
  type NutritionalGoal,
  type DietaryRestriction,
} from '../../../domain/models/NutritionalProfile';
import { type SetNutritionalProfilePayload } from '../../../domain/ports/ProfileRepository';
import { colors } from '../../../ui/theme/colors';

interface SettingsRowProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onPress?: () => void;
}

function SettingsRow({ icon, label, value, onPress }: SettingsRowProps) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center gap-4 py-4 px-4 active:bg-muted/30">
      <View className="w-9 h-9 rounded-xl items-center justify-center" style={{ backgroundColor: `${colors.primary}1A` }}>
        {icon}
      </View>
      <View className="flex-1">
        <Typography className="text-foreground font-sans">{label}</Typography>
        {value && <Typography className="text-muted-foreground font-sans text-sm">{value}</Typography>}
      </View>
      {onPress && <ChevronRight size={18} color={colors.mutedForeground} strokeWidth={1.5} />}
    </Pressable>
  );
}

const ACTIVITY_OPTIONS: ActivityLevel[] = ['Sedentary', 'LightlyActive', 'ModeratelyActive', 'VeryActive', 'ExtremelyActive'];
const GOAL_OPTIONS: NutritionalGoal[] = ['LoseWeight', 'Maintain', 'GainMuscle'];
const SEX_OPTIONS: BiologicalSex[] = ['Male', 'Female'];
const RESTRICTION_OPTIONS: DietaryRestriction[] = [
  'GlutenFree', 'LactoseFree', 'Vegetarian', 'Vegan',
  'NutAllergy', 'ShellfishAllergy', 'EggFree', 'SoyFree', 'PorkFree',
];

export default function ProfileScreen() {
  const { user, logout, getUserId } = useAuthStore();
  const { profile, isLoading, error, fetchProfile, saveProfile, clearError } = useProfileStore();
  const [showEdit, setShowEdit] = useState(false);
  const [saving, setSaving] = useState(false);

  // Edit form state
  const [editWeight, setEditWeight] = useState('');
  const [editHeight, setEditHeight] = useState('');
  const [editBirthDate, setEditBirthDate] = useState('');
  const [editSex, setEditSex] = useState<BiologicalSex>('Male');
  const [editActivity, setEditActivity] = useState<ActivityLevel>('Sedentary');
  const [editGoal, setEditGoal] = useState<NutritionalGoal>('Maintain');
  const [editRestrictions, setEditRestrictions] = useState<DietaryRestriction[]>([]);
  const [editNotes, setEditNotes] = useState('');

  const loadProfile = useCallback(async () => {
    const userId = await getUserId();
    if (userId) fetchProfile(userId);
  }, []);

  useEffect(() => { loadProfile(); }, []);

  const openEdit = () => {
    if (!profile) return;
    setEditWeight(String(profile.weight_kg));
    setEditHeight(String(profile.height_cm));
    setEditBirthDate(profile.date_of_birth);
    setEditSex(profile.biological_sex);
    setEditActivity(profile.activity_level);
    setEditGoal(profile.nutritional_goal);
    setEditRestrictions([...profile.dietary_restrictions] as DietaryRestriction[]);
    setEditNotes(profile.custom_dietary_notes ?? '');
    setShowEdit(true);
  };

  const toggleRestriction = (r: DietaryRestriction) => {
    setEditRestrictions((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r],
    );
  };

  const handleSave = async () => {
    const wkg = parseFloat(editWeight);
    const hcm = parseInt(editHeight, 10);
    if (isNaN(wkg) || isNaN(hcm) || !editBirthDate) {
      Toast.show({ type: 'error', text1: 'Revisa los datos', text2: 'Peso, altura y fecha de nacimiento son obligatorios.' });
      return;
    }

    const payload: SetNutritionalProfilePayload = {
      date_of_birth: editBirthDate,
      biological_sex: editSex,
      height_cm: hcm,
      weight_kg: wkg,
      activity_level: editActivity,
      nutritional_goal: editGoal,
      dietary_restrictions: editRestrictions.map((r) => ({ value: r })),
      custom_dietary_notes: editNotes,
    };

    setSaving(true);
    try {
      await saveProfile(payload);
      const userId = await getUserId();
      if (userId) await fetchProfile(userId);
      setShowEdit(false);
      Toast.show({ type: 'success', text1: 'Perfil actualizado' });
    } catch {
      Toast.show({ type: 'error', text1: 'Error al guardar el perfil' });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Cerrar sesión',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  const restrictions = profile?.dietary_restrictions ?? [];

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 py-8"
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={loadProfile} tintColor={colors.primary} />}
      >
        <Typography
          className="text-foreground text-2xl font-serif mb-8"
          style={{ fontFamily: 'DMSerifDisplay-Regular' }}
        >
          Perfil
        </Typography>

        {/* Avatar + nombre */}
        <View className="items-center mb-8">
          <View className="w-20 h-20 rounded-full items-center justify-center mb-4" style={{ backgroundColor: colors.primary }}>
            <Typography className="text-white text-2xl font-sans-semibold">{initials}</Typography>
          </View>
          <Typography className="text-foreground text-xl font-serif" style={{ fontFamily: 'DMSerifDisplay-Regular' }}>
            {user?.name ?? 'Usuario'}
          </Typography>
          <Typography className="text-muted-foreground font-sans text-sm mt-1">
            {user?.email ?? '—'}
          </Typography>
        </View>

        {/* Datos del perfil */}
        {isLoading && !profile ? (
          <View className="gap-3 mb-6">
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
          </View>
        ) : error && !profile ? (
          <ErrorState message={error} onRetry={() => { clearError(); loadProfile(); }} />
        ) : (
          <Card className="mb-4 overflow-hidden">
            <SettingsRow
              icon={<Target size={18} color={colors.primary} strokeWidth={1.5} />}
              label="Objetivo"
              value={profile?.nutritional_goal ? GOAL_LABELS[profile.nutritional_goal] : '—'}
            />
            <View className="h-px bg-muted mx-4" />
            <SettingsRow
              icon={<Activity size={18} color={colors.primary} strokeWidth={1.5} />}
              label="Datos corporales"
              value={profile
                ? `${profile.weight_kg} kg · ${profile.height_cm} cm · ${SEX_LABELS[profile.biological_sex] ?? '—'}`
                : '—'}
            />
            <View className="h-px bg-muted mx-4" />
            <SettingsRow
              icon={<Heart size={18} color={colors.primary} strokeWidth={1.5} />}
              label="Actividad"
              value={profile?.activity_level ? ACTIVITY_LABELS[profile.activity_level] : '—'}
            />
            <View className="h-px bg-muted mx-4" />
            <SettingsRow
              icon={<Utensils size={18} color={colors.primary} strokeWidth={1.5} />}
              label="Alimentación"
              value={restrictions.length > 0
                ? restrictions.map((r) => RESTRICTION_LABELS[r] ?? r).join(', ')
                : 'Sin restricciones'}
            />
          </Card>
        )}

        {profile && (
          <Pressable
            onPress={openEdit}
            className="flex-row items-center gap-3 p-4 rounded-2xl border border-muted mb-6"
            style={{ backgroundColor: colors.card }}
          >
            <Edit2 size={18} color={colors.primary} strokeWidth={1.5} />
            <Typography className="text-foreground font-sans-medium flex-1">Editar perfil</Typography>
            <ChevronRight size={18} color={colors.mutedForeground} strokeWidth={1.5} />
          </Pressable>
        )}

        {/* Cerrar sesión */}
        <Pressable
          onPress={handleLogout}
          className="flex-row items-center gap-3 p-4 rounded-2xl border border-destructive/20"
          style={{ backgroundColor: `${colors.destructive}08` }}
        >
          <LogOut size={20} color={colors.destructive} strokeWidth={1.5} />
          <Typography className="text-destructive font-sans-medium">Cerrar sesión</Typography>
        </Pressable>

        <Typography className="text-muted-foreground/40 font-sans text-xs text-center mt-8">
          Polbite v1.0
        </Typography>
      </ScrollView>

      {/* Edit modal */}
      <Modal visible={showEdit} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView className="flex-1 bg-background">
          <View className="flex-row items-center px-4 py-3 border-b border-muted">
            <Pressable onPress={() => setShowEdit(false)} className="p-2 -ml-2">
              <Typography className="text-primary font-sans">Cancelar</Typography>
            </Pressable>
            <Typography
              className="flex-1 text-center text-foreground text-lg font-serif"
              style={{ fontFamily: 'DMSerifDisplay-Regular' }}
            >
              Editar perfil
            </Typography>
            <View className="w-16" />
          </View>

          <ScrollView className="flex-1" contentContainerClassName="px-6 py-6 gap-5" keyboardShouldPersistTaps="handled">
            {/* Weight */}
            <View>
              <Typography className="text-foreground font-sans-medium mb-2">Peso (kg)</Typography>
              <TextInput
                className="bg-input-bg rounded-2xl border border-input-border px-4 py-3 text-foreground font-sans"
                keyboardType="decimal-pad"
                value={editWeight}
                onChangeText={setEditWeight}
                placeholder="73.2"
                placeholderTextColor={colors.mutedForeground}
              />
            </View>

            {/* Height */}
            <View>
              <Typography className="text-foreground font-sans-medium mb-2">Altura (cm)</Typography>
              <TextInput
                className="bg-input-bg rounded-2xl border border-input-border px-4 py-3 text-foreground font-sans"
                keyboardType="numeric"
                value={editHeight}
                onChangeText={setEditHeight}
                placeholder="175"
                placeholderTextColor={colors.mutedForeground}
              />
            </View>

            {/* Birth date */}
            <View>
              <Typography className="text-foreground font-sans-medium mb-2">Fecha de nacimiento</Typography>
              <TextInput
                className="bg-input-bg rounded-2xl border border-input-border px-4 py-3 text-foreground font-sans"
                value={editBirthDate}
                onChangeText={setEditBirthDate}
                placeholder="AAAA-MM-DD"
                placeholderTextColor={colors.mutedForeground}
              />
            </View>

            {/* Biological sex */}
            <View>
              <Typography className="text-foreground font-sans-medium mb-2">Sexo biológico</Typography>
              <View className="flex-row gap-3">
                {SEX_OPTIONS.map((s) => (
                  <Pressable
                    key={s}
                    onPress={() => setEditSex(s)}
                    className="flex-1 py-3 rounded-2xl border-2 items-center"
                    style={editSex === s
                      ? { borderColor: colors.primary, backgroundColor: `${colors.primary}0D` }
                      : { borderColor: colors.muted, backgroundColor: colors.card }}
                  >
                    <Typography className={`font-sans-medium ${editSex === s ? 'text-primary' : 'text-foreground'}`}>
                      {SEX_LABELS[s]}
                    </Typography>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Activity level */}
            <View>
              <Typography className="text-foreground font-sans-medium mb-2">Nivel de actividad</Typography>
              <View className="gap-2">
                {ACTIVITY_OPTIONS.map((a) => (
                  <Pressable
                    key={a}
                    onPress={() => setEditActivity(a)}
                    className="py-3 px-4 rounded-2xl border-2"
                    style={editActivity === a
                      ? { borderColor: colors.primary, backgroundColor: `${colors.primary}0D` }
                      : { borderColor: colors.muted, backgroundColor: colors.card }}
                  >
                    <Typography className={`font-sans-medium ${editActivity === a ? 'text-primary' : 'text-foreground'}`}>
                      {ACTIVITY_LABELS[a]}
                    </Typography>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Nutritional goal */}
            <View>
              <Typography className="text-foreground font-sans-medium mb-2">Objetivo nutricional</Typography>
              <View className="gap-2">
                {GOAL_OPTIONS.map((g) => (
                  <Pressable
                    key={g}
                    onPress={() => setEditGoal(g)}
                    className="py-3 px-4 rounded-2xl border-2"
                    style={editGoal === g
                      ? { borderColor: colors.primary, backgroundColor: `${colors.primary}0D` }
                      : { borderColor: colors.muted, backgroundColor: colors.card }}
                  >
                    <Typography className={`font-sans-medium ${editGoal === g ? 'text-primary' : 'text-foreground'}`}>
                      {GOAL_LABELS[g]}
                    </Typography>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Dietary restrictions */}
            <View>
              <Typography className="text-foreground font-sans-medium mb-2">Restricciones dietéticas</Typography>
              <View className="flex-row flex-wrap gap-2">
                {RESTRICTION_OPTIONS.map((r) => {
                  const active = editRestrictions.includes(r);
                  return (
                    <Pressable
                      key={r}
                      onPress={() => toggleRestriction(r)}
                      className="px-4 py-2 rounded-full border"
                      style={active
                        ? { backgroundColor: colors.primary, borderColor: colors.primary }
                        : { backgroundColor: colors.card, borderColor: colors.muted }}
                    >
                      <Typography className={`font-sans-medium text-sm ${active ? 'text-white' : 'text-foreground'}`}>
                        {RESTRICTION_LABELS[r]}
                      </Typography>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Custom notes */}
            <View>
              <Typography className="text-foreground font-sans-medium mb-2">Notas adicionales</Typography>
              <TextInput
                multiline
                numberOfLines={3}
                value={editNotes}
                onChangeText={setEditNotes}
                placeholder="Preferencias o notas especiales..."
                placeholderTextColor={colors.mutedForeground}
                className="bg-input-bg rounded-2xl border border-input-border p-4 text-foreground font-sans"
                style={{ minHeight: 80, textAlignVertical: 'top' }}
              />
            </View>

            <Button onPress={handleSave} isLoading={saving}>
              Guardar cambios
            </Button>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
