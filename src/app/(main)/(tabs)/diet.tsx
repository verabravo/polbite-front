import { View, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Filter } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../../ui/components/common/Typography';
import { Card } from '../../../ui/components/common/Card';
import { Button } from '../../../ui/components/common/Button';
import { useDietStore } from '../../../application/stores/useDietStore';
import { mockDiet } from '../../../shared/mockData';
import { DAYS_OF_WEEK } from '../../../shared/constants';
import { type DayOfWeek } from '../../../domain/models/Diet';
import { colors } from '../../../ui/theme/colors';

export default function DietScreen() {
  const { selectedDay, setSelectedDay } = useDietStore();
  const diet = mockDiet; // swap for store.diet when API is ready

  const dayPlan = diet.weekPlan.find((d) => d.day === selectedDay);
  const hasMeals = (dayPlan?.meals.length ?? 0) > 0;
  const totalCalories = dayPlan?.totalCalories ?? 0;
  const totalProtein = dayPlan?.meals.reduce((s, m) => s + m.macros.proteinG, 0) ?? 0;
  const totalCarbs = dayPlan?.meals.reduce((s, m) => s + m.macros.carbsG, 0) ?? 0;
  const totalFat = dayPlan?.meals.reduce((s, m) => s + m.macros.fatG, 0) ?? 0;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView className="flex-1" contentContainerClassName="p-4 pb-8">
        {/* Header */}
        <View className="mb-4">
          <Typography
            className="text-foreground text-2xl font-serif mb-4"
            style={{ fontFamily: 'DMSerifDisplay-Regular' }}
          >
            Tu dieta
          </Typography>

          {/* Resumen diario */}
          <Card className="p-4">
            <View className="flex-row items-center justify-between mb-3">
              <Typography className="text-muted-foreground font-sans text-sm">Hoy</Typography>
              <Typography
                className="text-foreground text-2xl font-serif"
                style={{ fontFamily: 'DMSerifDisplay-Regular' }}
              >
                ~{totalCalories} kcal
              </Typography>
            </View>

            {/* Barras de macros */}
            <View className="gap-2">
              {[
                { label: 'P', value: totalProtein, max: 150, color: colors.protein },
                { label: 'C', value: totalCarbs, max: 200, color: colors.carbs },
                { label: 'G', value: totalFat, max: 80, color: colors.fat },
              ].map(({ label, value, max, color }) => (
                <View key={label} className="flex-row items-center gap-2">
                  <Typography className="text-muted-foreground text-xs font-sans w-4">{label}</Typography>
                  <View className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                    <View
                      className="h-full rounded-full"
                      style={{ width: `${Math.min((value / max) * 100, 100)}%`, backgroundColor: color }}
                    />
                  </View>
                  <Typography className="text-muted-foreground text-xs font-sans w-10 text-right">{value}g</Typography>
                </View>
              ))}
            </View>
          </Card>
        </View>

        {/* Selector de días */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-2 pb-2 mb-6"
        >
          {([...DAYS_OF_WEEK] as DayOfWeek[]).map((day) => (
            <Pressable
              key={day}
              onPress={() => setSelectedDay(day)}
              className="w-12 h-12 rounded-full items-center justify-center border"
              style={selectedDay === day
                ? { backgroundColor: colors.primary, borderColor: colors.primary }
                : { backgroundColor: colors.card, borderColor: colors.muted }
              }
            >
              <Typography className={`font-sans-medium ${selectedDay === day ? 'text-white' : 'text-primary'}`}>
                {day}
              </Typography>
            </Pressable>
          ))}
        </ScrollView>

        {/* Comidas */}
        {!hasMeals ? (
          <View className="items-center py-12">
            <Typography className="text-muted-foreground/60 font-sans text-center">
              No hay comidas planificadas para este día
            </Typography>
          </View>
        ) : (
          <View className="gap-4">
            {dayPlan!.meals.map((meal) => (
              <Card key={meal.id} className="p-5">
                <View className="flex-row items-start justify-between mb-2">
                  <Typography className="text-xs uppercase tracking-wider text-secondary font-sans-medium">
                    {meal.label}
                  </Typography>
                  <Typography className="text-foreground font-sans-medium">
                    {meal.calories} kcal
                  </Typography>
                </View>

                <Typography
                  className="text-foreground text-lg font-serif mb-2 leading-snug"
                  style={{ fontFamily: 'DMSerifDisplay-Regular' }}
                >
                  {meal.name}
                </Typography>

                <Typography className="text-muted-foreground font-sans text-sm mb-3">
                  {meal.ingredients}
                </Typography>

                <View className="flex-row gap-2">
                  {[
                    { label: `P: ${meal.macros.proteinG}g`, bg: `${colors.protein}1A`, text: colors.protein },
                    { label: `C: ${meal.macros.carbsG}g`, bg: `${colors.carbs}1A`, text: colors.mutedForeground },
                    { label: `G: ${meal.macros.fatG}g`, bg: `${colors.fat}1A`, text: colors.fat },
                  ].map(({ label, bg, text }) => (
                    <View key={label} className="px-2 py-1 rounded-full" style={{ backgroundColor: bg }}>
                      <Typography className="text-xs font-sans-medium" style={{ color: text }}>{label}</Typography>
                    </View>
                  ))}
                </View>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>

      {/* FAB — Refinar dieta */}
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
