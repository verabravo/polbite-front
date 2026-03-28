import { create } from 'zustand';
import { type WeeklyReview } from '../../domain/models/WeeklyReview';
import { WeeklyReviewRepositoryImpl } from '../../infrastructure/repositories/WeeklyReviewRepositoryImpl';
import { CreateWeeklyReviewUseCase } from '../useCases/review/CreateWeeklyReviewUseCase';
import { GetWeeklyReviewUseCase } from '../useCases/review/GetWeeklyReviewUseCase';
import { ListWeeklyReviewsUseCase } from '../useCases/review/ListWeeklyReviewsUseCase';

const repo = new WeeklyReviewRepositoryImpl();
const createUseCase = new CreateWeeklyReviewUseCase(repo);
const getUseCase = new GetWeeklyReviewUseCase(repo);
const listUseCase = new ListWeeklyReviewsUseCase(repo);

interface ReviewState {
  reviews: WeeklyReview[];
  total: number;
  isLoading: boolean;
  error: string | null;
  fetchReviews: (limit?: number) => Promise<void>;
  createReview: (input: { weight_kg: number; week_comment?: string; diet_feedback?: string }) => Promise<WeeklyReview>;
  getReview: (id: string) => Promise<WeeklyReview>;
  clearError: () => void;
}

export const useReviewStore = create<ReviewState>((set) => ({
  reviews: [],
  total: 0,
  isLoading: false,
  error: null,

  fetchReviews: async (limit = 20) => {
    set({ isLoading: true, error: null });
    try {
      const { results, total } = await listUseCase.execute(limit);
      set({ reviews: results, total, isLoading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar revisiones';
      set({ error: message, isLoading: false });
    }
  },

  createReview: async (input) => {
    set({ isLoading: true, error: null });
    try {
      const review = await createUseCase.execute(input);
      set((state) => ({
        reviews: [review, ...state.reviews],
        total: state.total + 1,
        isLoading: false,
      }));
      return review;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al crear revisión';
      set({ error: message, isLoading: false });
      throw err;
    }
  },

  getReview: async (id) => {
    return getUseCase.execute(id);
  },

  clearError: () => set({ error: null }),
}));
