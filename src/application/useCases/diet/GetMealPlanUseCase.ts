import { type MealPlanRepository } from '../../../domain/ports/MealPlanRepository';
import { type MealPlan } from '../../../domain/models/MealPlan';

export class GetMealPlanUseCase {
  constructor(private readonly repo: MealPlanRepository) {}

  async execute(): Promise<MealPlan | null> {
    return this.repo.getMealPlan();
  }
}
