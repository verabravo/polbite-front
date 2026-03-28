import { type DayPlan } from './MealPlan';

export interface MealPlanHistoryEntry {
  id: string;
  user_id: string;
  meal_plan_id: string;
  started_at: string;
  ended_at: string | null;
  created_at: string;
}

export interface MealPlanHistoryDetail extends MealPlanHistoryEntry {
  snapshot: {
    meals_by_day: DayPlan[];
  };
}
