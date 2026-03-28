import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';
import { env } from '../../shared/env';
import { getStoredTokens, saveTokens, clearTokens } from '../storage/secureStorage';

const BASE_URL = env.apiBaseUrl;
const TIMEOUT = env.apiTimeout;

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
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

    if (env.debugNetwork) {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error: unknown) => Promise.reject(error),
);

// ── Response interceptor: refresh token on 401, handle 403 account_locked ────
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) return Promise.reject(error);

    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const status = error.response?.status;
    const errorCode = (error.response?.data as { error_code?: string } | undefined)?.error_code;

    if (status === 403 && errorCode === 'account_locked') {
      const lockedError = new Error('Cuenta bloqueada temporalmente. Inténtalo en 30 minutos.');
      (lockedError as Error & { code: string }).code = 'account_locked';
      return Promise.reject(lockedError);
    }

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const tokens = await getStoredTokens();
        if (!tokens?.refreshToken) throw new Error('No refresh token');

        const { data } = await axios.post<{ access: string; refresh: string }>(
          `${BASE_URL}/api/auth/refresh/`,
          { refresh: tokens.refreshToken },
        );

        const newTokens = { accessToken: data.access, refreshToken: data.refresh };
        await saveTokens(newTokens);
        originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
        return api(originalRequest);
      } catch {
        await clearTokens();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
