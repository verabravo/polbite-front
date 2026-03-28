export type BiologicalSex = 'Male' | 'Female';

export type ActivityLevel =
  | 'Sedentary'
  | 'LightlyActive'
  | 'ModeratelyActive'
  | 'VeryActive'
  | 'ExtremelyActive';

export type NutritionalGoal = 'LoseWeight' | 'Maintain' | 'GainMuscle';

export type DietaryRestriction =
  | 'GlutenFree'
  | 'LactoseFree'
  | 'Vegetarian'
  | 'Vegan'
  | 'NutAllergy'
  | 'ShellfishAllergy'
  | 'EggFree'
  | 'SoyFree'
  | 'PorkFree';

export interface NutritionalProfile {
  user_id: string;
  date_of_birth: string;
  biological_sex: BiologicalSex;
  height_cm: number;
  weight_kg: number;
  activity_level: ActivityLevel;
  nutritional_goal: NutritionalGoal;
  dietary_restrictions: DietaryRestriction[];
  custom_dietary_notes: string;
}
