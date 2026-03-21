import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';
import Constants from 'expo-constants';
import { getStoredTokens, saveTokens, clearTokens } from '../storage/secureStorage';

const BASE_URL = Constants.expoConfig?.extra?.apiBaseUrl
  ?? process.env['EXPO_PUBLIC_API_BASE_URL']
  ?? 'http://localhost:8000';

const API_VERSION = process.env['EXPO_PUBLIC_API_VERSION'] ?? 'v1';
const TIMEOUT = Number(process.env['EXPO_PUBLIC_API_TIMEOUT'] ?? 10_000);

export const api: AxiosInstance = axios.create({
  baseURL: `${BASE_URL}/api/${API_VERSION}`,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ── Request interceptor: attach access token ──────────────────────────────────
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const tokens = await getStoredTokens();
    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }

    if (process.env['EXPO_PUBLIC_DEBUG_NETWORK'] === 'true') {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error: unknown) => Promise.reject(error),
);

// ── Response interceptor: refresh token on 401 ────────────────────────────────
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) return Promise.reject(error);

    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const tokens = await getStoredTokens();
        if (!tokens?.refreshToken) throw new Error('No refresh token');

        const { data } = await axios.post<{ accessToken: string; refreshToken: string }>(
          `${BASE_URL}/api/${API_VERSION}/auth/refresh`,
          { refreshToken: tokens.refreshToken },
        );

        await saveTokens(data);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch {
        await clearTokens();
        // Let callers handle redirect
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
