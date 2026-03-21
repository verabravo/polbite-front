import { api } from '../api/axiosClient';
import { type DietRepository } from '../../domain/ports/DietRepository';
import { type Diet } from '../../domain/models/Diet';

export class DietRepositoryImpl implements DietRepository {
  async getActiveDiet(userId: string): Promise<Diet | null> {
    const { data } = await api.get<Diet | null>(`/users/${userId}/diet/active`);
    return data;
  }

  async getDiet(dietId: string): Promise<Diet> {
    const { data } = await api.get<Diet>(`/diets/${dietId}`);
    return data;
  }

  async generateDiet(userId: string): Promise<Diet> {
    const { data } = await api.post<Diet>(`/users/${userId}/diet/generate`);
    return data;
  }

  async refineDiet(dietId: string, instructions: string): Promise<Diet> {
    const { data } = await api.post<Diet>(`/diets/${dietId}/refine`, { instructions });
    return data;
  }
}
