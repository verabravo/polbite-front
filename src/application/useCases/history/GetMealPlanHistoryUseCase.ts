import { type MealPlanHistoryRepository } from '../../../domain/ports/MealPlanHistoryRepository';
import { type MealPlanHistoryDetail } from '../../../domain/models/MealPlanHistory';

export class GetMealPlanHistoryUseCase {
  constructor(private readonly repo: MealPlanHistoryRepository) {}

  async execute(id: string): Promise<MealPlanHistoryDetail> {
    return this.repo.getById(id);
  }
}
