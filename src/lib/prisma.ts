import { getCloudflareContext } from '@opennextjs/cloudflare';
import { Client } from 'pg';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// 1. Next.js Hot Reload Cache to prevent zombie connections
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export async function getPrisma(){
    const { env } = await getCloudflareContext({ async: true });

  // 3. Initialize Prisma globally so it survives Next.js refreshes
    if (!globalForPrisma.prisma) {
        const connectionString = env.HYPERDRIVE.connectionString;
        const clientConfig: any = { connectionString };

        // Force SSL for local tunnel to AWS RDS
        if (connectionString.includes("localhost")) {
            clientConfig.ssl = { rejectUnauthorized: false };
        }

        const client = new Client(clientConfig);

        await client.connect();
        
        const adapter = new PrismaPg(client);
        
        globalForPrisma.prisma = new PrismaClient({ adapter });
    }

  const prisma = globalForPrisma.prisma;
  return prisma;

}