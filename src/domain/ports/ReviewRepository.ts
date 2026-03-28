import { type WeeklyReview } from '../models/WeeklyReview';

export interface CreateWeeklyReviewPayload {
  weekly_review_id: string;
  weight_kg: number;
  week_comment?: string;
  diet_feedback?: string;
}

export interface WeeklyReviewRepository {
  create(payload: CreateWeeklyReviewPayload): Promise<void>;
  getById(id: string): Promise<WeeklyReview>;
  search(limit?: number, offset?: number): Promise<{ results: WeeklyReview[]; total: number }>;
}
