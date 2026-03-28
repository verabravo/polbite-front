import { api } from '../api/axiosClient';
import {
  type WeeklyReviewRepository,
  type CreateWeeklyReviewPayload,
} from '../../domain/ports/ReviewRepository';
import { type WeeklyReview } from '../../domain/models/WeeklyReview';

export class WeeklyReviewRepositoryImpl implements WeeklyReviewRepository {
  async create(payload: CreateWeeklyReviewPayload): Promise<void> {
    await api.post('/api/weekly-reviews/', payload);
  }

  async getById(id: string): Promise<WeeklyReview> {
    const { data } = await api.get<WeeklyReview>(`/api/weekly-reviews/${id}/`);
    return data;
  }

  async search(limit = 20, offset = 0): Promise<{ results: WeeklyReview[]; total: number }> {
    const { data } = await api.get<{ results: WeeklyReview[]; total: number }>(
      '/api/weekly-reviews/search/',
      { params: { limit, offset } },
    );
    return data;
  }
}
