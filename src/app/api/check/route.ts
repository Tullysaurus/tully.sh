import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import * as crypto from 'crypto'
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const key = crypto
        .createHash('sha256')
        .update(
            searchParams.get("key") || ""
        )
        .digest("hex")
  

  if (!key) {
    return NextResponse.json({ error: "Missing key parameter" }, { status: 400 });
  }

  const { env } = await getCloudflareContext({ async: true})
  const connectionString = env.HYPERDRIVE.connectionString;
  const clientConfig: any = { connectionString };

  // Force SSL for local tunnel to AWS RDS
  if (connectionString.includes("localhost")) {
      clientConfig.ssl = { rejectUnauthorized: false };
  }

  const pool = new Pool(clientConfig);
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const keyFound = await prisma.key.findUnique({
      where: { key },
    });


    if (keyFound) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json({ success: false }, { status: 401 });
      
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error: " + error.message }, { status: 500 });
  }
}