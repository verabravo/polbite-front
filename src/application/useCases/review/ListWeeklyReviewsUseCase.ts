import { type WeeklyReviewRepository } from '../../../domain/ports/ReviewRepository';
import { type WeeklyReview } from '../../../domain/models/WeeklyReview';

export class ListWeeklyReviewsUseCase {
  constructor(private readonly repo: WeeklyReviewRepository) {}

  async execute(limit = 20, offset = 0): Promise<{ results: WeeklyReview[]; total: number }> {
    return this.repo.search(limit, offset);
  }
}
