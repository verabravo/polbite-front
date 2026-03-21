import { create } from 'zustand';
import { type Diet, type DayOfWeek } from '../../domain/models/Diet';
import { DietRepositoryImpl } from '../../infrastructure/repositories/DietRepositoryImpl';
import { GetActiveDietUseCase } from '../useCases/diet/GetActiveDietUseCase';
import { RefineDietUseCase } from '../useCases/diet/RefineDietUseCase';

const repo = new DietRepositoryImpl();
const getActiveUseCase = new GetActiveDietUseCase(repo);
const refineUseCase = new RefineDietUseCase(repo);

interface DietState {
  diet: Diet | null;
  selectedDay: DayOfWeek;
  isLoading: boolean;
  error: string | null;
  fetchActiveDiet: (userId: string) => Promise<void>;
  refineDiet: (dietId: string, instructions: string) => Promise<void>;
  setSelectedDay: (day: DayOfWeek) => void;
  clearError: () => void;
}

export const useDietStore = create<DietState>((set) => ({
  diet: null,
  selectedDay: 'L',
  isLoading: false,
  error: null,

  fetchActiveDiet: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const diet = await getActiveUseCase.execute(userId);
      set({ diet, isLoading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar la dieta';
      set({ error: message, isLoading: false });
    }
  },

  refineDiet: async (dietId, instructions) => {
    set({ isLoading: true, error: null });
    try {
      const diet = await refineUseCase.execute(dietId, instructions);
      set({ diet, isLoading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al refinar la dieta';
      set({ error: message, isLoading: false });
      throw err;
    }
  },

  setSelectedDay: (day) => set({ selectedDay: day }),
  clearError: () => set({ error: null }),
}));
