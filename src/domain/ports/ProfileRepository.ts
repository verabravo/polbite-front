import {
  type NutritionalProfile,
  type BiologicalSex,
  type ActivityLevel,
  type NutritionalGoal,
  type DietaryRestriction,
} from '../models/NutritionalProfile';

export interface SetNutritionalProfilePayload {
  date_of_birth: string;
  biological_sex: BiologicalSex;
  height_cm: number;
  weight_kg: number;
  activity_level: ActivityLevel;
  nutritional_goal: NutritionalGoal;
  dietary_restrictions: { value: DietaryRestriction }[];
  custom_dietary_notes?: string;
}

export interface ProfileRepository {
  getProfile(userId: string): Promise<NutritionalProfile | null>;
  setProfile(payload: SetNutritionalProfilePayload): Promise<void>;
}
