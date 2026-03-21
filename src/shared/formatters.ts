/** Formatea un número de calorías: 1285 → "1.285 kcal" */
export function formatCalories(kcal: number): string {
  return `${kcal.toLocaleString('es-ES')} kcal`;
}

/** Formatea gramos de macros: 48 → "48g" */
export function formatGrams(g: number): string {
  return `${g}g`;
}

/** Formatea peso con un decimal: 73.2 → "73,2 kg" */
export function formatWeight(kg: number): string {
  return `${kg.toFixed(1).replace('.', ',')} kg`;
}

/** Formatea cm: 85.5 → "85,5 cm" */
export function formatCm(cm: number): string {
  return `${cm.toFixed(1).replace('.', ',')} cm`;
}

/** Variación con signo: -1.8 → "-1,8 kg", +0.3 → "+0,3 kg" */
export function formatDelta(value: number, unit: string): string {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(1).replace('.', ',')} ${unit}`;
}

/** Fecha corta: "2026-01-20" → "20 Ene" */
export function formatShortDate(iso: string): string {
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const d = new Date(iso);
  return `${d.getDate()} ${months[d.getMonth()]}`;
}

/** Porcentaje redondeado: 0.873 → "87%" */
export function formatPercent(ratio: number): string {
  return `${Math.round(ratio * 100)}%`;
}
