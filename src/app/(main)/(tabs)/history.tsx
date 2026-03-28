import { useEffect, useCallback } from 'react';
import { View, ScrollView, RefreshControl, Pressable } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, ChevronRight } from 'lucide-react-native';
import { Typography } from '../../../ui/components/common/Typography';
import { EmptyState } from '../../../ui/components/common/EmptyState';
import { Skeleton } from '../../../ui/components/common/Skeleton';
import { ErrorState } from '../../../ui/components/common/ErrorState';
import { Card } from '../../../ui/components/common/Card';
import { DietHistoryItem } from '../../../ui/components/diet/DietHistoryItem';
import { useMealPlanHistoryStore } from '../../../application/stores/useMealPlanHistoryStore';
import { useReviewStore } from '../../../application/stores/useReviewStore';
import { AI_RECOMMENDATION_LABELS } from '../../../shared/constants';
import { colors } from '../../../ui/theme/colors';

function formatDateRange(startedAt: string, endedAt: string | null): string {
  const start = new Date(startedAt);
  const fmt = (d: Date) =>
    d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  if (!endedAt) return `Desde ${fmt(start)}`;
  const end = new Date(endedAt);
  return `${fmt(start)} — ${fmt(end)}`;
}

export default function HistoryScreen() {
  const { histories, isLoading, error, fetchHistories, clearError } = useMealPlanHistoryStore();
  const { reviews, fetchReviews } = useReviewStore();

  const loadData = useCallback(() => {
    fetchHistories(20);
    fetchReviews(10);
  }, []);
  useEffect(() => { loadData(); }, []);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-grow px-4 pb-8"
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={loadData} tintColor={colors.primary} />}
      >
        <Typography
          className="text-foreground text-2xl font-serif mb-6 pt-4"
          style={{ fontFamily: 'DMSerifDisplay-Regular' }}
        >
          Historial de dietas
        </Typography>

        {isLoading && histories.length === 0 ? (
          <View className="gap-3">
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
          </View>
        ) : error ? (
          <ErrorState message={error} onRetry={() => { clearError(); loadData(); }} />
        ) : histories.length === 0 ? (
          <EmptyState
            icon={<Clock size={40} color={`${colors.primary}66`} strokeWidth={1.5} />}
            title="Sin historial aún"
            message="Cuando generes y modifiques tu dieta, el historial aparecerá aquí."
          />
        ) : (
          <View className="gap-3">
            {histories.map((entry) => (
              <DietHistoryItem
                key={entry.id}
                name={`Plan ${entry.meal_plan_id.slice(0, 8)}…`}
                dateRange={formatDateRange(entry.started_at, entry.ended_at)}
                avgCalories={0}
                isActive={entry.ended_at === null}
                onPress={() => router.push(`/(main)/diet/${entry.id}`)}
              />
            ))}
          </View>
        )}

        {reviews.length > 0 && (
          <View className="mt-8">
            <Typography
              className="text-foreground text-lg font-serif mb-3"
              style={{ fontFamily: 'DMSerifDisplay-Regular' }}
            >
              Revisiones semanales
            </Typography>
            <View className="gap-3">
              {reviews.map((review) => {
                const rec = AI_RECOMMENDATION_LABELS[review.ai_recommendation];
                return (
                  <Pressable
                    key={review.id}
                    onPress={() => router.push(`/(main)/review/${review.id}`)}
                  >
                    <Card className="p-4 flex-row items-center justify-between">
                      <View>
                        <Typography className="text-foreground font-sans-medium">
                          {new Date(review.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </Typography>
                        {rec && (
                          <Typography className="font-sans text-sm mt-0.5" style={{ color: rec.color }}>
                            {rec.label}
                          </Typography>
                        )}
                      </View>
                      <ChevronRight size={18} color={colors.mutedForeground} strokeWidth={1.5} />
                    </Card>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
