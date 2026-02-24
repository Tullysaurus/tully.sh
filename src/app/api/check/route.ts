// src/app/api/check/route.ts
import getPrisma from "@/lib/prisma";

export async function fetch(request: Request, env: { DATABASE_URL: string }) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key") || "";

  const prisma = getPrisma(env); // getPrisma internally reads env or global prisma

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