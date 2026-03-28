import { type BiometricEntry } from '../models/BiometricRecord';

export interface CreateBiometricEntryPayload {
  biometric_entry_id: string;
  weight_kg: number;
  body_fat_percentage?: number | null;
  waist_cm?: number | null;
  chest_cm?: number | null;
  hip_cm?: number | null;
  navel_cm?: number | null;
  left_thigh_cm?: number | null;
  right_thigh_cm?: number | null;
  left_bicep_cm?: number | null;
  right_bicep_cm?: number | null;
}

export interface BiometricRepository {
  create(payload: CreateBiometricEntryPayload): Promise<void>;
  getById(id: string): Promise<BiometricEntry>;
  list(limit?: number, offset?: number): Promise<{ results: BiometricEntry[]; total: number }>;
}
