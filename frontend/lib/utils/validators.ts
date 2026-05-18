import { z } from "zod";

// ── Auth ──────────────────────────────────────────────────────────
export const loginSchema = z.object({
  email:    z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export const registerSchema = z.object({
  displayName: z
    .string()
    .min(2,  "Mínimo 2 caracteres")
    .max(40, "Máximo 40 caracteres"),
  username: z
    .string()
    .min(3,  "Mínimo 3 caracteres")
    .max(20, "Máximo 20 caracteres")
    .regex(/^[a-z0-9_]+$/, "Solo letras minúsculas, números y _"),
  email:    z.string().email("Email inválido"),
  password: z
    .string()
    .min(8,  "Mínimo 8 caracteres")
    .regex(/[A-Z]/,  "Debe tener al menos una mayúscula")
    .regex(/[0-9]/,  "Debe tener al menos un número"),
  confirmPassword: z.string(),
}).refine(
  (data) => data.password === data.confirmPassword,
  { message: "Las contraseñas no coinciden", path: ["confirmPassword"] }
);

// ── Rating ────────────────────────────────────────────────────────
export const ratingSchema = z.object({
  movieId: z.string().min(1),
  stars:   z.number().int().min(1).max(5),
  review:  z.string().max(500, "Máximo 500 caracteres").optional(),
});

// ── Perfil ────────────────────────────────────────────────────────
export const profileSchema = z.object({
  displayName: z
    .string()
    .min(2,  "Mínimo 2 caracteres")
    .max(40, "Máximo 40 caracteres"),
  bio: z
    .string()
    .max(160, "Máximo 160 caracteres")
    .optional(),
});

// ── Tipos inferidos ───────────────────────────────────────────────
export type LoginForm    = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
export type RatingForm   = z.infer<typeof ratingSchema>;
export type ProfileForm  = z.infer<typeof profileSchema>;