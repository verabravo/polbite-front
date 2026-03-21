/**
 * Escala de espaciado (múltiplos de 4 px — igual que Tailwind)
 */
export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
} as const;

/**
 * Radio de bordes
 * --radius base: 0.625 rem = 10 px
 */
export const radii = {
  sm: 6,
  md: 8,
  lg: 10,
  xl: 14,
  '2xl': 24,
  '3xl': 30,
  pill: 32,
  full: 9999,
} as const;

/** Padding horizontal estándar de pantalla */
export const screenPaddingH = 24;

/** Altura de la tab bar nativa */
export const tabBarHeight = 60;
