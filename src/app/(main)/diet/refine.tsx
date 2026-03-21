import { View, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { ChevronLeft, Sparkles } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../../ui/components/common/Typography';
import { Button } from '../../../ui/components/common/Button';
import { useDietStore } from '../../../application/stores/useDietStore';
import { useAuthStore } from '../../../application/stores/useAuthStore';
import { colors } from '../../../ui/theme/colors';

const suggestions = [
  'Menos carbohidratos en la cena',
  'Más proteína en el desayuno',
  'Sin alimentos con gluten',
  'Añade más verduras verdes',
  'Reduce las calorías del almuerzo',
];

export default function RefineDietScreen() {
  const [instructions, setInstructions] = useState('');
  const { diet, refineDiet, isLoading } = useDietStore();
  const { user } = useAuthStore();

  const handleRefine = async () => {
    if (!instructions.trim() || !diet) return;
    await refineDiet(diet.id, instructions);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Header */}
        <View className="flex-row items-center px-4 py-3">
          <Pressable onPress={() => router.back()} className="p-2 -ml-2">
            <ChevronLeft size={24} color={colors.foreground} strokeWidth={1.5} />
          </Pressable>
          <Typography
            className="flex-1 text-center text-foreground text-xl font-serif"
            style={{ fontFamily: 'DMSerifDisplay-Regular' }}
          >
            Refinar dieta
          </Typography>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1"
          contentContainerClassName="px-6 pb-8"
          keyboardShouldPersistTaps="handled"
        >
          <View className="items-center mb-6">
            <Sparkles size={32} color={colors.primary} strokeWidth={1.5} />
            <Typography className="text-muted-foreground font-sans text-center mt-2">
              Dile a la IA qué cambiar en tu dieta
            </Typography>
          </View>

          {/* Sugerencias rápidas */}
          <Typography className="text-foreground font-sans-medium mb-3">Sugerencias</Typography>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-2 pb-4"
          >
            {suggestions.map((s) => (
              <Pressable
                key={s}
                onPress={() => setInstructions(s)}
                className="px-4 py-2 rounded-pill border"
                style={{ borderColor: colors.muted, backgroundColor: colors.card }}
              >
                <Typography className="text-foreground font-sans text-sm">{s}</Typography>
              </Pressable>
            ))}
          </ScrollView>

          {/* Textarea */}
          <Typography className="text-foreground font-sans-medium mb-2 mt-4">
            Instrucciones personalizadas
          </Typography>
          <TextInput
            multiline
            numberOfLines={5}
            value={instructions}
            onChangeText={setInstructions}
            placeholder="Ej: Quiero cenar algo más ligero, preferiblemente ensaladas..."
            placeholderTextColor={colors.mutedForeground}
            className="bg-input-bg rounded-2xl border border-input-border p-4 text-foreground font-sans text-base"
            style={{ minHeight: 120, textAlignVertical: 'top' }}
          />

          <Button
            onPress={handleRefine}
            isLoading={isLoading}
            disabled={!instructions.trim()}
            className="mt-6"
          >
            Aplicar cambios
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
