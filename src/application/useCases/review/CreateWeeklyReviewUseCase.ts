import { type WeeklyReviewRepository } from '../../../domain/ports/ReviewRepository';
import { type WeeklyReview } from '../../../domain/models/WeeklyReview';

interface CreateReviewInput {
  weight_kg: number;
  week_comment?: string;
  diet_feedback?: string;
}

export class CreateWeeklyReviewUseCase {
  constructor(private readonly repo: WeeklyReviewRepository) {}

  async execute(input: CreateReviewInput): Promise<WeeklyReview> {
    const weekly_review_id = crypto.randomUUID();
    await this.repo.create({ weekly_review_id, ...input });
    return this.repo.getById(weekly_review_id);
  }
}
