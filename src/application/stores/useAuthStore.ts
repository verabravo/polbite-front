import { create } from 'zustand';
import { type User } from '../../domain/models/User';
import { AuthRepositoryImpl } from '../../infrastructure/repositories/AuthRepositoryImpl';
import { LoginUseCase } from '../useCases/auth/LoginUseCase';
import { RegisterUseCase } from '../useCases/auth/RegisterUseCase';
import { LogoutUseCase } from '../useCases/auth/LogoutUseCase';

const repo = new AuthRepositoryImpl();
const loginUseCase = new LoginUseCase(repo);
const registerUseCase = new RegisterUseCase(repo);
const logoutUseCase = new LogoutUseCase(repo);

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const user = await loginUseCase.execute({ email, password });
      set({ user, isLoading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al iniciar sesión';
      set({ error: message, isLoading: false });
      throw err;
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const user = await registerUseCase.execute({ name, email, password });
      set({ user, isLoading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al registrarse';
      set({ error: message, isLoading: false });
      throw err;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await logoutUseCase.execute();
    } finally {
      set({ user: null, isLoading: false, error: null });
    }
  },

  setUser: (user) => set({ user }),
  clearError: () => set({ error: null }),
}));
