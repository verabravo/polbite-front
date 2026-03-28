import { type ProfileRepository, type SetNutritionalProfilePayload } from '../../../domain/ports/ProfileRepository';

export class SetProfileUseCase {
  constructor(private readonly repo: ProfileRepository) {}

  async execute(payload: SetNutritionalProfilePayload): Promise<void> {
    return this.repo.setProfile(payload);
  }
}
