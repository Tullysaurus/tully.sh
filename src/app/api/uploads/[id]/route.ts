import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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
