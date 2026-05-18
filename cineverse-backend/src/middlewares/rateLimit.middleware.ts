import rateLimit from "express-rate-limit";

// Rate limit general — 100 req/min por IP
export const generalLimiter = rateLimit({
  windowMs:         60 * 1000,
  max:              100,
  standardHeaders:  true,
  legacyHeaders:    false,
  message: {
    success: false,
    error: {
      code:    "RATE_LIMIT",
      message: "Demasiadas solicitudes. Intenta en 1 minuto.",
    },
  },
});

// Rate limit para login — 10 intentos/hora
export const authLimiter = rateLimit({
  windowMs:         60 * 60 * 1000,
  max:              10,
  standardHeaders:  true,
  legacyHeaders:    false,
  message: {
    success: false,
    error: {
      code:    "AUTH_RATE_LIMIT",
      message: "Demasiados intentos. Intenta en 1 hora.",
    },
  },
});