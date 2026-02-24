import { getPrisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import * as crypto from 'crypto'

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

  const prisma = await getPrisma();


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