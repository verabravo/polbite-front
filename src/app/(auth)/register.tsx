import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Leaf, Mail, Lock, User } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../ui/components/common/Typography';
import { Input } from '../../ui/components/common/Input';
import { Button } from '../../ui/components/common/Button';
import { useAuthStore } from '../../application/stores/useAuthStore';
import { registerSchema, type RegisterFormValues } from '../../shared/validators';
import { colors } from '../../ui/theme/colors';

export default function RegisterScreen() {
  const { register, isLoading, error, clearError } = useAuthStore();

  const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    clearError();
    try {
      await register(values.name, values.email, values.password);
      router.replace('/(onboarding)/step-goal');
    } catch {
      // error en el store
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="px-6 py-12"
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <View className="flex-row items-center gap-2 mb-8">
            <Leaf size={24} color={colors.primary} strokeWidth={1.5} />
            <Typography
              className="text-primary text-2xl font-serif"
              style={{ fontFamily: 'DMSerifDisplay-Regular' }}
            >
              polbite
            </Typography>
          </View>

          {/* Título */}
          <View className="mb-8">
            <Typography
              className="text-foreground text-4xl font-serif"
              style={{ fontFamily: 'DMSerifDisplay-Regular' }}
            >
              Crea tu cuenta
            </Typography>
          </View>

          {/* Formulario */}
          <View className="gap-4">
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  leftIcon={<User size={20} color={colors.mutedForeground} strokeWidth={1.5} />}
                  placeholder="Nombre"
                  autoCapitalize="words"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  leftIcon={<Mail size={20} color={colors.mutedForeground} strokeWidth={1.5} />}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  leftIcon={<Lock size={20} color={colors.mutedForeground} strokeWidth={1.5} />}
                  placeholder="Contraseña"
                  isPassword
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  leftIcon={<Lock size={20} color={errors.confirmPassword ? colors.destructive : colors.mutedForeground} strokeWidth={1.5} />}
                  placeholder="Confirmar contraseña"
                  isPassword
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.confirmPassword?.message}
                />
              )}
            />

            <Button
              onPress={handleSubmit(onSubmit)}
              isLoading={isLoading}
              className="mt-6"
            >
              Crear cuenta
            </Button>

            {error && (
              <View className="bg-destructive/10 rounded-2xl px-4 py-3 mt-2">
                <Typography className="text-destructive font-sans text-sm text-center">
                  {error}
                </Typography>
              </View>
            )}
          </View>

          <View className="items-center mt-10 pb-4">
            <Link href="/(auth)/login">
              <Typography className="text-muted-foreground font-sans text-base">
                ¿Ya tienes cuenta?{' '}
                <Typography className="text-primary font-sans-medium">
                  Inicia sesión
                </Typography>
              </Typography>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
