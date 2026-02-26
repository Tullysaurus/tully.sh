import { NextRequest, NextResponse } from "next/server";
import { clearAuthSession, getAuthSessionKey, hasAuthSessionSecret } from "@/lib/server/auth-session";

export async function GET() {
  if (!hasAuthSessionSecret()) {
    return NextResponse.json({ ok: false, error: "Auth session is not configured." }, { status: 503 });
  }
  let key: string | null = null;
  try {
    key = await getAuthSessionKey();
  } catch (error) {
    console.error("Failed to read auth session:", error);
    return NextResponse.json({ ok: false, error: "Failed to read auth session"}, { status: 500 });
  }

  if (!key) {
    const response = NextResponse.json({ ok: false, error: "No key provided" }, { status: 401 });
    clearAuthSession(response);
    return response;
  }

  try {
    const upstream = await fetch(`https://api.tully.sh/check?key=${encodeURIComponent(key)}`, {
      cache: "no-store",
    });

    if (!upstream.ok) {
      const response = NextResponse.json({ ok: false }, { status: 401 });
      clearAuthSession(response);
      return response;
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
