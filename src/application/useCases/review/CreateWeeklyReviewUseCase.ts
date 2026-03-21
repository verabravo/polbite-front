import {
  type ReviewRepository,
  type CreateReviewPayload,
} from '../../../domain/ports/ReviewRepository';
import { type WeeklyReview } from '../../../domain/models/WeeklyReview';

export class CreateWeeklyReviewUseCase {
  constructor(private readonly reviewRepo: ReviewRepository) {}

  async execute(userId: string, payload: CreateReviewPayload): Promise<WeeklyReview> {
    return this.reviewRepo.createReview(userId, payload);
  }
}
