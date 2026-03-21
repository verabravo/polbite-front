import { View, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowDown, ArrowUp, Scale, Dumbbell } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Typography } from '../../ui/components/common/Typography';
import { Button } from '../../ui/components/common/Button';
import { StepIndicator } from '../../ui/components/common/StepIndicator';
import { useProfileStore } from '../../application/stores/useProfileStore';
import { type Goal } from '../../domain/models/Profile';
import { colors } from '../../ui/theme/colors';

const goals: { id: Goal; label: string; Icon: typeof ArrowDown }[] = [
  { id: 'perder', label: 'Perder peso', Icon: ArrowDown },
  { id: 'ganar', label: 'Ganar peso', Icon: ArrowUp },
  { id: 'mantener', label: 'Mantener peso', Icon: Scale },
  { id: 'musculo', label: 'Ganar músculo', Icon: Dumbbell },
];

export default function StepGoalScreen() {
  const { setOnboardingField } = useProfileStore();
  const [selected, setSelected] = useState<Goal | null>(null);

  const onNext = () => {
    if (!selected) return;
    setOnboardingField('goal', selected);
    router.push('/(onboarding)/step-body');
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerClassName="flex-grow px-6 py-8">
        <StepIndicator totalSteps={5} currentStep={1} />

        <View className="mb-8">
          <Typography
            className="text-foreground text-3xl font-serif mb-2"
            style={{ fontFamily: 'DMSerifDisplay-Regular' }}
          >
            ¿Cuál es tu objetivo?
          </Typography>
          <Typography className="text-muted-foreground font-sans">
            Esto nos ayuda a personalizar tu dieta
          </Typography>
        </View>

        <View className="flex-row flex-wrap gap-3 mb-8">
          {goals.map(({ id, label, Icon }) => (
            <Pressable
              key={id}
              onPress={() => setSelected(id)}
              className={`flex-1 min-w-[45%] p-6 rounded-2xl border-2 items-center justify-center gap-3 min-h-[140px] ${
                selected === id
                  ? 'border-primary bg-primary/5'
                  : 'border-muted bg-card'
              }`}
              style={selected === id ? { borderColor: colors.primary, backgroundColor: `${colors.primary}0D` } : { borderColor: colors.muted, backgroundColor: colors.card }}
            >
              <Icon
                size={32}
                color={selected === id ? colors.primary : colors.mutedForeground}
                strokeWidth={1.5}
              />
              <Typography
                className={`font-sans-medium text-center ${selected === id ? 'text-primary' : 'text-foreground'}`}
              >
                {label}
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
