import { create } from 'zustand';
import { type NutritionalProfile } from '../../domain/models/NutritionalProfile';
import { type SetNutritionalProfilePayload } from '../../domain/ports/ProfileRepository';
import { ProfileRepositoryImpl } from '../../infrastructure/repositories/ProfileRepositoryImpl';
import { GetProfileUseCase } from '../useCases/profile/GetProfileUseCase';
import { SetProfileUseCase } from '../useCases/profile/SetProfileUseCase';

const repo = new ProfileRepositoryImpl();
const getProfileUseCase = new GetProfileUseCase(repo);
const setProfileUseCase = new SetProfileUseCase(repo);

interface ProfileState {
  profile: NutritionalProfile | null;
  onboardingData: Partial<NutritionalProfile>;
  isLoading: boolean;
  error: string | null;
  fetchProfile: (userId: string) => Promise<void>;
  saveProfile: (payload: SetNutritionalProfilePayload) => Promise<void>;
  setOnboardingField: <K extends keyof NutritionalProfile>(key: K, value: NutritionalProfile[K]) => void;
  resetOnboarding: () => void;
  clearError: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  onboardingData: {},
  isLoading: true,
  error: null,

  fetchProfile: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const profile = await getProfileUseCase.execute(userId);
      set({ profile, isLoading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar el perfil';
      set({ error: message, isLoading: false });
    }
  },

  saveProfile: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      await setProfileUseCase.execute(payload);
      set({ isLoading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al guardar el perfil';
      set({ error: message, isLoading: false });
      throw err;
    }
  },

  setOnboardingField: (key, value) =>
    set((state) => ({
      onboardingData: { ...state.onboardingData, [key]: value },
    })),

  resetOnboarding: () => set({ onboardingData: {} }),
  clearError: () => set({ error: null }),
}));
