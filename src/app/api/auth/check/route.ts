import { NextResponse } from "next/server";
import { clearAuthSession, getAuthSessionKey } from "@/lib/server/auth-session";

export async function GET() {
  const key = await getAuthSessionKey();
  if (!key) {
    return NextResponse.json({ ok: false }, { status: 401 });
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
