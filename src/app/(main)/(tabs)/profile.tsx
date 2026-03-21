import { View, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, LogOut, ChevronRight, Target, Activity, Utensils } from 'lucide-react-native';
import { router } from 'expo-router';
import { Typography } from '../../../ui/components/common/Typography';
import { Card } from '../../../ui/components/common/Card';
import { useAuthStore } from '../../../application/stores/useAuthStore';
import { colors } from '../../../ui/theme/colors';

interface SettingsRowProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}

function SettingsRow({ icon, label, onPress }: SettingsRowProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-4 py-4 px-4 active:bg-muted/30"
    >
      <View
        className="w-9 h-9 rounded-xl items-center justify-center"
        style={{ backgroundColor: `${colors.primary}1A` }}
      >
        {icon}
      </View>
      <Typography className="flex-1 text-foreground font-sans">{label}</Typography>
      <ChevronRight size={18} color={colors.mutedForeground} strokeWidth={1.5} />
    </Pressable>
  );
}

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();

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

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView className="flex-1" contentContainerClassName="px-6 py-8">
        <Typography
          className="text-foreground text-2xl font-serif mb-8"
          style={{ fontFamily: 'DMSerifDisplay-Regular' }}
        >
          Perfil
        </Typography>

        {/* Avatar + nombre */}
        <View className="items-center mb-8">
          <View
            className="w-20 h-20 rounded-full items-center justify-center mb-4"
            style={{ backgroundColor: `${colors.primary}1A` }}
          >
            <User size={36} color={colors.primary} strokeWidth={1.5} />
          </View>
          <Typography
            className="text-foreground text-xl font-serif"
            style={{ fontFamily: 'DMSerifDisplay-Regular' }}
          >
            {user?.name ?? 'Usuario'}
          </Typography>
          <Typography className="text-muted-foreground font-sans text-sm mt-1">
            {user?.email ?? '—'}
          </Typography>
        </View>

        {/* Configuración */}
        <Card className="mb-6 overflow-hidden">
          <SettingsRow
            icon={<Target size={18} color={colors.primary} strokeWidth={1.5} />}
            label="Mi objetivo"
            onPress={() => {}}
          />
          <View className="h-px bg-muted mx-4" />
          <SettingsRow
            icon={<Activity size={18} color={colors.primary} strokeWidth={1.5} />}
            label="Datos corporales"
            onPress={() => {}}
          />
          <View className="h-px bg-muted mx-4" />
          <SettingsRow
            icon={<Utensils size={18} color={colors.primary} strokeWidth={1.5} />}
            label="Preferencias alimentarias"
            onPress={() => {}}
          />
        </Card>

        {/* Cerrar sesión */}
        <Pressable
          onPress={handleLogout}
          className="flex-row items-center gap-3 p-4 rounded-2xl border border-destructive/20"
          style={{ backgroundColor: `${colors.destructive}08` }}
        >
          <LogOut size={20} color={colors.destructive} strokeWidth={1.5} />
          <Typography className="text-destructive font-sans-medium">Cerrar sesión</Typography>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
