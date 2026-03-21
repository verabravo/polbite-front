import { type ProfileRepository } from '../../../domain/ports/ProfileRepository';
import { type Profile } from '../../../domain/models/Profile';

export type OnboardingPayload = Omit<Profile, 'userId' | 'onboardingCompleted'>;

export class SaveOnboardingUseCase {
  constructor(private readonly profileRepo: ProfileRepository) {}

  async execute(userId: string, payload: OnboardingPayload): Promise<Profile> {
    return this.profileRepo.createProfile({
      ...payload,
      onboardingCompleted: true,
    });
  }
}
