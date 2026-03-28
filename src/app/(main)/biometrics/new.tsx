import { View, ScrollView, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { Typography } from '../../../ui/components/common/Typography';
import { Input } from '../../../ui/components/common/Input';
import { Button } from '../../../ui/components/common/Button';
import { Card } from '../../../ui/components/common/Card';
import { useBiometricStore } from '../../../application/stores/useBiometricStore';
import { newBiometricSchema, type NewBiometricFormValues } from '../../../shared/validators';
import { METRIC_LABELS } from '../../../shared/constants';
import { colors } from '../../../ui/theme/colors';

type BodyField = Exclude<keyof NewBiometricFormValues, 'weight_kg'>;

const BODY_FIELDS: BodyField[] = [
  'body_fat_percentage',
  'waist_cm',
  'chest_cm',
  'hip_cm',
  'navel_cm',
  'left_thigh_cm',
  'right_thigh_cm',
  'left_bicep_cm',
  'right_bicep_cm',
];

const FIELD_UNITS: Record<BodyField, string> = {
  body_fat_percentage: '%',
  waist_cm: 'cm',
  chest_cm: 'cm',
  hip_cm: 'cm',
  navel_cm: 'cm',
  left_thigh_cm: 'cm',
  right_thigh_cm: 'cm',
  left_bicep_cm: 'cm',
  right_bicep_cm: 'cm',
};

export default function NewBiometricScreen() {
  const { entries, createEntry, isLoading } = useBiometricStore();
  const [showBody, setShowBody] = useState(false);

  const now = new Date();
  const dateStr = now.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

  // Pre-fill optional fields from the latest entry
  const latest = entries[0];
  const defaultValues: NewBiometricFormValues = {
    weight_kg: undefined as unknown as number,
    body_fat_percentage: latest?.body_fat_percentage ?? undefined,
    waist_cm: latest?.waist_cm ?? undefined,
    chest_cm: latest?.chest_cm ?? undefined,
    hip_cm: latest?.hip_cm ?? undefined,
    navel_cm: latest?.navel_cm ?? undefined,
    left_thigh_cm: latest?.left_thigh_cm ?? undefined,
    right_thigh_cm: latest?.right_thigh_cm ?? undefined,
    left_bicep_cm: latest?.left_bicep_cm ?? undefined,
    right_bicep_cm: latest?.right_bicep_cm ?? undefined,
  };

  const { control, handleSubmit, formState: { errors } } = useForm<NewBiometricFormValues>({
    resolver: zodResolver(newBiometricSchema),
    defaultValues,
  });

  const onSave = async (values: NewBiometricFormValues) => {
    try {
      await createEntry({
        weight_kg: values.weight_kg,
        body_fat_percentage: values.body_fat_percentage ?? null,
        waist_cm: values.waist_cm ?? null,
        chest_cm: values.chest_cm ?? null,
        hip_cm: values.hip_cm ?? null,
        navel_cm: values.navel_cm ?? null,
        left_thigh_cm: values.left_thigh_cm ?? null,
        right_thigh_cm: values.right_thigh_cm ?? null,
        left_bicep_cm: values.left_bicep_cm ?? null,
        right_bicep_cm: values.right_bicep_cm ?? null,
      });
      Toast.show({ type: 'success', text1: 'Registro guardado' });
      router.replace('/(main)/(tabs)/progress');
    } catch {
      Toast.show({ type: 'error', text1: 'Error al guardar el registro' });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        {/* Header */}
        <View className="flex-row items-center px-4 py-3">
          <Pressable onPress={() => router.back()} className="p-2 -ml-2">
            <ChevronLeft size={24} color={colors.foreground} strokeWidth={1.5} />
          </Pressable>
          <Typography
            className="flex-1 text-center text-foreground text-xl font-serif"
            style={{ fontFamily: 'DMSerifDisplay-Regular' }}
          >
            Nuevo registro
          </Typography>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1"
          contentContainerClassName="px-6 pb-32"
          keyboardShouldPersistTaps="handled"
        >
          <Typography className="text-muted-foreground font-sans text-sm text-center mb-6">
            {dateStr} · {timeStr}
          </Typography>

          {/* Weight */}
          <Card className="p-6 mb-6">
            <Typography className="text-foreground font-sans-medium mb-3">Peso (kg) *</Typography>
            <Controller
              control={control}
              name="weight_kg"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="73.2"
                  keyboardType="decimal-pad"
                  onChangeText={(t) => onChange(t ? Number(t) : undefined)}
                  onBlur={onBlur}
                  value={value ? String(value) : ''}
                  error={errors.weight_kg?.message}
                  style={{ fontSize: 32, textAlign: 'center', fontFamily: 'DMSerifDisplay-Regular' }}
                />
              )}
            />
          </Card>

          {/* Body measurements toggle */}
          <Pressable
            onPress={() => setShowBody((p) => !p)}
            className="flex-row items-center justify-between py-3 mb-4"
          >
            <Typography className="text-foreground font-sans-medium">Añadir medidas corporales</Typography>
            {showBody
              ? <ChevronUp size={20} color={colors.mutedForeground} strokeWidth={1.5} />
              : <ChevronDown size={20} color={colors.mutedForeground} strokeWidth={1.5} />
            }
          </Pressable>

          {showBody && (
            <View className="flex-row flex-wrap gap-4 mb-6">
              {BODY_FIELDS.map((field) => (
                <View key={field} className="w-[47%]">
                  <Typography className="text-foreground font-sans text-sm mb-1">
                    {METRIC_LABELS[field]} ({FIELD_UNITS[field]})
                  </Typography>
                  <Controller
                    control={control}
                    name={field}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        placeholder="—"
                        keyboardType="decimal-pad"
                        onChangeText={(t) => onChange(t ? Number(t) : undefined)}
                        onBlur={onBlur}
                        value={value ? String(value) : ''}
                        error={errors[field]?.message}
                      />
                    )}
                  />
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        <View className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-background border-t border-muted">
          <Button onPress={handleSubmit(onSave)} isLoading={isLoading}>
            Guardar registro
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
