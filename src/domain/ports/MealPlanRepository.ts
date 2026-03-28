import { type MealPlan, type DayPlan } from '../models/MealPlan';

export interface CreateMealPlanPayload {
  meal_plan_id: string;
  meals: {
    meal_id: string;
    day_of_week: number;
    order: number;
    items: { food_id: string; quantity_grams: number }[];
  }[];
}

export interface AddMealPayload {
  meal_id: string;
  day_of_week: number;
  order: number;
  items: { food_id: string; quantity_grams: number }[];
}

export interface MealPlanRepository {
  getMealPlan(): Promise<MealPlan | null>;
  getMealPlanForDay(dayOfWeek: number): Promise<DayPlan>;
  createMealPlan(payload: CreateMealPlanPayload): Promise<void>;
  deleteMealPlan(): Promise<void>;
  addMeal(meal: AddMealPayload): Promise<void>;
  removeMeal(dayOfWeek: number, order: number): Promise<void>;
  updateMeal(dayOfWeek: number, order: number, items: { food_id: string; quantity_grams: number }[]): Promise<void>;
}
