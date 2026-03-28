export type BiometricMetric =
  | 'weight_kg'
  | 'body_fat_percentage'
  | 'waist_cm'
  | 'chest_cm'
  | 'hip_cm'
  | 'navel_cm'
  | 'left_thigh_cm'
  | 'right_thigh_cm'
  | 'left_bicep_cm'
  | 'right_bicep_cm';

export interface BiometricEntry {
  id: string;
  user_id: string;
  weight_kg: number;
  body_fat_percentage: number | null;
  waist_cm: number | null;
  chest_cm: number | null;
  hip_cm: number | null;
  navel_cm: number | null;
  left_thigh_cm: number | null;
  right_thigh_cm: number | null;
  left_bicep_cm: number | null;
  right_bicep_cm: number | null;
  created_at: string;
}

export function getMetricValue(entry: BiometricEntry, metric: BiometricMetric): number | null {
  return entry[metric] ?? null;
}
