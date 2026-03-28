import { api } from '../api/axiosClient';
import { type MealPlanHistoryRepository } from '../../domain/ports/MealPlanHistoryRepository';
import { type MealPlanHistoryEntry, type MealPlanHistoryDetail } from '../../domain/models/MealPlanHistory';

export class MealPlanHistoryRepositoryImpl implements MealPlanHistoryRepository {
  async list(limit = 20, offset = 0): Promise<{ results: MealPlanHistoryEntry[]; total: number }> {
    const { data } = await api.get<{ results: MealPlanHistoryEntry[]; total: number }>(
      '/api/meal-plan-histories/',
      { params: { limit, offset } },
    );
    return data;
  }

  async getById(id: string): Promise<MealPlanHistoryDetail> {
    const { data } = await api.get<MealPlanHistoryDetail>(`/api/meal-plan-histories/${id}/`);
    return data;
  }
}
