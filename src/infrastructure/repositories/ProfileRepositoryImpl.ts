import { api } from '../api/axiosClient';
import {
  type ProfileRepository,
  type SetNutritionalProfilePayload,
} from '../../domain/ports/ProfileRepository';
import { type NutritionalProfile } from '../../domain/models/NutritionalProfile';

export class ProfileRepositoryImpl implements ProfileRepository {
  async getProfile(userId: string): Promise<NutritionalProfile> {
    const { data } = await api.get<NutritionalProfile>(
      `/api/users/${userId}/nutritional-profile/`,
    );
    return data;
  }

  async setProfile(payload: SetNutritionalProfilePayload): Promise<void> {
    await api.put('/api/users/nutritional-profile/', payload);
  }
}
