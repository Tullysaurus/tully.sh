import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import * as crypto from 'crypto'
import postgres from 'postgres';

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

  const sql = postgres(connectionString);

  try {
    const result = await sql`SELECT EXISTS (SELECT 1 FROM keys WHERE key = ${key})`;
    console.log("Query result: " + result)


    if (result) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json({ success: false }, { status: 401 });
      
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error: " + error.message }, { status: 500 });
  }
}