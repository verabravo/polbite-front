export type MealLabel = 'Desayuno' | 'Media mañana' | 'Comida' | 'Merienda' | 'Cena';

export interface MacroNutrients {
  proteinG: number;
  carbsG: number;
  fatG: number;
}

export interface Meal {
  id: string;
  label: MealLabel;
  name: string;
  ingredients: string;
  calories: number;
  macros: MacroNutrients;
  notes?: string;
}
