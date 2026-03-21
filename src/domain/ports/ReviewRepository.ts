import { type WeeklyReview } from '../models/WeeklyReview';

export interface CreateReviewPayload {
  dietId: string;
  weekStartDate: string;
  adherencePercent: number;
  weightKg?: number;
  energyLevel: 1 | 2 | 3 | 4 | 5;
  hungerLevel: 1 | 2 | 3 | 4 | 5;
  notes?: string;
}

export interface ReviewRepository {
  getReviews(userId: string): Promise<WeeklyReview[]>;
  createReview(userId: string, payload: CreateReviewPayload): Promise<WeeklyReview>;
}
