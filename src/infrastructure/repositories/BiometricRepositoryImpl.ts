import { api } from '../api/axiosClient';
import {
  type BiometricRepository,
  type CreateBiometricEntryPayload,
} from '../../domain/ports/BiometricRepository';
import { type BiometricEntry } from '../../domain/models/BiometricRecord';

export class BiometricRepositoryImpl implements BiometricRepository {
  async create(payload: CreateBiometricEntryPayload): Promise<void> {
    await api.post('/api/biometric-entries/', payload);
  }

  async getById(id: string): Promise<BiometricEntry> {
    const { data } = await api.get<BiometricEntry>(`/api/biometric-entries/${id}/`);
    return data;
  }

  async list(limit = 20, offset = 0): Promise<{ results: BiometricEntry[]; total: number }> {
    const { data } = await api.get<{ results: BiometricEntry[]; total: number }>(
      '/api/biometric-entries/',
      { params: { limit, offset } },
    );
    return data;
  }
}
