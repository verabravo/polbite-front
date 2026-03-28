export const DAY_LABELS: Record<number, string> = {
  1: 'Lunes', 2: 'Martes', 3: 'Miércoles', 4: 'Jueves', 5: 'Viernes', 6: 'Sábado', 7: 'Domingo',
};

export const DAY_SHORT_LABELS: Record<number, string> = {
  1: 'L', 2: 'M', 3: 'X', 4: 'J', 5: 'V', 6: 'S', 7: 'D',
};

export const METRIC_LABELS: Record<string, string> = {
  weight_kg: 'Peso',
  body_fat_percentage: '% Grasa',
  waist_cm: 'Cintura',
  chest_cm: 'Pecho',
  hip_cm: 'Caderas',
  navel_cm: 'Ombligo',
  left_thigh_cm: 'Muslo Izq',
  right_thigh_cm: 'Muslo Der',
  left_bicep_cm: 'Bícep Izq',
  right_bicep_cm: 'Bícep Der',
};

export const METRIC_UNITS: Record<string, string> = {
  weight_kg: 'kg',
  body_fat_percentage: '%',
  waist_cm: 'cm',
  chest_cm: 'cm',
  hip_cm: 'cm',
  navel_cm: 'cm',
  left_thigh_cm: 'cm',
  right_thigh_cm: 'cm',
  left_bicep_cm: 'cm',
  right_bicep_cm: 'cm',
};

export const GOAL_LABELS: Record<string, string> = {
  LoseWeight: 'Perder peso',
  Maintain: 'Mantener peso',
  GainMuscle: 'Ganar músculo',
};

export const ACTIVITY_LABELS: Record<string, string> = {
  Sedentary: 'Sedentario',
  LightlyActive: 'Ligeramente activo',
  ModeratelyActive: 'Moderadamente activo',
  VeryActive: 'Muy activo',
  ExtremelyActive: 'Extremadamente activo',
};

export const SEX_LABELS: Record<string, string> = {
  Male: 'Masculino',
  Female: 'Femenino',
};

export const RESTRICTION_LABELS: Record<string, string> = {
  GlutenFree: 'Sin gluten',
  LactoseFree: 'Sin lactosa',
  Vegetarian: 'Vegetariano',
  Vegan: 'Vegano',
  NutAllergy: 'Sin frutos secos',
  ShellfishAllergy: 'Sin mariscos',
  EggFree: 'Sin huevo',
  SoyFree: 'Sin soja',
  PorkFree: 'Sin cerdo',
};

export const AI_RECOMMENDATION_LABELS: Record<string, { label: string; color: string }> = {
  KEEP_PLAN:   { label: 'Mantener dieta actual',    color: '#4A7C59' }, // darkOlive
  ADJUST_PLAN: { label: 'Ajustar tu dieta',         color: '#d07654' }, // secondary
  NEW_PLAN:    { label: 'Nueva dieta recomendada',  color: '#7a956b' }, // primary
};

export const MAX_REFINEMENTS = 5;

export const MEAL_ORDER_LABELS: Record<number, string> = {
  1: 'Desayuno',
  2: 'Media mañana',
  3: 'Comida',
  4: 'Merienda',
  5: 'Cena',
};
