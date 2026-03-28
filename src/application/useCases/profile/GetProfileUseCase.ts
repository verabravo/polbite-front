import { type ProfileRepository } from '../../../domain/ports/ProfileRepository';
import { type NutritionalProfile } from '../../../domain/models/NutritionalProfile';

export class GetProfileUseCase {
  constructor(private readonly repo: ProfileRepository) {}

  async execute(userId: string): Promise<NutritionalProfile | null> {
    return this.repo.getProfile(userId);
  }
}
