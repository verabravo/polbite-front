import { type MealPlanRepository, type CreateMealPlanPayload } from '../../../domain/ports/MealPlanRepository';

export class CreateMealPlanUseCase {
  constructor(private readonly repo: MealPlanRepository) {}

  async execute(payload: CreateMealPlanPayload): Promise<void> {
    return this.repo.createMealPlan(payload);
  }
}
