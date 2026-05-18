import app          from "./app";
import { connectDB } from "./config/database";
import { ENV }       from "./config/environment";

async function main() {
  // Conectar base de datos
  await connectDB();

  // Iniciar servidor
  app.listen(ENV.PORT, () => {
    console.log(`
  ⬡  CineVerse API
  ─────────────────────────────────
  🚀 Servidor: http://localhost:${ENV.PORT}
  📡 Health:   http://localhost:${ENV.PORT}/health
  🗄️  API v1:   http://localhost:${ENV.PORT}/api/v1
  🌍 Entorno:  ${ENV.NODE_ENV}
  ─────────────────────────────────
    `);
  });
}

main().catch((err) => {
  console.error("❌ Error iniciando servidor:", err);
  process.exit(1);
});