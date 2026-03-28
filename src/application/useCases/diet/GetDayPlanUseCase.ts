import { type MealPlanRepository } from '../../../domain/ports/MealPlanRepository';
import { type DayPlan } from '../../../domain/models/MealPlan';

export class GetDayPlanUseCase {
  constructor(private readonly repo: MealPlanRepository) {}

  async execute(dayOfWeek: number): Promise<DayPlan> {
    return this.repo.getMealPlanForDay(dayOfWeek);
  }
}
