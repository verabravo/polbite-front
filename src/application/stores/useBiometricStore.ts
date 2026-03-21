import { create } from 'zustand';
import { type BiometricRecord, type BiometricMetric } from '../../domain/models/BiometricRecord';
import { BiometricRepositoryImpl } from '../../infrastructure/repositories/BiometricRepositoryImpl';
import { SaveBiometricRecordUseCase } from '../useCases/biometrics/SaveBiometricRecordUseCase';

const repo = new BiometricRepositoryImpl();
const saveUseCase = new SaveBiometricRecordUseCase(repo);

interface BiometricState {
  records: BiometricRecord[];
  selectedMetric: BiometricMetric;
  isLoading: boolean;
  error: string | null;
  fetchRecords: (userId: string, metric?: BiometricMetric) => Promise<void>;
  saveRecord: (userId: string, metric: BiometricMetric, value: number) => Promise<void>;
  setSelectedMetric: (metric: BiometricMetric) => void;
  clearError: () => void;
}

export const useBiometricStore = create<BiometricState>((set) => ({
  records: [],
  selectedMetric: 'peso',
  isLoading: false,
  error: null,

  fetchRecords: async (userId, metric) => {
    set({ isLoading: true, error: null });
    try {
      const result = await repo.getRecords(userId, metric);
      set({ records: result, isLoading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar registros';
      set({ error: message, isLoading: false });
    }
  },

  saveRecord: async (userId, metric, value) => {
    set({ isLoading: true, error: null });
    try {
      const record = await saveUseCase.execute(userId, {
        metric,
        value,
        recordedAt: new Date().toISOString(),
      });
      set((state) => ({ records: [record, ...state.records], isLoading: false }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al guardar registro';
      set({ error: message, isLoading: false });
      throw err;
    }
  },

  setSelectedMetric: (metric) => set({ selectedMetric: metric }),
  clearError: () => set({ error: null }),
}));
