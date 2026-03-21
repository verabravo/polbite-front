import { type Profile } from '../models/Profile';

export interface ProfileRepository {
  getProfile(userId: string): Promise<Profile>;
  createProfile(profile: Omit<Profile, 'userId'>): Promise<Profile>;
  updateProfile(userId: string, updates: Partial<Profile>): Promise<Profile>;
}
