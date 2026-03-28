import { View, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { CheckCircle } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../ui/components/common/Typography';
import { Button } from '../../ui/components/common/Button';
import { Card } from '../../ui/components/common/Card';
import { StepIndicator } from '../../ui/components/common/StepIndicator';
import { useProfileStore } from '../../application/stores/useProfileStore';
import { useDietStore } from '../../application/stores/useDietStore';
import { GOAL_LABELS, ACTIVITY_LABELS, SEX_LABELS, RESTRICTION_LABELS } from '../../shared/constants';
import { colors } from '../../ui/theme/colors';

export default function StepSummaryScreen() {
  const { onboardingData, saveProfile, isLoading } = useProfileStore();
  const { createMealPlan, fetchMealPlan } = useDietStore();

  const onGenerate = async () => {
    await saveProfile({
      date_of_birth: onboardingData.date_of_birth ?? '',
      biological_sex: onboardingData.biological_sex ?? 'Male',
      height_cm: onboardingData.height_cm ?? 0,
      weight_kg: onboardingData.weight_kg ?? 0,
      activity_level: onboardingData.activity_level ?? 'Sedentary',
      nutritional_goal: onboardingData.nutritional_goal ?? 'Maintain',
      dietary_restrictions: (onboardingData.dietary_restrictions ?? []).map((r) => ({ value: r })),
      custom_dietary_notes: '',
    });

    await createMealPlan({
      meal_plan_id: crypto.randomUUID(),
      meals: [],
    });

    await fetchMealPlan();
    router.replace('/(main)/(tabs)/diet');
  };

  const rows: { label: string; value: string }[] = [
    { label: 'Objetivo', value: onboardingData.nutritional_goal ? (GOAL_LABELS[onboardingData.nutritional_goal] ?? '—') : '—' },
    { label: 'Sexo', value: onboardingData.biological_sex ? (SEX_LABELS[onboardingData.biological_sex] ?? '—') : '—' },
    { label: 'Altura', value: onboardingData.height_cm ? `${onboardingData.height_cm} cm` : '—' },
    { label: 'Peso', value: onboardingData.weight_kg ? `${onboardingData.weight_kg} kg` : '—' },
    { label: 'Actividad', value: onboardingData.activity_level ? (ACTIVITY_LABELS[onboardingData.activity_level] ?? '—') : '—' },
    {
      label: 'Restricciones',
      value: onboardingData.dietary_restrictions?.length
        ? onboardingData.dietary_restrictions.map((r) => RESTRICTION_LABELS[r] ?? r).join(', ')
        : 'Ninguna',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerClassName="flex-grow px-6 py-8">
        <StepIndicator totalSteps={5} currentStep={5} />

        <View className="items-center mb-8">
          <CheckCircle size={56} color={colors.primary} strokeWidth={1.5} />
          <Typography
            className="text-foreground text-3xl font-serif mt-4 mb-2 text-center"
            style={{ fontFamily: 'DMSerifDisplay-Regular' }}
          >
            Resumen de tu perfil
          </Typography>
          <Typography className="text-muted-foreground font-sans text-center">
            Revisa tus datos antes de continuar
          </Typography>
        </View>

        <Card className="p-5 mb-8">
          {rows.map(({ label, value }, i) => (
            <View
              key={label}
              className={`flex-row justify-between py-3 ${i < rows.length - 1 ? 'border-b border-muted' : ''}`}
            >
              <Typography className="text-muted-foreground font-sans">{label}</Typography>
              <Typography className="text-foreground font-sans-medium">{value}</Typography>
            </View>
          ))}
        </Card>

        <View className="pb-4">
          <Button onPress={onGenerate} isLoading={isLoading}>
            Guardar perfil
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
