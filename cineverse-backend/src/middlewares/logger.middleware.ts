import morgan from "morgan";
import { ENV } from "../config/environment";

// Formato colorido para desarrollo
export const logger = morgan(
  ENV.isDev
    ? ":method :url :status :response-time ms"
    : "combined"
);