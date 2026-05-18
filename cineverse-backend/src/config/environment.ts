import dotenv from "dotenv";
import path   from "path";

// Apunta explícitamente al .env en la raíz del backend
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export const ENV = {
  PORT:               process.env.PORT              ?? "4000",
  NODE_ENV:           process.env.NODE_ENV           ?? "development",
  DATABASE_URL:       process.env.DATABASE_URL       ?? "",
  JWT_SECRET:         process.env.JWT_SECRET         ?? "dev-secret",
  JWT_EXPIRES_IN:     process.env.JWT_EXPIRES_IN     ?? "15m",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET ?? "dev-refresh",
  FRONTEND_URL:       process.env.FRONTEND_URL       ?? "http://localhost:3000",
  isDev:              process.env.NODE_ENV !== "production",
};