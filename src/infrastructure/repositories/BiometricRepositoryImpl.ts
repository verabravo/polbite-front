import { api } from '../api/axiosClient';
import {
  type BiometricRepository,
  type SaveBiometricPayload,
} from '../../domain/ports/BiometricRepository';
import { type BiometricRecord, type BiometricMetric } from '../../domain/models/BiometricRecord';

export class BiometricRepositoryImpl implements BiometricRepository {
  async getRecords(userId: string, metric?: BiometricMetric): Promise<BiometricRecord[]> {
    const params = metric ? { metric } : {};
    const { data } = await api.get<BiometricRecord[]>(`/users/${userId}/biometrics`, { params });
    return data;
  }

  async saveRecord(userId: string, payload: SaveBiometricPayload): Promise<BiometricRecord> {
    const { data } = await api.post<BiometricRecord>(`/users/${userId}/biometrics`, payload);
    return data;
  }

  async deleteRecord(recordId: string): Promise<void> {
    await api.delete(`/biometrics/${recordId}`);
  }
}
