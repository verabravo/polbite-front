import { type Food } from '../models/Food';

export interface FoodRepository {
  search(name: string, limit: number): Promise<Food[]>;
}
