/**
 * Lectura centralizada de variables de entorno.
 * Usa el prefijo EXPO_PUBLIC_* para que Expo las exponga en runtime.
 */

export const env = {
  /** URL base del backend (sin trailing slash) */
  apiBaseUrl: process.env['EXPO_PUBLIC_API_BASE_URL'] ?? 'http://localhost:8000',

  /** Timeout HTTP en ms */
  apiTimeout: Number(process.env['EXPO_PUBLIC_API_TIMEOUT'] ?? 10_000),

  /** Entorno de ejecución */
  appEnv: process.env['EXPO_PUBLIC_APP_ENV'] ?? 'local',

  /** Logs de red detallados */
  debugNetwork: process.env['EXPO_PUBLIC_DEBUG_NETWORK'] === 'true',
} as const;
