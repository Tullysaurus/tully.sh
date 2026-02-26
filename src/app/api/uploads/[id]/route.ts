import { getAuthSessionKey } from "@/lib/server/auth-session";
import { NextRequest } from "next/server";
import { enforceRateLimit } from "@/lib/server/rate-limit";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const rateLimited = enforceRateLimit(request, {
    bucket: "api-upload-download",
    windowMs: 60 * 1000,
    maxRequests: 20,
  });
  if (rateLimited) return rateLimited;

  try {
    const authKey = await getAuthSessionKey();
    const res = await fetch(`https://api.tully.sh/check?key=${authKey}`)
    if (!res.ok) {
      return new Response("Unauthorized", { status: 401 });
    }
  } catch (e) {
    return new Response("Unauthorized", { status: 401 });
  }



  const { id } = await params;
  const safeId = id.replace(/[^a-zA-Z0-9_-]/g, "");

  if (!safeId) {
    return new Response("Invalid upload id", { status: 400 });
  }

  const upstream = await fetch(`https://r2.tully.sh/uploads/${safeId}.zip`, {});

  if (!upstream.ok) {
    return new Response("Upload not found", { status: upstream.status });
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `inline; filename="${safeId}.zip"`,
      "Cache-Control": "no-store",
    },
  });
}
