export type BiometricMetric =
  | 'peso'
  | 'ombligo'
  | 'pecho'
  | 'cintura'
  | 'caderas'
  | 'piernas';

export interface BiometricRecord {
  id: string;
  userId: string;
  metric: BiometricMetric;
  value: number;
  unit: 'kg' | 'cm';
  recordedAt: string;
  notes?: string;
}
