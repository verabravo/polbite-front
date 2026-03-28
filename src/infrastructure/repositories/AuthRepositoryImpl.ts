import { api } from '../api/axiosClient';
import { saveTokens, clearTokens, getStoredTokens } from '../storage/secureStorage';
import { saveUserId, getStoredUserId } from '../storage/secureStorage';
import {
  type AuthRepository,
  type LoginCredentials,
  type RegisterCredentials,
  type AuthTokens,
} from '../../domain/ports/AuthRepository';
import { type User } from '../../domain/models/User';

export class AuthRepositoryImpl implements AuthRepository {
  async login(credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens; userId: string }> {
    const { data } = await api.post<{ access: string; refresh: string; user_id: string }>(
      '/api/auth/login/',
      credentials,
    );

    const tokens: AuthTokens = { accessToken: data.access, refreshToken: data.refresh };
    await saveTokens(tokens);
    await saveUserId(data.user_id);

    const userRes = await api.get<User>(`/api/users/${data.user_id}/`);
    return { user: userRes.data, tokens, userId: data.user_id };
  }

  async register(credentials: RegisterCredentials): Promise<{ user: User; tokens: AuthTokens; userId: string }> {
    const userId = crypto.randomUUID();
    await api.post('/api/auth/register/', {
      user_id: userId,
      email: credentials.email,
      username: credentials.email.split('@')[0],
      name: credentials.name,
      password: credentials.password,
    });
    // Register devuelve 204 sin body → login automático para obtener tokens
    return this.login({ email: credentials.email, password: credentials.password });
  }

  async logout(): Promise<void> {
    try {
      const tokens = await getStoredTokens();
      if (tokens?.refreshToken) {
        await api.post('/api/auth/logout/', { refresh: tokens.refreshToken });
      }
    } finally {
      await clearTokens();
    }
  }

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    const { data } = await api.post<{ access: string; refresh?: string }>(
      '/api/auth/refresh/',
      { refresh: refreshToken },
    );
    const tokens: AuthTokens = {
      accessToken: data.access,
      refreshToken: data.refresh ?? refreshToken,
    };
    await saveTokens(tokens);
    return tokens;
  }

  async getStoredTokens(): Promise<AuthTokens | null> {
    return getStoredTokens();
  }

  async getStoredUserId(): Promise<string | null> {
    return getStoredUserId();
  }
}
