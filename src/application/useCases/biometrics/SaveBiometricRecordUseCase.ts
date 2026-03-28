import { type BiometricRepository, type CreateBiometricEntryPayload } from '../../../domain/ports/BiometricRepository';
import { type BiometricEntry } from '../../../domain/models/BiometricRecord';

export class SaveBiometricRecordUseCase {
  constructor(private readonly repo: BiometricRepository) {}

  async execute(payload: Omit<CreateBiometricEntryPayload, 'biometric_entry_id'>): Promise<BiometricEntry> {
    const biometric_entry_id = crypto.randomUUID();
    await this.repo.create({ biometric_entry_id, ...payload });
    return this.repo.getById(biometric_entry_id);
  }
}
