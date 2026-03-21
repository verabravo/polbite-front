import { View, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../ui/components/common/Typography';
import { Button } from '../../ui/components/common/Button';
import { StepIndicator } from '../../ui/components/common/StepIndicator';
import { useProfileStore } from '../../application/stores/useProfileStore';
import { colors } from '../../ui/theme/colors';

const restrictions = [
  'Vegetariano', 'Vegano', 'Sin gluten', 'Sin lactosa',
  'Sin frutos secos', 'Sin mariscos', 'Halal', 'Kosher',
];

export default function StepFoodScreen() {
  const { setOnboardingField } = useProfileStore();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (item: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(item) ? next.delete(item) : next.add(item);
      return next;
    });
  };

  const onNext = () => {
    setOnboardingField('foodPreferences', {
      restrictions: Array.from(selected),
      allergies: [],
      dislikes: [],
    });
    router.push('/(onboarding)/step-summary');
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerClassName="flex-grow px-6 py-8">
        <StepIndicator totalSteps={5} currentStep={4} />

        <View className="mb-8">
          <Typography
            className="text-foreground text-3xl font-serif mb-2"
            style={{ fontFamily: 'DMSerifDisplay-Regular' }}
          >
            Preferencias alimentarias
          </Typography>
          <Typography className="text-muted-foreground font-sans">
            Selecciona todo lo que aplique (opcional)
          </Typography>
        </View>

        <View className="flex-row flex-wrap gap-2 mb-8">
          {restrictions.map((item) => {
            const isActive = selected.has(item);
            return (
              <Pressable
                key={item}
                onPress={() => toggle(item)}
                className="px-4 py-2.5 rounded-pill border"
                style={isActive
                  ? { borderColor: colors.primary, backgroundColor: colors.primary }
                  : { borderColor: colors.muted, backgroundColor: colors.card }
                }
              >
                <Typography className={`font-sans-medium text-sm ${isActive ? 'text-white' : 'text-foreground'}`}>
                  {item}
                </Typography>
              </Pressable>
            );
          })}
        </View>

        <View className="mt-auto pb-4">
          <Button onPress={onNext}>
            {selected.size === 0 ? 'Omitir' : 'Siguiente'}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
