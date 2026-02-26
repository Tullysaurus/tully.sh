import { NextResponse } from "next/server";
import { clearAuthSession, hasAuthSessionSecret, setAuthSession } from "@/lib/server/auth-session";

export async function POST(request: Request) {
  if (!(await hasAuthSessionSecret())) {
    return NextResponse.json(
      { error: "Server auth session is not configured (missing AUTH_SESSION_SECRET)." },
      { status: 503 },
    );
  }

  let key = "";

  try {
    const body = (await request.json()) as { key?: string };
    key = (body.key ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!key) {
    return NextResponse.json({ error: "Key is required." }, { status: 400 });
  }

  const upstream = await fetch(`https://api.tully.sh/check?key=${encodeURIComponent(key)}`, {
    cache: "no-store",
  });

  if (!upstream.ok) {
    return NextResponse.json({ error: "Invalid access key." }, { status: 401 });
  }

  try {
    const response = NextResponse.json({ ok: true });
    await setAuthSession(response, key);
    return response;
  } catch (error) {
    console.error("Failed to set auth session:", error);
    return NextResponse.json({ error: "Failed to create secure session." }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  clearAuthSession(response);
  return response;
}
