import { type BiometricRecord, type BiometricMetric } from '../models/BiometricRecord';

export interface SaveBiometricPayload {
  metric: BiometricMetric;
  value: number;
  recordedAt: string;
  notes?: string;
}

export interface BiometricRepository {
  getRecords(userId: string, metric?: BiometricMetric): Promise<BiometricRecord[]>;
  saveRecord(userId: string, payload: SaveBiometricPayload): Promise<BiometricRecord>;
  deleteRecord(recordId: string): Promise<void>;
}
