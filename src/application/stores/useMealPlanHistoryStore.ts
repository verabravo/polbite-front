import { create } from 'zustand';
import { type MealPlanHistoryEntry, type MealPlanHistoryDetail } from '../../domain/models/MealPlanHistory';
import { MealPlanHistoryRepositoryImpl } from '../../infrastructure/repositories/MealPlanHistoryRepositoryImpl';
import { ListMealPlanHistoriesUseCase } from '../useCases/history/ListMealPlanHistoriesUseCase';
import { GetMealPlanHistoryUseCase } from '../useCases/history/GetMealPlanHistoryUseCase';

const repo = new MealPlanHistoryRepositoryImpl();
const listUseCase = new ListMealPlanHistoriesUseCase(repo);
const getUseCase = new GetMealPlanHistoryUseCase(repo);

interface MealPlanHistoryState {
  histories: MealPlanHistoryEntry[];
  total: number;
  isLoading: boolean;
  error: string | null;
  fetchHistories: (limit?: number) => Promise<void>;
  fetchHistoryDetail: (id: string) => Promise<MealPlanHistoryDetail>;
  clearError: () => void;
}

export const useMealPlanHistoryStore = create<MealPlanHistoryState>((set) => ({
  histories: [],
  total: 0,
  isLoading: true,
  error: null,

  fetchHistories: async (limit = 20) => {
    set({ isLoading: true, error: null });
    try {
      const { results, total } = await listUseCase.execute(limit);
      set({ histories: results, total, isLoading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar historial';
      set({ error: message, isLoading: false });
    }
  },

  fetchHistoryDetail: async (id) => {
    return getUseCase.execute(id);
  },

  clearError: () => set({ error: null }),
}));
