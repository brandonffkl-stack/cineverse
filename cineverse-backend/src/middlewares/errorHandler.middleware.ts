import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";
import { sendError } from "../utils/response";
import { ENV }       from "../config/environment";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Error controlado de la app
  if (err instanceof AppError) {
    return sendError(res, {
      message: err.message,
      code:    err.code,
      status:  err.statusCode,
    });
  }

  // Error de Prisma — registro duplicado
  if ((err as any).code === "P2002") {
    return sendError(res, {
      message: "Ya existe un registro con esos datos",
      code:    "DUPLICATE_ENTRY",
      status:  409,
    });
  }

  // Error de Prisma — no encontrado
  if ((err as any).code === "P2025") {
    return sendError(res, {
      message: "Registro no encontrado",
      code:    "NOT_FOUND",
      status:  404,
    });
  }

  // Error genérico
  console.error("❌ Error no controlado:", err);
  return sendError(res, {
    message: ENV.isDev ? err.message : "Error interno del servidor",
    code:    "INTERNAL_ERROR",
    status:  500,
  });
}