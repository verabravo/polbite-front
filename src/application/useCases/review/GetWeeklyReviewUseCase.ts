import { type WeeklyReviewRepository } from '../../../domain/ports/ReviewRepository';
import { type WeeklyReview } from '../../../domain/models/WeeklyReview';

export class GetWeeklyReviewUseCase {
  constructor(private readonly repo: WeeklyReviewRepository) {}

  async execute(id: string): Promise<WeeklyReview> {
    return this.repo.getById(id);
  }
}
