/**
 * Sistema tipográfico de Polbite
 *
 * Display → DM Serif Display (serif)  — títulos, marcas
 * Body    → Outfit (sans-serif)       — todo el texto de interfaz
 */
export const typography = {
  fonts: {
    serif: 'DMSerifDisplay-Regular',
    sans: 'Outfit-Regular',
    sansMedium: 'Outfit-Medium',
    sansSemiBold: 'Outfit-SemiBold',
    sansBold: 'Outfit-Bold',
  },

  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 40,
    '6xl': 48,
  },

  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.625,
  },

  weights: {
    normal: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
  },
} as const;
