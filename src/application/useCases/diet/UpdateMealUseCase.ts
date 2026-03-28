import { type MealPlanRepository } from '../../../domain/ports/MealPlanRepository';

export class UpdateMealUseCase {
  constructor(private readonly repo: MealPlanRepository) {}

  async execute(dayOfWeek: number, order: number, items: { food_id: string; quantity_grams: number }[]): Promise<void> {
    return this.repo.updateMeal(dayOfWeek, order, items);
  }
}
