import { View, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { CheckCircle } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../ui/components/common/Typography';
import { Button } from '../../ui/components/common/Button';
import { Card } from '../../ui/components/common/Card';
import { StepIndicator } from '../../ui/components/common/StepIndicator';
import { useProfileStore } from '../../application/stores/useProfileStore';
import { GOAL_LABELS, ACTIVITY_LABELS } from '../../shared/constants';
import { colors } from '../../ui/theme/colors';

export default function StepSummaryScreen() {
  const { onboardingData } = useProfileStore();

  const onGenerate = () => {
    // TODO: llamar al use case SaveOnboarding y luego GenerateDiet
    router.replace('/(main)/(tabs)/diet');
  };

  const rows: { label: string; value: string }[] = [
    { label: 'Objetivo', value: onboardingData.goal ? (GOAL_LABELS[onboardingData.goal] ?? '—') : '—' },
    { label: 'Sexo', value: onboardingData.sex ? (onboardingData.sex === 'masculino' ? 'Masculino' : 'Femenino') : '—' },
    { label: 'Altura', value: onboardingData.heightCm ? `${onboardingData.heightCm} cm` : '—' },
    { label: 'Peso', value: onboardingData.weightKg ? `${onboardingData.weightKg} kg` : '—' },
    { label: 'Actividad', value: onboardingData.activityLevel ? (ACTIVITY_LABELS[onboardingData.activityLevel] ?? '—') : '—' },
    {
      label: 'Restricciones',
      value: onboardingData.foodPreferences?.restrictions.length
        ? onboardingData.foodPreferences.restrictions.join(', ')
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
            Revisa tus datos antes de generar la dieta
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
          <Button onPress={onGenerate}>
            Generar mi dieta
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
