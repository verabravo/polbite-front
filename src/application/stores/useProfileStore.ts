import { create } from 'zustand';
import { type Profile } from '../../domain/models/Profile';

interface ProfileState {
  profile: Profile | null;
  onboardingData: Partial<Profile>;
  setProfile: (profile: Profile) => void;
  setOnboardingField: <K extends keyof Profile>(key: K, value: Profile[K]) => void;
  resetOnboarding: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  onboardingData: {},

  setProfile: (profile) => set({ profile }),

  setOnboardingField: (key, value) =>
    set((state) => ({
      onboardingData: { ...state.onboardingData, [key]: value },
    })),

  resetOnboarding: () => set({ onboardingData: {} }),
}));
