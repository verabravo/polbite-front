import { create } from 'zustand';
import { type BiometricEntry, type BiometricMetric } from '../../domain/models/BiometricRecord';
import { BiometricRepositoryImpl } from '../../infrastructure/repositories/BiometricRepositoryImpl';
import { GetBiometricRecordsUseCase } from '../useCases/biometrics/GetBiometricRecordsUseCase';
import { SaveBiometricRecordUseCase } from '../useCases/biometrics/SaveBiometricRecordUseCase';
import { type CreateBiometricEntryPayload } from '../../domain/ports/BiometricRepository';

const repo = new BiometricRepositoryImpl();
const listUseCase = new GetBiometricRecordsUseCase(repo);
const createUseCase = new SaveBiometricRecordUseCase(repo);

interface BiometricState {
  entries: BiometricEntry[];
  total: number;
  selectedMetric: BiometricMetric;
  isLoading: boolean;
  error: string | null;
  fetchEntries: (limit?: number) => Promise<void>;
  createEntry: (payload: Omit<CreateBiometricEntryPayload, 'biometric_entry_id'>) => Promise<void>;
  setSelectedMetric: (metric: BiometricMetric) => void;
  clearError: () => void;
}

export const useBiometricStore = create<BiometricState>((set) => ({
  entries: [],
  total: 0,
  selectedMetric: 'weight_kg',
  isLoading: true,
  error: null,

  fetchEntries: async (limit = 50) => {
    set({ isLoading: true, error: null });
    try {
      const { results, total } = await listUseCase.execute(limit);
      set({ entries: results, total, isLoading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar registros';
      set({ error: message, isLoading: false });
    }
  },

  createEntry: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const entry = await createUseCase.execute(payload);
      set((state) => ({
        entries: [entry, ...state.entries],
        total: state.total + 1,
        isLoading: false,
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al guardar registro';
      set({ error: message, isLoading: false });
      throw err;
    }
  },

  setSelectedMetric: (metric) => set({ selectedMetric: metric }),
  clearError: () => set({ error: null }),
}));
