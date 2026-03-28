import { type MealPlanRepository } from '../../../domain/ports/MealPlanRepository';

export class RemoveMealUseCase {
  constructor(private readonly repo: MealPlanRepository) {}

  async execute(dayOfWeek: number, order: number): Promise<void> {
    return this.repo.removeMeal(dayOfWeek, order);
  }
}
