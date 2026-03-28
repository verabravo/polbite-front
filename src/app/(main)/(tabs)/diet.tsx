import { useEffect, useCallback } from 'react';
import { View, ScrollView, Pressable, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { Filter, Utensils, ClipboardList } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../../ui/components/common/Typography';
import { Skeleton } from '../../../ui/components/common/Skeleton';
import { EmptyState } from '../../../ui/components/common/EmptyState';
import { ErrorState } from '../../../ui/components/common/ErrorState';
import { DaySelector } from '../../../ui/components/diet/DaySelector';
import { MealCard } from '../../../ui/components/diet/MealCard';
import { MacrosSummary } from '../../../ui/components/diet/MacrosSummary';
import { useDietStore } from '../../../application/stores/useDietStore';
import { colors } from '../../../ui/theme/colors';

export default function DietScreen() {
  const { mealPlan, selectedDay, isLoading, error, fetchMealPlan, setSelectedDay, clearError } = useDietStore();

  const loadData = useCallback(() => {
    fetchMealPlan();
  }, []);

  useEffect(() => { loadData(); }, []);

  const dayPlan = mealPlan?.meals_by_day.find((d) => d.day_of_week === selectedDay);
  const hasMeals = (dayPlan?.meals.length ?? 0) > 0;

  if (isLoading && !mealPlan) {
    return (
      <SafeAreaView className="flex-1 bg-background" edges={['top']}>
        <View className="p-4">
          <Skeleton className="h-8 w-32 mb-4" />
          <Skeleton className="h-28 mb-4" />
          <Skeleton className="h-12 mb-6" />
          <Skeleton className="h-40 mb-4" />
          <Skeleton className="h-40 mb-4" />
        </View>
      </SafeAreaView>
    );
  }

  if (error && !mealPlan) {
    return (
      <SafeAreaView className="flex-1 bg-background" edges={['top']}>
        <ErrorState message={error} onRetry={() => { clearError(); loadData(); }} />
      </SafeAreaView>
    );
  }

  if (!mealPlan) {
    return (
      <SafeAreaView className="flex-1 bg-background" edges={['top']}>
        <EmptyState
          icon={<Utensils size={40} color={`${colors.primary}66`} strokeWidth={1.5} />}
          title="Sin dieta activa"
          message="Aún no tienes un plan de comidas. Completa tu perfil para generar uno."
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="p-4 pb-24"
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={loadData} tintColor={colors.primary} />}
      >
        <View className="mb-4">
          <View className="flex-row items-center justify-between mb-4">
            <Typography
              className="text-foreground text-2xl font-serif"
              style={{ fontFamily: 'DMSerifDisplay-Regular' }}
            >
              Tu dieta
            </Typography>
            <Pressable
              onPress={() => router.push('/(main)/review/new')}
              className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-full border"
              style={{ borderColor: colors.primary, backgroundColor: `${colors.primary}0D` }}
            >
              <ClipboardList size={14} color={colors.primary} strokeWidth={1.5} />
              <Typography className="text-primary font-sans-medium text-xs">Revisión semanal</Typography>
            </Pressable>
          </View>

          <MacrosSummary
            calories={dayPlan?.total_calories ?? 0}
            proteinG={dayPlan?.total_protein_g ?? 0}
            carbsG={dayPlan?.total_carbs_g ?? 0}
            fatG={dayPlan?.total_fat_g ?? 0}
          />
        </View>

        <DaySelector selectedDay={selectedDay} onSelectDay={setSelectedDay} />

        {!hasMeals ? (
          <View className="items-center py-12">
            <Typography className="text-muted-foreground/60 font-sans text-center">
              No hay comidas planificadas para este día
            </Typography>
          </View>
        ) : (
          <View className="gap-4">
            {dayPlan!.meals
              .sort((a, b) => a.order - b.order)
              .map((meal) => (
                <MealCard key={meal.meal_id} meal={meal} />
              ))}
          </View>
        )}
      </ScrollView>

      <Pressable
        onPress={() => router.push('/(main)/diet/refine')}
        className="absolute bottom-6 right-6 flex-row items-center gap-2 px-5 py-4 rounded-full"
        style={{ backgroundColor: colors.primary, shadowColor: colors.primary, shadowOpacity: 0.35, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 6 }}
      >
        <Filter size={18} color="white" strokeWidth={2} />
        <Typography className="text-white font-sans-medium">Refinar dieta</Typography>
      </Pressable>
    </SafeAreaView>
  );
}
