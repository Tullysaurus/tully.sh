import { NextResponse } from "next/server";
import { getAuthSessionKey, hasAuthSessionSecret } from "@/lib/server/auth-session";

function forwardResponse(upstream: Response) {
  const headers = new Headers();
  const contentType = upstream.headers.get("content-type");
  if (contentType) {
    headers.set("Content-Type", contentType);
  }

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers,
  });
}

async function requireAuthKey() {
  if (!(await hasAuthSessionSecret())) {
    return NextResponse.json({ error: "Auth session is not configured." }, { status: 503 });
  }

  let key: string | null = null;
  try {
    key = await getAuthSessionKey();
  } catch (error) {
    console.error("Failed to read auth session:", error);
    return NextResponse.json({ error: "Failed to read auth session." }, { status: 500 });
  }

  if (!key) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return key;
}

export async function GET(request: Request) {
  const keyOrResponse = await requireAuthKey();
  if (keyOrResponse instanceof NextResponse) return keyOrResponse;

  const requestUrl = new URL(request.url);
  const upstreamUrl = new URL("https://api.tully.sh/uploads");
  requestUrl.searchParams.forEach((value, name) => {
    if (name !== "key") upstreamUrl.searchParams.append(name, value);
  });
  upstreamUrl.searchParams.set("key", keyOrResponse);

  const upstream = await fetch(upstreamUrl.toString(), { cache: "no-store" });
  return forwardResponse(upstream);
}

export async function DELETE(request: Request) {
  const keyOrResponse = await requireAuthKey();
  if (keyOrResponse instanceof NextResponse) return keyOrResponse;

  const requestUrl = new URL(request.url);
  const upstreamUrl = new URL("https://api.tully.sh/uploads");
  requestUrl.searchParams.forEach((value, name) => {
    if (name !== "key") upstreamUrl.searchParams.append(name, value);
  });
  upstreamUrl.searchParams.set("key", keyOrResponse);

  const upstream = await fetch(upstreamUrl.toString(), { method: "DELETE", cache: "no-store" });
  return forwardResponse(upstream);
}

export async function POST(request: Request) {
  const keyOrResponse = await requireAuthKey();
  if (keyOrResponse instanceof NextResponse) return keyOrResponse;

  const incoming = await request.formData();
  const outgoing = new FormData();

  incoming.forEach((value, key) => {
    if (key !== "key") outgoing.append(key, value);
  });
  outgoing.set("key", keyOrResponse);

  const upstream = await fetch("https://api.tully.sh/uploads", {
    method: "POST",
    body: outgoing,
    cache: "no-store",
  });

  return forwardResponse(upstream);
}
