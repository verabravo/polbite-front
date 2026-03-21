import { type Meal } from './Meal';

export type DayOfWeek = 'L' | 'M' | 'X' | 'J' | 'V' | 'S' | 'D';

export interface DayPlan {
  day: DayOfWeek;
  meals: Meal[];
  totalCalories: number;
}

export interface Diet {
  id: string;
  userId: string;
  name: string;
  targetCalories: number;
  weekPlan: DayPlan[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
