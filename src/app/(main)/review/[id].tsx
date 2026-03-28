import { useEffect, useState } from 'react';
import { View, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../../ui/components/common/Typography';
import { Card } from '../../../ui/components/common/Card';
import { ErrorState } from '../../../ui/components/common/ErrorState';
import { useReviewStore } from '../../../application/stores/useReviewStore';
import { AI_RECOMMENDATION_LABELS } from '../../../shared/constants';
import { type WeeklyReview } from '../../../domain/models/WeeklyReview';
import { colors } from '../../../ui/theme/colors';

export default function ReviewDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getReview } = useReviewStore();
  const [review, setReview] = useState<WeeklyReview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getReview(id);
      setReview(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar la revisión');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadData(); }, [id]);

  const rec = review ? (AI_RECOMMENDATION_LABELS[review.ai_recommendation] ?? {
    label: review.ai_recommendation,
    color: colors.primary,
  }) : null;

  return (
    <SafeAreaView className="flex-1 bg-background">
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

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : error ? (
        <ErrorState message={error} onRetry={loadData} />
      ) : review && rec ? (
        <ScrollView className="flex-1" contentContainerClassName="px-6 pb-8">
          {/* Date + recommendation badge */}
          <View className="items-center mb-6 mt-2">
            <Typography className="text-muted-foreground font-sans text-sm mb-3">
              {new Date(review.created_at).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Typography>
            <View
              className="px-5 py-2 rounded-full"
              style={{ backgroundColor: `${rec.color}1A` }}
            >
              <Typography className="font-sans-semibold text-base" style={{ color: rec.color }}>
                {rec.label}
              </Typography>
            </View>
          </View>

          {/* Stats */}
          <Card className="p-4 mb-4">
            <View className="flex-row justify-between py-2">
              <Typography className="text-muted-foreground font-sans">Peso registrado</Typography>
              <Typography className="text-foreground font-sans-medium">
                {review.weight_kg.toFixed(1).replace('.', ',')} kg
              </Typography>
            </View>
            {review.height_cm !== null && (
              <View className="flex-row justify-between py-2 border-t border-muted">
                <Typography className="text-muted-foreground font-sans">Altura (perfil)</Typography>
                <Typography className="text-foreground font-sans-medium">{review.height_cm} cm</Typography>
              </View>
            )}
          </Card>

          {/* AI analysis */}
          <Card className="p-5 mb-4">
            <Typography className="text-foreground font-sans-medium mb-3">Análisis de la IA</Typography>
            <Typography className="text-foreground font-sans text-sm leading-relaxed">
              {review.ai_analysis}
            </Typography>
          </Card>

          {/* User comments */}
          {review.week_comment && (
            <Card className="p-5 mb-4">
              <Typography className="text-foreground font-sans-medium mb-2">Tu comentario</Typography>
              <Typography className="text-foreground font-sans text-sm">{review.week_comment}</Typography>
            </Card>
          )}
          {review.diet_feedback && (
            <Card className="p-5 mb-4">
              <Typography className="text-foreground font-sans-medium mb-2">Feedback de dieta</Typography>
              <Typography className="text-foreground font-sans text-sm">{review.diet_feedback}</Typography>
            </Card>
          )}
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
}
