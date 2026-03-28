export interface MealItem {
  food_id: string;
  food_name: string;
  quantity_grams: number;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
}

export interface Meal {
  meal_id: string;
  order: number;
  total_calories: number;
  total_protein_g: number;
  total_carbs_g: number;
  total_fat_g: number;
  items: MealItem[];
}

export interface DayPlan {
  day_of_week: number;
  total_calories: number;
  total_protein_g: number;
  total_carbs_g: number;
  total_fat_g: number;
  meals: Meal[];
}

export interface MealPlan {
  id: string;
  user_id: string;
  meals_by_day: DayPlan[];
}
