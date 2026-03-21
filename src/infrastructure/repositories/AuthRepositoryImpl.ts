import { api } from '../api/axiosClient';
import { saveTokens, clearTokens, getStoredTokens } from '../storage/secureStorage';
import {
  type AuthRepository,
  type LoginCredentials,
  type RegisterCredentials,
  type AuthTokens,
} from '../../domain/ports/AuthRepository';
import { type User } from '../../domain/models/User';

export class AuthRepositoryImpl implements AuthRepository {
  async login(credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens }> {
    const { data } = await api.post<{ user: User; tokens: AuthTokens }>('/auth/login', credentials);
    await saveTokens(data.tokens);
    return data;
  }

  async register(credentials: RegisterCredentials): Promise<{ user: User; tokens: AuthTokens }> {
    const { data } = await api.post<{ user: User; tokens: AuthTokens }>('/auth/register', credentials);
    await saveTokens(data.tokens);
    return data;
  }

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      await clearTokens();
    }
  }

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    const { data } = await api.post<AuthTokens>('/auth/refresh', { refreshToken });
    await saveTokens(data);
    return data;
  }

  async getStoredTokens(): Promise<AuthTokens | null> {
    return getStoredTokens();
  }
}
