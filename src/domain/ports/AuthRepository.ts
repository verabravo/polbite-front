import { type User } from '../models/User';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthRepository {
  login(credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens; userId: string }>;
  register(credentials: RegisterCredentials): Promise<{ user: User; tokens: AuthTokens; userId: string }>;
  logout(): Promise<void>;
  refreshToken(refreshToken: string): Promise<AuthTokens>;
  getStoredTokens(): Promise<AuthTokens | null>;
  getStoredUserId(): Promise<string | null>;
  saveUser(user: Pick<User, 'name' | 'email'>): Promise<void>;
  getStoredUser(): Promise<Pick<User, 'name' | 'email'> | null>;
}
