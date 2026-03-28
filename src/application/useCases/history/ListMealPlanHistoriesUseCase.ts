import { type MealPlanHistoryRepository } from '../../../domain/ports/MealPlanHistoryRepository';
import { type MealPlanHistoryEntry } from '../../../domain/models/MealPlanHistory';

export class ListMealPlanHistoriesUseCase {
  constructor(private readonly repo: MealPlanHistoryRepository) {}

  async execute(limit = 20, offset = 0): Promise<{ results: MealPlanHistoryEntry[]; total: number }> {
    return this.repo.list(limit, offset);
  }
}
