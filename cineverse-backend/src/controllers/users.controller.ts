import type { Request, Response } from "express";
import { UsersService }  from "../services/users.service";
import { ok, created, badRequest, unauthorized } from "../utils/response";
import type { AuthRequest } from "../middlewares/auth.middleware";
import { z }             from "zod";

const svc = new UsersService();

const registerSchema = z.object({
  displayName: z.string().min(2).max(40),
  username:    z.string().min(3).max(20).regex(/^[a-z0-9_]+$/),
  email:       z.string().email(),
  password:    z.string().min(8),
});

const loginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(1),
});

export async function register(req: Request, res: Response) {
  try {
    const registerData = registerSchema.parse(req.body);
    const data = await svc.register({
      displayName: registerData.displayName,
      username: registerData.username,
      email: registerData.email,
      password: registerData.password,
    });
    return created(res, data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return badRequest(res, "Datos inválidos", error.errors);
    }
    throw error;
  }
}

export async function login(req: Request, res: Response) {
  try {
    const loginData = loginSchema.parse(req.body);
    const data = await svc.login({
      email: loginData.email,
      password: loginData.password,
    });
    if (!data) return unauthorized(res, "Credenciales incorrectas");
    return ok(res, data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return badRequest(res, "Datos inválidos");
    }
    throw error;
  }
}

export async function refresh(req: Request, res: Response) {
  const { refreshToken } = req.body;
  if (!refreshToken) return badRequest(res, "Token requerido");
  const data = await svc.refreshToken(refreshToken);
  if (!data) return unauthorized(res, "Token inválido");
  return ok(res, data);
}

export async function getMe(req: AuthRequest, res: Response) {
  const user = await svc.findById(req.userId!);
  return ok(res, user);
}

export async function updateMe(req: AuthRequest, res: Response) {
  const data = await svc.update(req.userId!, req.body);
  return ok(res, data);
}

export async function getMyStats(req: AuthRequest, res: Response) {
  const data = await svc.getStats(req.userId!);
  return ok(res, data);
}

export async function getPublicProfile(req: Request, res: Response) {
  const data = await svc.findByUsername(req.params.username);
  return ok(res, data);
}