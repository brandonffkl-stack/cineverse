import { PrismaClient } from "@prisma/client";
import { ENV }          from "./environment";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ENV.isDev ? ["query", "error", "warn"] : ["error"],
  });

if (ENV.isDev) globalForPrisma.prisma = prisma;

export async function connectDB() {
  try {
    await prisma.$connect();
    console.log("✅ Base de datos conectada");
  } catch (error) {
    console.error("❌ Error conectando a la base de datos:", error);
    process.exit(1);
  }
}