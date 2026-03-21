import {
  type BiometricRepository,
  type SaveBiometricPayload,
} from '../../../domain/ports/BiometricRepository';
import { type BiometricRecord } from '../../../domain/models/BiometricRecord';

export class SaveBiometricRecordUseCase {
  constructor(private readonly biometricRepo: BiometricRepository) {}

  async execute(userId: string, payload: SaveBiometricPayload): Promise<BiometricRecord> {
    return this.biometricRepo.saveRecord(userId, payload);
  }
}
