import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV }            from "../config/environment";
import { unauthorized }   from "../utils/response";

export interface AuthRequest extends Request {
  userId?: string;
  userEmail?: string;
}

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return unauthorized(res, "Token no proporcionado");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, ENV.JWT_SECRET) as {
      userId: string;
      email:  string;
    };
    req.userId    = payload.userId;
    req.userEmail = payload.email;
    next();
  } catch {
    return unauthorized(res, "Token inválido o expirado");
  }
}

// Middleware opcional — no falla si no hay token
export function optionalAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return next();

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, ENV.JWT_SECRET) as {
      userId: string;
      email:  string;
    };
    req.userId    = payload.userId;
    req.userEmail = payload.email;
  } catch {
    // Ignorar error
  }
  next();
}