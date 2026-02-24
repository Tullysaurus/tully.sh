import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

declare global {
  var prisma: PrismaClient | undefined;
}

/**
 * Initialize Prisma with a database URL from the environment.
 * In Cloudflare Workers, the URL comes from the `env` argument, not process.env.
 */
export function getPrisma(env: { DATABASE_URL: string }) {
  if (!env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required in environment bindings");
  }

  // Create PostgreSQL pool
  const pool = new Pool({ connectionString: env.DATABASE_URL });
  const adapter = new PrismaPg(pool);

  // Use global cache to prevent multiple instances during development
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      adapter,
      log: ["query"],
    });
  }

  return global.prisma;
}