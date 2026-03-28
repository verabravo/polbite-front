import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Leaf, Mail, Lock } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../ui/components/common/Typography';
import { Input } from '../../ui/components/common/Input';
import { Button } from '../../ui/components/common/Button';
import { useAuthStore } from '../../application/stores/useAuthStore';
import { loginSchema, type LoginFormValues } from '../../shared/validators';
import { colors } from '../../ui/theme/colors';

export default function LoginScreen() {
  const { login, isLoading, error, clearError } = useAuthStore();

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: LoginFormValues) => {
    clearError();
    try {
      await login(values.email, values.password);
      router.replace('/(main)/(tabs)/diet');
    } catch {
      // error ya está en el store
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
          <View className="flex-row items-center gap-2 mb-12">
            <Leaf size={24} color={colors.primary} strokeWidth={1.5} />
            <Typography
              className="text-primary text-2xl font-serif"
              style={{ fontFamily: 'DMSerifDisplay-Regular' }}
            >
              polbite
            </Typography>
          </View>

          {/* Título */}
          <View className="mb-10">
            <Typography
              className="text-foreground text-4xl font-serif"
              style={{ fontFamily: 'DMSerifDisplay-Regular' }}
            >
              Bienvenido de nuevo
            </Typography>
          </View>

          {/* Formulario */}
          <View className="gap-5">
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

            <Button
              onPress={handleSubmit(onSubmit)}
              isLoading={isLoading}
              className="mt-6"
            >
              Iniciar sesión
            </Button>

            {error && (
              <View className="bg-destructive/10 rounded-2xl px-4 py-3 mt-2">
                <Typography className="text-destructive font-sans text-sm text-center">
                  {error}
                </Typography>
              </View>
            )}
          </View>

          <View className="items-center mt-10">
            <Link href="/(auth)/register">
              <Typography className="text-muted-foreground font-sans text-base">
                ¿No tienes cuenta?{' '}
                <Typography className="text-primary font-sans-medium">
                  Regístrate
                </Typography>
              </Typography>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
