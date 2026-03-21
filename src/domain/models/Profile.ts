export type Goal = 'perder' | 'ganar' | 'mantener' | 'musculo';
export type ActivityLevel = 'sedentario' | 'ligero' | 'moderado' | 'activo' | 'muy_activo';
export type Sex = 'masculino' | 'femenino';

export interface FoodPreferences {
  restrictions: string[];
  allergies: string[];
  dislikes: string[];
}

export interface Profile {
  userId: string;
  goal: Goal;
  sex: Sex;
  birthDate: string;
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  foodPreferences: FoodPreferences;
  onboardingCompleted: boolean;
}
