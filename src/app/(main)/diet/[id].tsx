import { useEffect, useCallback, useState } from 'react';
import { View, ScrollView, Pressable, RefreshControl, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ChevronLeft, Utensils } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../../ui/components/common/Typography';
import { EmptyState } from '../../../ui/components/common/EmptyState';
import { ErrorState } from '../../../ui/components/common/ErrorState';
import { DaySelector } from '../../../ui/components/diet/DaySelector';
import { MealCard } from '../../../ui/components/diet/MealCard';
import { MacrosSummary } from '../../../ui/components/diet/MacrosSummary';
import { useMealPlanHistoryStore } from '../../../application/stores/useMealPlanHistoryStore';
import { type MealPlanHistoryDetail } from '../../../domain/models/MealPlanHistory';
import { colors } from '../../../ui/theme/colors';

export default function DietDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { fetchHistoryDetail } = useMealPlanHistoryStore();

  const [detail, setDetail] = useState<MealPlanHistoryDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState(1);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchHistoryDetail(id);
      setDetail(data);
      // Default to first available day
      const firstDay = data.snapshot.meals_by_day[0];
      if (firstDay) setSelectedDay(firstDay.day_of_week);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar el detalle');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => { loadData(); }, []);

  const isActive = detail?.ended_at === null;
  const dayPlan = detail?.snapshot.meals_by_day.find((d) => d.day_of_week === selectedDay);
  const hasMeals = (dayPlan?.meals.length ?? 0) > 0;

  const badgeLabel = isActive
    ? 'Activa'
    : detail
    ? `${new Date(detail.started_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} — ${new Date(detail.ended_at!).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}`
    : '';

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
          Detalle de dieta
        </Typography>
        <View className="w-10" />
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : error ? (
        <ErrorState message={error} onRetry={() => { loadData(); }} />
      ) : !detail ? (
        <EmptyState
          icon={<Utensils size={40} color={`${colors.primary}66`} strokeWidth={1.5} />}
          title="Sin datos"
          message="No se encontró este plan de comidas."
        />
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerClassName="p-4 pb-8"
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={loadData} tintColor={colors.primary} />}
        >
          {/* Badge */}
          <View className="flex-row mb-4">
            <View
              className="px-3 py-1 rounded-full"
              style={{ backgroundColor: isActive ? `${colors.primary}1A` : `${colors.secondary}1A` }}
            >
              <Typography
                className="text-xs font-sans-medium"
                style={{ color: isActive ? colors.primary : colors.secondary }}
              >
                {badgeLabel}
              </Typography>
            </View>
          </View>

          <MacrosSummary
            calories={dayPlan?.total_calories ?? 0}
            proteinG={dayPlan?.total_protein_g ?? 0}
            carbsG={dayPlan?.total_carbs_g ?? 0}
            fatG={dayPlan?.total_fat_g ?? 0}
          />

          <View className="mt-4" />
          <DaySelector selectedDay={selectedDay} onSelectDay={setSelectedDay} />

          {!hasMeals ? (
            <View className="items-center py-12">
              <Typography className="text-muted-foreground/60 font-sans text-center">
                No hay comidas para este día
              </Typography>
            </View>
          ) : (
            <View className="gap-4">
              {dayPlan!.meals
                .sort((a, b) => a.order - b.order)
                .map((meal) => <MealCard key={meal.meal_id} meal={meal} />)}
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
