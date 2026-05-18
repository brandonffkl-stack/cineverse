import type { Response } from "express";

interface SuccessOptions {
  data:    unknown;
  message?: string;
  meta?:   Record<string, unknown>;
  status?: number;
}

interface ErrorOptions {
  message: string;
  code?:   string;
  status?: number;
  errors?: unknown;
}

// ── Respuesta exitosa estándar ────────────────────────────────────
export function sendSuccess(res: Response, opts: SuccessOptions) {
  return res.status(opts.status ?? 200).json({
    success: true,
    message: opts.message,
    data:    opts.data,
    meta:    opts.meta,
  });
}

// ── Respuesta de error estándar ───────────────────────────────────
export function sendError(res: Response, opts: ErrorOptions) {
  return res.status(opts.status ?? 500).json({
    success: false,
    error: {
      code:    opts.code    ?? "INTERNAL_ERROR",
      message: opts.message,
      errors:  opts.errors,
    },
  });
}

// ── Helpers rápidos ───────────────────────────────────────────────
export const ok          = (res: Response, data: unknown, meta?: any) =>
  sendSuccess(res, { data, meta });

export const created     = (res: Response, data: unknown) =>
  sendSuccess(res, { data, status: 201, message: "Recurso creado exitosamente" });

export const notFound    = (res: Response, msg = "Recurso no encontrado") =>
  sendError(res, { message: msg, code: "NOT_FOUND", status: 404 });

export const badRequest  = (res: Response, msg: string, errors?: unknown) =>
  sendError(res, { message: msg, code: "BAD_REQUEST", status: 400, errors });

export const unauthorized = (res: Response, msg = "No autorizado") =>
  sendError(res, { message: msg, code: "UNAUTHORIZED", status: 401 });

export const forbidden   = (res: Response, msg = "Acceso denegado") =>
  sendError(res, { message: msg, code: "FORBIDDEN", status: 403 });