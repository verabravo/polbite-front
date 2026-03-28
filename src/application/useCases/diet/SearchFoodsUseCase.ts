import { type FoodRepository } from '../../../domain/ports/FoodRepository';
import { type Food } from '../../../domain/models/Food';

export class SearchFoodsUseCase {
  constructor(private readonly repo: FoodRepository) {}

  async execute(name: string, limit = 10): Promise<Food[]> {
    return this.repo.search(name, limit);
  }
}
