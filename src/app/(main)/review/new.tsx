import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { Pressable } from 'react-native';
import { ChevronLeft, Star } from 'lucide-react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../../ui/components/common/Typography';
import { Input } from '../../../ui/components/common/Input';
import { Button } from '../../../ui/components/common/Button';
import { colors } from '../../../ui/theme/colors';

function RatingSelector({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <View className="mb-5">
      <Typography className="text-foreground font-sans-medium mb-2">{label}</Typography>
      <View className="flex-row gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <Pressable key={n} onPress={() => onChange(n)}>
            <Star
              size={32}
              color={colors.primary}
              fill={n <= value ? colors.primary : 'transparent'}
              strokeWidth={1.5}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default function NewReviewScreen() {
  const [adherence, setAdherence] = useState('');
  const [weight, setWeight] = useState('');
  const [energy, setEnergy] = useState(3);
  const [hunger, setHunger] = useState(3);

  const handleSave = () => {
    // TODO: CreateWeeklyReviewUseCase
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-row items-center px-4 py-3">
          <Pressable onPress={() => router.back()} className="p-2 -ml-2">
            <ChevronLeft size={24} color={colors.foreground} strokeWidth={1.5} />
          </Pressable>
          <Typography
            className="flex-1 text-center text-foreground text-xl font-serif"
            style={{ fontFamily: 'DMSerifDisplay-Regular' }}
          >
            Revisión semanal
          </Typography>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1"
          contentContainerClassName="px-6 pb-8"
          keyboardShouldPersistTaps="handled"
        >
          <View className="gap-4 mt-4">
            <View>
              <Typography className="text-foreground font-sans-medium mb-2">
                Adherencia a la dieta (%)
              </Typography>
              <Input
                placeholder="85"
                keyboardType="numeric"
                value={adherence}
                onChangeText={setAdherence}
              />
            </View>

            <View>
              <Typography className="text-foreground font-sans-medium mb-2">
                Peso actual (kg) — opcional
              </Typography>
              <Input
                placeholder="73.0"
                keyboardType="decimal-pad"
                value={weight}
                onChangeText={setWeight}
              />
            </View>

            <RatingSelector label="Nivel de energía" value={energy} onChange={setEnergy} />
            <RatingSelector label="Nivel de hambre" value={hunger} onChange={setHunger} />

            <Button onPress={handleSave} className="mt-4">
              Guardar revisión
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
