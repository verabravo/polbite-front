import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = process.env['EXPO_PUBLIC_SECURE_STORE_TOKEN_KEY'] ?? 'polbite_access_token';
const REFRESH_KEY = process.env['EXPO_PUBLIC_SECURE_STORE_REFRESH_KEY'] ?? 'polbite_refresh_token';
const USER_ID_KEY = 'polbite_user_id';

export interface StoredTokens {
  accessToken: string;
  refreshToken: string;
}

// ── Web fallback: localStorage (tokens no son sensibles en entorno de dev web) ─
const webStore = {
  setItemAsync: async (key: string, value: string) => {
    if (typeof localStorage !== 'undefined') localStorage.setItem(key, value);
  },
  getItemAsync: async (key: string): Promise<string | null> => {
    if (typeof localStorage !== 'undefined') return localStorage.getItem(key);
    return null;
  },
  deleteItemAsync: async (key: string) => {
    if (typeof localStorage !== 'undefined') localStorage.removeItem(key);
  },
};

const store = Platform.OS === 'web' ? webStore : SecureStore;

export async function saveTokens(tokens: StoredTokens): Promise<void> {
  await Promise.all([
    store.setItemAsync(TOKEN_KEY, tokens.accessToken),
    store.setItemAsync(REFRESH_KEY, tokens.refreshToken),
  ]);
}

export async function getStoredTokens(): Promise<StoredTokens | null> {
  const [accessToken, refreshToken] = await Promise.all([
    store.getItemAsync(TOKEN_KEY),
    store.getItemAsync(REFRESH_KEY),
  ]);

  if (!accessToken || !refreshToken) return null;
  return { accessToken, refreshToken };
}

export async function clearTokens(): Promise<void> {
  await Promise.all([
    store.deleteItemAsync(TOKEN_KEY),
    store.deleteItemAsync(REFRESH_KEY),
    store.deleteItemAsync(USER_ID_KEY),
  ]);
}

export async function saveUserId(userId: string): Promise<void> {
  await store.setItemAsync(USER_ID_KEY, userId);
}

export async function getStoredUserId(): Promise<string | null> {
  return store.getItemAsync(USER_ID_KEY);
}
