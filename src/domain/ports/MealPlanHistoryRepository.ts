import { type MealPlanHistoryEntry, type MealPlanHistoryDetail } from '../models/MealPlanHistory';

export interface MealPlanHistoryRepository {
  list(limit?: number, offset?: number): Promise<{ results: MealPlanHistoryEntry[]; total: number }>;
  getById(id: string): Promise<MealPlanHistoryDetail>;
}
