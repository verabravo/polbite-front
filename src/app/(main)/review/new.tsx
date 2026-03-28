import { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Pressable, TextInput, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography } from '../../../ui/components/common/Typography';
import { Input } from '../../../ui/components/common/Input';
import { Button } from '../../../ui/components/common/Button';
import { Card } from '../../../ui/components/common/Card';
import { useReviewStore } from '../../../application/stores/useReviewStore';
import { reviewSchema, type ReviewFormValues } from '../../../shared/validators';
import { AI_RECOMMENDATION_LABELS } from '../../../shared/constants';
import { type WeeklyReview } from '../../../domain/models/WeeklyReview';
import { colors } from '../../../ui/theme/colors';

const LOADING_MESSAGES = [
  'Analizando tu progreso...',
  'Revisando tu alimentación...',
  'Preparando recomendaciones...',
];

export default function NewReviewScreen() {
  const { createReview, isLoading } = useReviewStore();
  const [result, setResult] = useState<WeeklyReview | null>(null);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);

  const { control, handleSubmit, formState: { errors } } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { weight_kg: undefined as unknown as number, week_comment: '', diet_feedback: '' },
  });

  const onSubmit = async (values: ReviewFormValues) => {
    const interval = setInterval(() => {
      setLoadingMsgIdx((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 2000);

    try {
      const review = await createReview({
        weight_kg: values.weight_kg,
        week_comment: values.week_comment || undefined,
        diet_feedback: values.diet_feedback || undefined,
      });
      setResult(review);
    } finally {
      clearInterval(interval);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color={colors.primary} />
        <Typography className="text-muted-foreground font-sans text-center mt-4 text-base">
          {LOADING_MESSAGES[loadingMsgIdx]}
        </Typography>
      </SafeAreaView>
    );
  }

  if (result) {
    const rec = AI_RECOMMENDATION_LABELS[result.ai_recommendation] ?? {
      label: result.ai_recommendation,
      color: colors.primary,
    };

    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-row items-center px-4 py-3">
          <View className="w-10" />
          <Typography
            className="flex-1 text-center text-foreground text-xl font-serif"
            style={{ fontFamily: 'DMSerifDisplay-Regular' }}
          >
            Análisis listo
          </Typography>
          <View className="w-10" />
        </View>

        <ScrollView className="flex-1" contentContainerClassName="px-6 pb-32">
          {/* Recommendation badge */}
          <View className="items-center mb-6">
            <View
              className="px-5 py-2 rounded-full mb-3"
              style={{ backgroundColor: `${rec.color}1A` }}
            >
              <Typography className="font-sans-semibold text-base" style={{ color: rec.color }}>
                {rec.label}
              </Typography>
            </View>
            <Typography className="text-muted-foreground font-sans text-sm">
              {new Date(result.created_at).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Typography>
          </View>

          {/* AI analysis */}
          <Card className="p-5 mb-6">
            <Typography className="text-foreground font-sans-medium mb-3">Análisis de la IA</Typography>
            <Typography className="text-foreground font-sans text-sm leading-relaxed">
              {result.ai_analysis}
            </Typography>
          </Card>

          {/* Weight */}
          <Card className="p-4 mb-6 flex-row justify-between items-center">
            <Typography className="text-muted-foreground font-sans">Peso registrado</Typography>
            <Typography className="text-foreground font-sans-medium">
              {result.weight_kg.toFixed(1).replace('.', ',')} kg
            </Typography>
          </Card>
        </ScrollView>

        <View className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-background border-t border-muted">
          <Button onPress={() => router.replace('/(main)/(tabs)/diet')}>
            {result.ai_recommendation === 'KEEP_PLAN' ? 'Entendido' : 'Aplicar recomendación'}
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        {/* Header */}
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
          contentContainerClassName="px-6 pb-32"
          keyboardShouldPersistTaps="handled"
        >
          {/* Weight */}
          <Card className="p-6 mb-6">
            <Typography className="text-foreground font-sans-medium mb-3">Peso actual (kg) *</Typography>
            <Controller
              control={control}
              name="weight_kg"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="73.2"
                  keyboardType="decimal-pad"
                  onChangeText={(t) => onChange(t ? Number(t) : undefined)}
                  onBlur={onBlur}
                  value={value ? String(value) : ''}
                  error={errors.weight_kg?.message}
                  style={{ fontSize: 32, textAlign: 'center', fontFamily: 'DMSerifDisplay-Regular' }}
                />
              )}
            />
          </Card>

          {/* Week comment */}
          <Typography className="text-foreground font-sans-medium mb-2">
            ¿Cómo ha ido la semana?
          </Typography>
          <Controller
            control={control}
            name="week_comment"
            render={({ field: { onChange, value } }) => (
              <TextInput
                multiline
                numberOfLines={4}
                value={value}
                onChangeText={onChange}
                placeholder="¿Has seguido el plan? ¿Has tenido dificultades?"
                placeholderTextColor={colors.mutedForeground}
                className="bg-input-bg rounded-2xl border border-input-border p-4 text-foreground font-sans text-base mb-6"
                style={{ minHeight: 100, textAlignVertical: 'top' }}
              />
            )}
          />

          {/* Diet feedback */}
          <Typography className="text-foreground font-sans-medium mb-2">
            Feedback sobre la dieta (opcional)
          </Typography>
          <Controller
            control={control}
            name="diet_feedback"
            render={({ field: { onChange, value } }) => (
              <TextInput
                multiline
                numberOfLines={4}
                value={value}
                onChangeText={onChange}
                placeholder="¿Algo de la dieta que quieras cambiar o mejorar?"
                placeholderTextColor={colors.mutedForeground}
                className="bg-input-bg rounded-2xl border border-input-border p-4 text-foreground font-sans text-base"
                style={{ minHeight: 100, textAlignVertical: 'top' }}
              />
            )}
          />
        </ScrollView>

        <View className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-background border-t border-muted">
          <Button onPress={handleSubmit(onSubmit)}>
            Enviar revisión
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
