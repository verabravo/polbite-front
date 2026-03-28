import { View, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../ui/components/common/Typography';
import { Button } from '../../ui/components/common/Button';
import { StepIndicator } from '../../ui/components/common/StepIndicator';
import { useProfileStore } from '../../application/stores/useProfileStore';
import { type ActivityLevel } from '../../domain/models/NutritionalProfile';
import { ACTIVITY_LABELS } from '../../shared/constants';
import { colors } from '../../ui/theme/colors';

const activityOptions: { id: ActivityLevel; description: string }[] = [
  { id: 'Sedentary', description: 'Poco o ningún ejercicio' },
  { id: 'LightlyActive', description: '1–3 días/semana de ejercicio ligero' },
  { id: 'ModeratelyActive', description: '3–5 días/semana de ejercicio moderado' },
  { id: 'VeryActive', description: '6–7 días/semana de ejercicio intenso' },
  { id: 'ExtremelyActive', description: 'Ejercicio muy intenso o trabajo físico' },
];

export default function StepActivityScreen() {
  const { setOnboardingField } = useProfileStore();
  const [selected, setSelected] = useState<ActivityLevel | null>(null);

  const onNext = () => {
    if (!selected) return;
    setOnboardingField('activity_level', selected);
    router.push('/(onboarding)/step-food');
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerClassName="flex-grow px-6 py-8">
        <StepIndicator totalSteps={5} currentStep={3} />

        <View className="mb-8">
          <Typography
            className="text-foreground text-3xl font-serif mb-2"
            style={{ fontFamily: 'DMSerifDisplay-Regular' }}
          >
            Nivel de actividad
          </Typography>
          <Typography className="text-muted-foreground font-sans">
            ¿Cuánto te mueves habitualmente?
          </Typography>
        </View>

        <View className="gap-3 mb-8">
          {activityOptions.map(({ id, description }) => (
            <Pressable
              key={id}
              onPress={() => setSelected(id)}
              className="p-5 rounded-2xl border-2"
              style={selected === id
                ? { borderColor: colors.primary, backgroundColor: `${colors.primary}0D` }
                : { borderColor: colors.muted, backgroundColor: colors.card }
              }
            >
              <Typography className={`font-sans-semibold mb-1 ${selected === id ? 'text-primary' : 'text-foreground'}`}>
                {ACTIVITY_LABELS[id]}
              </Typography>
              <Typography className="text-muted-foreground font-sans text-sm">
                {description}
              </Typography>
            </Pressable>
          ))}
        </View>

        <View className="mt-auto pb-4">
          <Button onPress={onNext} disabled={!selected}>
            Siguiente
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
