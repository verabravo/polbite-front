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
  sex: z.enum(['masculino', 'femenino']),
  birthDate: z.string().min(1, 'Requerido'),
  heightCm: z.number().min(100, 'Mínimo 100 cm').max(250, 'Máximo 250 cm'),
  weightKg: z.number().min(30, 'Mínimo 30 kg').max(300, 'Máximo 300 kg'),
});

export const biometricSchema = z.object({
  value: z.number().positive('Debe ser mayor que 0'),
  notes: z.string().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type BodyDataFormValues = z.infer<typeof bodyDataSchema>;
export type BiometricFormValues = z.infer<typeof biometricSchema>;
