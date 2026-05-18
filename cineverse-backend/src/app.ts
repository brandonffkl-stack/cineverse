import express        from "express";
import cors           from "cors";
import helmet         from "helmet";
import { logger }     from "./middlewares/logger.middleware";
import { generalLimiter } from "./middlewares/rateLimit.middleware";
import { errorHandler }   from "./middlewares/errorHandler.middleware";
import { ENV }        from "./config/environment";
import v1Router       from "./routes/v1";

const app = express();

// ── Seguridad ─────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin:      ENV.FRONTEND_URL,
  credentials: true,
  methods:     ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
}));

// ── Parsing ───────────────────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ── Logging ───────────────────────────────────────────────────────
app.use(logger);

// ── Rate limiting ─────────────────────────────────────────────────
app.use(generalLimiter);

// ── Health check ──────────────────────────────────────────────────
app.get("/health", (_, res) => {
  res.json({
    status:      "ok",
    service:     "CineVerse API",
    version:     "1.0.0",
    environment: ENV.NODE_ENV,
    timestamp:   new Date().toISOString(),
  });
});

// ── Ruta raíz ───────────────────────────────────────────────────────
app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "CineVerse API",
    api:     "/api/v1",
  });
});

// ── Rutas API ─────────────────────────────────────────────────────
app.use("/api/v1", v1Router);

// ── 404 ───────────────────────────────────────────────────────────
app.use((_, res) => {
  res.status(404).json({
    success: false,
    error: { code: "NOT_FOUND", message: "Ruta no encontrada" },
  });
});

// ── Error handler global ──────────────────────────────────────────
app.use(errorHandler);

export default app;