// src/app/api/check/route.ts
import getPrisma from "@/lib/prisma";
import { env } from "cloudflare:workers";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key") || "";


  const ENV = {
    DATABASE_URL: env.DATABASE_URL || process.env.DATABASE_URL,
  }

  const prisma = getPrisma(ENV); // getPrisma internally reads env or global prisma

  if (!key) {
    return new Response(JSON.stringify({ error: "Missing key parameter" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const keyFound = await prisma.key.findUnique({
      where: { key },
    });

    if (keyFound) {
      return new Response(JSON.stringify({ success: true, key }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: false, key }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}