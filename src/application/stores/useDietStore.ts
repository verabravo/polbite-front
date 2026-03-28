import { create } from 'zustand';
import { type MealPlan, type DayPlan } from '../../domain/models/MealPlan';
import { type Food } from '../../domain/models/Food';
import { MealPlanRepositoryImpl } from '../../infrastructure/repositories/MealPlanRepositoryImpl';
import { FoodRepositoryImpl } from '../../infrastructure/repositories/FoodRepositoryImpl';
import { GetMealPlanUseCase } from '../useCases/diet/GetMealPlanUseCase';
import { GetDayPlanUseCase } from '../useCases/diet/GetDayPlanUseCase';
import { CreateMealPlanUseCase } from '../useCases/diet/CreateMealPlanUseCase';
import { RemoveMealUseCase } from '../useCases/diet/RemoveMealUseCase';
import { UpdateMealUseCase } from '../useCases/diet/UpdateMealUseCase';
import { SearchFoodsUseCase } from '../useCases/diet/SearchFoodsUseCase';
import { type CreateMealPlanPayload } from '../../domain/ports/MealPlanRepository';

const mealPlanRepo = new MealPlanRepositoryImpl();
const foodRepo = new FoodRepositoryImpl();

const getMealPlanUseCase = new GetMealPlanUseCase(mealPlanRepo);
const getDayPlanUseCase = new GetDayPlanUseCase(mealPlanRepo);
const createMealPlanUseCase = new CreateMealPlanUseCase(mealPlanRepo);
const removeMealUseCase = new RemoveMealUseCase(mealPlanRepo);
const updateMealUseCase = new UpdateMealUseCase(mealPlanRepo);
const searchFoodsUseCase = new SearchFoodsUseCase(foodRepo);

interface DietState {
  mealPlan: MealPlan | null;
  selectedDay: number;
  isLoading: boolean;
  error: string | null;
  fetchMealPlan: () => Promise<void>;
  fetchDayPlan: (dayOfWeek: number) => Promise<DayPlan>;
  createMealPlan: (payload: CreateMealPlanPayload) => Promise<void>;
  removeMeal: (dayOfWeek: number, order: number) => Promise<void>;
  updateMeal: (dayOfWeek: number, order: number, items: { food_id: string; quantity_grams: number }[]) => Promise<void>;
  searchFoods: (name: string) => Promise<Food[]>;
  setSelectedDay: (day: number) => void;
  clearError: () => void;
}

export const useDietStore = create<DietState>((set) => ({
  mealPlan: null,
  selectedDay: 1,
  isLoading: true,
  error: null,

  fetchMealPlan: async () => {
    set({ isLoading: true, error: null });
    try {
      const mealPlan = await getMealPlanUseCase.execute();
      set({ mealPlan, isLoading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar la dieta';
      set({ error: message, isLoading: false });
    }
  },

  fetchDayPlan: async (dayOfWeek) => {
    return getDayPlanUseCase.execute(dayOfWeek);
  },

  createMealPlan: async (payload) => {
    await createMealPlanUseCase.execute(payload);
  },

  removeMeal: async (dayOfWeek, order) => {
    await removeMealUseCase.execute(dayOfWeek, order);
    const mealPlan = await getMealPlanUseCase.execute();
    set({ mealPlan });
  },

  updateMeal: async (dayOfWeek, order, items) => {
    await updateMealUseCase.execute(dayOfWeek, order, items);
    const mealPlan = await getMealPlanUseCase.execute();
    set({ mealPlan });
  },

  searchFoods: async (name) => {
    return searchFoodsUseCase.execute(name);
  },

  setSelectedDay: (day) => set({ selectedDay: day }),
  clearError: () => set({ error: null }),
}));
