import { type Diet } from '../domain/models/Diet';
import { type BiometricRecord } from '../domain/models/BiometricRecord';

export const mockDiet: Diet = {
  id: 'diet-001',
  userId: 'user-001',
  name: 'Dieta hipocalórica mediterránea',
  targetCalories: 1800,
  isActive: true,
  createdAt: '2026-01-20T00:00:00Z',
  updatedAt: '2026-03-20T00:00:00Z',
  weekPlan: [
    {
      day: 'L',
      totalCalories: 1785,
      meals: [
        {
          id: 'm-1',
          label: 'Desayuno',
          name: 'Tostada integral con tomate y aceite de oliva',
          ingredients: 'Pan integral, tomate maduro, aceite de oliva virgen extra',
          calories: 320,
          macros: { proteinG: 12, carbsG: 48, fatG: 9 },
        },
        {
          id: 'm-2',
          label: 'Comida',
          name: 'Pollo al ajillo con patatas asadas',
          ingredients: 'Pechuga de pollo, ajo, patatas, aceite de oliva, perejil',
          calories: 580,
          macros: { proteinG: 45, carbsG: 52, fatG: 18 },
        },
        {
          id: 'm-3',
          label: 'Cena',
          name: 'Merluza a la plancha con verduras salteadas',
          ingredients: 'Merluza fresca, calabacín, pimiento, cebolla, limón',
          calories: 385,
          macros: { proteinG: 42, carbsG: 28, fatG: 12 },
        },
      ],
    },
    {
      day: 'M',
      totalCalories: 1740,
      meals: [
        {
          id: 'm-4',
          label: 'Desayuno',
          name: 'Yogur griego con frutos secos y miel',
          ingredients: 'Yogur griego natural, almendras, nueces, miel',
          calories: 340,
          macros: { proteinG: 18, carbsG: 32, fatG: 15 },
        },
        {
          id: 'm-5',
          label: 'Comida',
          name: 'Lentejas estofadas con verduras',
          ingredients: 'Lentejas, zanahoria, cebolla, pimiento, tomate',
          calories: 520,
          macros: { proteinG: 28, carbsG: 78, fatG: 8 },
        },
        {
          id: 'm-6',
          label: 'Cena',
          name: 'Tortilla de espinacas con ensalada mixta',
          ingredients: 'Huevos, espinacas frescas, lechuga, tomate cherry',
          calories: 380,
          macros: { proteinG: 24, carbsG: 18, fatG: 22 },
        },
      ],
    },
    { day: 'X', totalCalories: 0, meals: [] },
    { day: 'J', totalCalories: 0, meals: [] },
    { day: 'V', totalCalories: 0, meals: [] },
    { day: 'S', totalCalories: 0, meals: [] },
    { day: 'D', totalCalories: 0, meals: [] },
  ],
};

export const mockWeightRecords: BiometricRecord[] = [
  { id: 'b-1', userId: 'user-001', metric: 'peso', value: 73.2, unit: 'kg', recordedAt: '2026-03-10T08:00:00Z' },
  { id: 'b-2', userId: 'user-001', metric: 'peso', value: 73.2, unit: 'kg', recordedAt: '2026-03-03T08:00:00Z' },
  { id: 'b-3', userId: 'user-001', metric: 'peso', value: 73.4, unit: 'kg', recordedAt: '2026-02-24T08:00:00Z' },
  { id: 'b-4', userId: 'user-001', metric: 'peso', value: 73.5, unit: 'kg', recordedAt: '2026-02-17T08:00:00Z' },
  { id: 'b-5', userId: 'user-001', metric: 'peso', value: 73.8, unit: 'kg', recordedAt: '2026-02-10T08:00:00Z' },
  { id: 'b-6', userId: 'user-001', metric: 'peso', value: 74.2, unit: 'kg', recordedAt: '2026-02-03T08:00:00Z' },
  { id: 'b-7', userId: 'user-001', metric: 'peso', value: 74.6, unit: 'kg', recordedAt: '2026-01-27T08:00:00Z' },
  { id: 'b-8', userId: 'user-001', metric: 'peso', value: 75.0, unit: 'kg', recordedAt: '2026-01-20T08:00:00Z' },
];
