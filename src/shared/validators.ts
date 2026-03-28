import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Mínimo 2 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Mínimo 6 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export const bodyDataSchema = z.object({
  sex: z.enum(['Male', 'Female']),
  birthDate: z.string().min(1, 'Requerido'),
  heightCm: z.number().min(100, 'Mínimo 100 cm').max(250, 'Máximo 250 cm'),
  weightKg: z.number().min(30, 'Mínimo 30 kg').max(300, 'Máximo 300 kg'),
});

export const newBiometricSchema = z.object({
  weight_kg: z.number().min(20, 'Mínimo 20 kg').max(500, 'Máximo 500 kg'),
  body_fat_percentage: z
    .number()
    .min(1, 'Mínimo 1%')
    .max(70, 'Máximo 70%')
    .optional()
    .nullable(),
  waist_cm: z.number().min(10, 'Mínimo 10 cm').max(500, 'Máximo 500 cm').optional().nullable(),
  chest_cm: z.number().min(10, 'Mínimo 10 cm').max(500, 'Máximo 500 cm').optional().nullable(),
  hip_cm: z.number().min(10, 'Mínimo 10 cm').max(500, 'Máximo 500 cm').optional().nullable(),
  navel_cm: z.number().min(10, 'Mínimo 10 cm').max(500, 'Máximo 500 cm').optional().nullable(),
  left_thigh_cm: z.number().min(10, 'Mínimo 10 cm').max(500, 'Máximo 500 cm').optional().nullable(),
  right_thigh_cm: z.number().min(10, 'Mínimo 10 cm').max(500, 'Máximo 500 cm').optional().nullable(),
  left_bicep_cm: z.number().min(10, 'Mínimo 10 cm').max(500, 'Máximo 500 cm').optional().nullable(),
  right_bicep_cm: z.number().min(10, 'Mínimo 10 cm').max(500, 'Máximo 500 cm').optional().nullable(),
});

export const reviewSchema = z.object({
  weight_kg: z.number().min(20, 'Mínimo 20 kg').max(500, 'Máximo 500 kg'),
  week_comment: z.string().optional(),
  diet_feedback: z.string().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type BodyDataFormValues = z.infer<typeof bodyDataSchema>;
export type NewBiometricFormValues = z.infer<typeof newBiometricSchema>;
export type ReviewFormValues = z.infer<typeof reviewSchema>;
