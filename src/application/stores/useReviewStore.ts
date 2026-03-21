import { create } from 'zustand';
import { type WeeklyReview } from '../../domain/models/WeeklyReview';

interface ReviewState {
  reviews: WeeklyReview[];
  isLoading: boolean;
  error: string | null;
  setReviews: (reviews: WeeklyReview[]) => void;
  clearError: () => void;
}

export const useReviewStore = create<ReviewState>((set) => ({
  reviews: [],
  isLoading: false,
  error: null,

  setReviews: (reviews) => set({ reviews }),
  clearError: () => set({ error: null }),
}));
