import { View, ScrollView, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../ui/components/common/Typography';
import { Input } from '../../ui/components/common/Input';
import { Button } from '../../ui/components/common/Button';
import { StepIndicator } from '../../ui/components/common/StepIndicator';
import { useProfileStore } from '../../application/stores/useProfileStore';
import { bodyDataSchema, type BodyDataFormValues } from '../../shared/validators';
import { colors } from '../../ui/theme/colors';
import { type Sex } from '../../domain/models/Profile';

export default function StepBodyScreen() {
  const { setOnboardingField } = useProfileStore();

  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<BodyDataFormValues>({
    resolver: zodResolver(bodyDataSchema),
    defaultValues: { sex: 'masculino', birthDate: '', heightCm: undefined as unknown as number, weightKg: undefined as unknown as number },
  });

  const sex = watch('sex');

  const onNext = (values: BodyDataFormValues) => {
    setOnboardingField('sex', values.sex);
    setOnboardingField('birthDate', values.birthDate);
    setOnboardingField('heightCm', values.heightCm);
    setOnboardingField('weightKg', values.weightKg);
    router.push('/(onboarding)/step-activity');
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow px-6 py-8"
          keyboardShouldPersistTaps="handled"
        >
          <StepIndicator totalSteps={5} currentStep={2} />

          <View className="mb-8">
            <Typography
              className="text-foreground text-3xl font-serif mb-2"
              style={{ fontFamily: 'DMSerifDisplay-Regular' }}
            >
              Tus datos corporales
            </Typography>
            <Typography className="text-muted-foreground font-sans">
              Necesitamos esto para calcular tus necesidades calóricas
            </Typography>
          </View>

          <View className="gap-5">
            {/* Sexo */}
            <View>
              <Typography className="text-foreground font-sans-medium mb-2">Sexo</Typography>
              <View className="flex-row gap-3">
                {(['masculino', 'femenino'] as Sex[]).map((s) => (
                  <Pressable
                    key={s}
                    onPress={() => setValue('sex', s)}
                    className="flex-1 py-4 rounded-2xl border-2 items-center"
                    style={sex === s ? { borderColor: colors.primary, backgroundColor: `${colors.primary}0D` } : { borderColor: colors.muted, backgroundColor: colors.card }}
                  >
                    <Typography className={`font-sans-medium capitalize ${sex === s ? 'text-primary' : 'text-foreground'}`}>
                      {s}
                    </Typography>
                  </Pressable>
                ))}
              </View>
            </View>

            <Controller
              control={control}
              name="birthDate"
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Typography className="text-foreground font-sans-medium mb-2">Fecha de nacimiento</Typography>
                  <Input
                    placeholder="DD/MM/AAAA"
                    keyboardType="numeric"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={errors.birthDate?.message}
                  />
                </View>
              )}
            />

            <Controller
              control={control}
              name="heightCm"
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Typography className="text-foreground font-sans-medium mb-2">Altura (cm)</Typography>
                  <Input
                    placeholder="170"
                    keyboardType="numeric"
                    onChangeText={(t) => onChange(Number(t))}
                    onBlur={onBlur}
                    value={value ? String(value) : ''}
                    error={errors.heightCm?.message}
                  />
                </View>
              )}
            />

            <Controller
              control={control}
              name="weightKg"
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Typography className="text-foreground font-sans-medium mb-2">Peso actual (kg)</Typography>
                  <Input
                    placeholder="70"
                    keyboardType="decimal-pad"
                    onChangeText={(t) => onChange(Number(t))}
                    onBlur={onBlur}
                    value={value ? String(value) : ''}
                    error={errors.weightKg?.message}
                  />
                </View>
              )}
            />
          </View>

          <View className="mt-8 pb-4">
            <Button onPress={handleSubmit(onNext)}>Siguiente</Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
