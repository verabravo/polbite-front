import { type BiometricRepository } from '../../../domain/ports/BiometricRepository';
import { type BiometricEntry } from '../../../domain/models/BiometricRecord';

export class GetBiometricRecordsUseCase {
  constructor(private readonly repo: BiometricRepository) {}

  async execute(limit = 50, offset = 0): Promise<{ results: BiometricEntry[]; total: number }> {
    return this.repo.list(limit, offset);
  }
}
