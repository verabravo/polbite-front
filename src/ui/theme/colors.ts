/**
 * Paleta de colores de Polbite
 * Extraída del diseño Figma (DM Serif Display + Outfit)
 */
export const colors = {
  // ── Marca ──────────────────────────────────────────────────────────────────
  primary: '#7a956b',       // Olive Green — acción principal, botones activos
  primaryHover: '#6a8459',  // Hover/pressed del primary
  secondary: '#d07654',     // Terracotta — acciones secundarias, proteínas
  accent: '#e8945f',        // Warm Orange — grasas, acentos
  sageGreen: '#8fa882',     // Sage Green — hidratos, estado secundario

  // ── Fondos y superficies ───────────────────────────────────────────────────
  background: '#faf8f5',    // Warm Cream — fondo de pantalla
  card: '#ffffff',          // Blanco puro — tarjetas y paneles
  inputBg: '#f3f1ed',       // Light Taupe — fondo de inputs
  muted: '#e8e5df',         // Light Beige — estados desactivados

  // ── Texto ──────────────────────────────────────────────────────────────────
  foreground: '#2d3319',    // Dark Text — texto principal
  mutedForeground: '#6b7058', // Sage Brown — texto secundario / placeholder
  darkOlive: '#4A7C59',     // Para cambios positivos en biometría

  // ── Bordes y focus ─────────────────────────────────────────────────────────
  border: 'rgba(122,149,107,0.2)',  // Olive green 20% — bordes sutiles
  focusRing: '#7a956b',             // Anillo de foco (mismo que primary)

  // ── Estados ────────────────────────────────────────────────────────────────
  destructive: '#d4183d',   // Error / eliminación
  destructiveHover: '#b01434',

  // ── Macros (gráficas) ──────────────────────────────────────────────────────
  protein: '#d07654',
  carbs: '#8fa882',
  fat: '#e8945f',
} as const;

export type ColorKey = keyof typeof colors;
