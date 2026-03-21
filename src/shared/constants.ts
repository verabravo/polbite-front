export const DAYS_OF_WEEK = ['L', 'M', 'X', 'J', 'V', 'S', 'D'] as const;

export const DAYS_LABELS: Record<string, string> = {
  L: 'Lunes',
  M: 'Martes',
  X: 'Miércoles',
  J: 'Jueves',
  V: 'Viernes',
  S: 'Sábado',
  D: 'Domingo',
};

export const METRIC_LABELS: Record<string, string> = {
  peso: 'Peso',
  ombligo: 'Ombligo',
  pecho: 'Pecho',
  cintura: 'Cintura',
  caderas: 'Caderas',
  piernas: 'Piernas',
};

export const METRIC_UNITS: Record<string, string> = {
  peso: 'kg',
  ombligo: 'cm',
  pecho: 'cm',
  cintura: 'cm',
  caderas: 'cm',
  piernas: 'cm',
};

export const GOAL_LABELS: Record<string, string> = {
  perder: 'Perder peso',
  ganar: 'Ganar peso',
  mantener: 'Mantener peso',
  musculo: 'Ganar músculo',
};

export const ACTIVITY_LABELS: Record<string, string> = {
  sedentario: 'Sedentario',
  ligero: 'Ligeramente activo',
  moderado: 'Moderadamente activo',
  activo: 'Muy activo',
  muy_activo: 'Extremadamente activo',
};
