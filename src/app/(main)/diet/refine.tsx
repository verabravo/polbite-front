import { useEffect, useCallback, useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Pressable, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, Sparkles, X, Shuffle, Search } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Typography } from '../../../ui/components/common/Typography';
import { Button } from '../../../ui/components/common/Button';
import { Card } from '../../../ui/components/common/Card';
import { Skeleton } from '../../../ui/components/common/Skeleton';
import { EmptyState } from '../../../ui/components/common/EmptyState';
import { useDietStore } from '../../../application/stores/useDietStore';
import { DAY_LABELS, MEAL_ORDER_LABELS } from '../../../shared/constants';
import { type Food } from '../../../domain/models/Food';
import { colors } from '../../../ui/theme/colors';

interface VariationState {
  query: string;
  results: Food[];
  selected: { food_id: string; food_name: string } | null;
  quantity: string;
}

type MealKey = string; // `${dayOfWeek}-${order}`

function mealKey(dayOfWeek: number, order: number): MealKey {
  return `${dayOfWeek}-${order}`;
}

export default function RefineDietScreen() {
  const { mealPlan, isLoading, fetchMealPlan, removeMeal, updateMeal, searchFoods } = useDietStore();
  const [rejectedMeals, setRejectedMeals] = useState<Set<MealKey>>(new Set());
  const [variations, setVariations] = useState<Record<MealKey, VariationState>>({});
  const [applying, setApplying] = useState(false);

  useEffect(() => { if (!mealPlan) fetchMealPlan(); }, []);

  const toggleReject = (key: MealKey) => {
    setRejectedMeals((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
    // Cancel variation if rejecting
    setVariations((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const toggleVariation = (key: MealKey) => {
    setVariations((prev) => {
      if (key in prev) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      const newEntry: VariationState = { query: '', results: [], selected: null, quantity: '' };
      return { ...prev, [key]: newEntry };
    });
    // Cancel rejection if adding variation
    setRejectedMeals((prev) => {
      const next = new Set(prev);
      next.delete(key);
      return next;
    });
  };

  const updateVariation = (key: MealKey, patch: Partial<VariationState>) => {
    setVariations((prev) => {
      const current = prev[key] ?? { query: '', results: [], selected: null, quantity: '' };
      const updated: VariationState = { ...current, ...patch } as VariationState;
      return { ...prev, [key]: updated };
    });
  };

  const handleSearch = async (key: MealKey, query: string) => {
    updateVariation(key, { query, selected: null });
    const results = await searchFoods(query);
    updateVariation(key, { results });
  };

  const selectFood = (key: MealKey, food: Food) => {
    updateVariation(key, { selected: { food_id: food.id, food_name: food.name }, results: [], query: food.name });
  };

  const hasChanges =
    rejectedMeals.size > 0 ||
    Object.values(variations).some((v) => v.selected && v.quantity);

  const handleApply = async () => {
    if (!mealPlan) return;

    const invalidVariations = Object.entries(variations).filter(
      ([, v]) => v.selected && !v.quantity,
    );
    if (invalidVariations.length > 0) {
      Alert.alert('Falta cantidad', 'Indica la cantidad en gramos para cada variación seleccionada.');
      return;
    }

    setApplying(true);
    try {
      // 1. Delete rejected meals
      for (const key of rejectedMeals) {
        const parts = key.split('-');
        await removeMeal(Number(parts[0]), Number(parts[1]));
      }

      // 2. Apply variations
      for (const [key, variation] of Object.entries(variations)) {
        if (!variation.selected || !variation.quantity) continue;
        const parts = key.split('-');
        const day = Number(parts[0]);
        const order = Number(parts[1]);
        const qty = parseFloat(variation.quantity);
        if (isNaN(qty) || qty <= 0) continue;
        await updateMeal(day, order, [
          { food_id: variation.selected.food_id, quantity_grams: qty },
        ]);
      }

      Toast.show({ type: 'success', text1: 'Cambios aplicados' });
      router.replace('/(main)/(tabs)/diet');
    } catch {
      Toast.show({ type: 'error', text1: 'Error al aplicar los cambios' });
    } finally {
      setApplying(false);
    }
  };

  if (isLoading && !mealPlan) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-row items-center px-4 py-3">
          <Pressable onPress={() => router.back()} className="p-2 -ml-2">
            <ChevronLeft size={24} color={colors.foreground} strokeWidth={1.5} />
          </Pressable>
          <Typography className="flex-1 text-center text-foreground text-xl font-serif" style={{ fontFamily: 'DMSerifDisplay-Regular' }}>
            Refinar dieta
          </Typography>
          <View className="w-10" />
        </View>
        <View className="p-6 gap-4">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </View>
      </SafeAreaView>
    );
  }

  if (!mealPlan) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-row items-center px-4 py-3">
          <Pressable onPress={() => router.back()} className="p-2 -ml-2">
            <ChevronLeft size={24} color={colors.foreground} strokeWidth={1.5} />
          </Pressable>
          <Typography className="flex-1 text-center text-foreground text-xl font-serif" style={{ fontFamily: 'DMSerifDisplay-Regular' }}>
            Refinar dieta
          </Typography>
          <View className="w-10" />
        </View>
        <EmptyState
          icon={<Sparkles size={40} color={`${colors.primary}66`} strokeWidth={1.5} />}
          title="Sin dieta"
          message="Necesitas un plan activo para poder refinarlo."
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
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
          contentContainerClassName="px-4 pb-32"
          keyboardShouldPersistTaps="handled"
        >
          {mealPlan.meals_by_day
            .filter((d) => d.meals.length > 0)
            .sort((a, b) => a.day_of_week - b.day_of_week)
            .map((day) => (
              <View key={day.day_of_week} className="mb-6">
                <Typography
                  className="text-foreground text-lg font-serif mb-3"
                  style={{ fontFamily: 'DMSerifDisplay-Regular' }}
                >
                  {DAY_LABELS[day.day_of_week]}
                </Typography>

                <View className="gap-3">
                  {day.meals.sort((a, b) => a.order - b.order).map((meal) => {
                    const key = mealKey(day.day_of_week, meal.order);
                    const isRejected = rejectedMeals.has(key);
                    const variation = variations[key];

                    return (
                      <Card
                        key={key}
                        className="p-4"
                        style={isRejected ? { backgroundColor: `${colors.destructive}08` } : undefined}
                      >
                        <View className="mb-1">
                          <Typography className="text-xs uppercase tracking-wider text-secondary font-sans-medium mb-1">
                            {MEAL_ORDER_LABELS[meal.order] ?? `Comida ${meal.order}`}
                          </Typography>
                          <Typography
                            className={`text-foreground font-sans-medium ${isRejected ? 'line-through opacity-50' : ''}`}
                          >
                            {meal.items.map((i) => i.food_name).join(', ')}
                          </Typography>
                          <Typography className="text-muted-foreground font-sans text-sm">
                            {Math.round(meal.total_calories)} kcal
                          </Typography>
                        </View>

                        <View className="flex-row gap-2 mt-2">
                          <Pressable
                            onPress={() => toggleReject(key)}
                            className="flex-row items-center gap-1 px-3 py-1.5 rounded-full border"
                            style={
                              isRejected
                                ? { backgroundColor: colors.destructive, borderColor: colors.destructive }
                                : { borderColor: colors.muted }
                            }
                          >
                            <X size={14} color={isRejected ? 'white' : colors.mutedForeground} strokeWidth={2} />
                            <Typography className={`text-xs font-sans-medium ${isRejected ? 'text-white' : 'text-muted-foreground'}`}>
                              Rechazar
                            </Typography>
                          </Pressable>

                          {!isRejected && (
                            <Pressable
                              onPress={() => toggleVariation(key)}
                              className="flex-row items-center gap-1 px-3 py-1.5 rounded-full border"
                              style={
                                variation
                                  ? { backgroundColor: colors.primary, borderColor: colors.primary }
                                  : { borderColor: colors.muted }
                              }
                            >
                              <Shuffle size={14} color={variation ? 'white' : colors.mutedForeground} strokeWidth={2} />
                              <Typography className={`text-xs font-sans-medium ${variation ? 'text-white' : 'text-muted-foreground'}`}>
                                Variación
                              </Typography>
                            </Pressable>
                          )}
                        </View>

                        {variation && (
                          <View className="mt-3">
                            <View className="flex-row items-center gap-2 mb-2">
                              <View className="flex-1 flex-row items-center bg-input-bg rounded-xl border border-input-border px-3">
                                <Search size={16} color={colors.mutedForeground} strokeWidth={1.5} />
                                <TextInput
                                  className="flex-1 py-2 ml-2 text-foreground font-sans text-sm"
                                  placeholder="Buscar alimento..."
                                  placeholderTextColor={colors.mutedForeground}
                                  value={variation.query}
                                  onChangeText={(t) => handleSearch(key, t)}
                                />
                              </View>
                            </View>

                            {variation.results.length > 0 && (
                              <View className="bg-card rounded-xl border border-muted mb-2 overflow-hidden">
                                {variation.results.map((food) => (
                                  <Pressable
                                    key={food.id}
                                    onPress={() => selectFood(key, food)}
                                    className="px-4 py-2 active:bg-muted/30 border-b border-muted"
                                  >
                                    <Typography className="text-foreground font-sans text-sm">{food.name}</Typography>
                                    {food.brand && (
                                      <Typography className="text-muted-foreground font-sans text-xs">{food.brand}</Typography>
                                    )}
                                  </Pressable>
                                ))}
                              </View>
                            )}

                            {variation.selected && (
                              <View className="flex-row items-center gap-2">
                                <View
                                  className="flex-1 px-3 py-2 rounded-xl"
                                  style={{ backgroundColor: `${colors.primary}1A` }}
                                >
                                  <Typography className="text-foreground font-sans text-sm" style={{ color: colors.primary }}>
                                    {variation.selected.food_name}
                                  </Typography>
                                </View>
                                <TextInput
                                  className="w-24 bg-input-bg rounded-xl border border-input-border px-3 py-2 text-foreground font-sans text-sm text-right"
                                  placeholder="gramos"
                                  keyboardType="decimal-pad"
                                  placeholderTextColor={colors.mutedForeground}
                                  value={variation.quantity}
                                  onChangeText={(t) => updateVariation(key, { quantity: t })}
                                />
                              </View>
                            )}
                          </View>
                        )}
                      </Card>
                    );
                  })}
                </View>
              </View>
            ))}
        </ScrollView>

        <View className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-background border-t border-muted">
          <Button onPress={handleApply} disabled={!hasChanges} isLoading={applying}>
            Aplicar cambios
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
