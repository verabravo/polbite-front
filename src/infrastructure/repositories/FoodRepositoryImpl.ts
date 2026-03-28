import { api } from '../api/axiosClient';
import { type FoodRepository } from '../../domain/ports/FoodRepository';
import { type Food } from '../../domain/models/Food';

export class FoodRepositoryImpl implements FoodRepository {
  async search(name: string, limit: number): Promise<Food[]> {
    if (!name.trim()) return [];
    const { data } = await api.get<{ results: Food[] }>('/api/foods/search/', {
      params: { name, limit },
    });
    return data.results;
  }
}
