import { NextResponse } from "next/server";

type RateLimitConfig = {
  windowMs: number;
  maxRequests: number;
  bucket: string;
};

type BucketState = {
  count: number;
  resetAt: number;
};

declare global {
  // eslint-disable-next-line no-var
  var __apiRateLimitStore: Map<string, BucketState> | undefined;
}

function getStore() {
  if (!globalThis.__apiRateLimitStore) {
    globalThis.__apiRateLimitStore = new Map<string, BucketState>();
  }
  return globalThis.__apiRateLimitStore;
}

function getClientIdentifier(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;

  const cloudflareIp = request.headers.get("cf-connecting-ip");
  if (cloudflareIp) return cloudflareIp;

  return "unknown";
}

export function enforceRateLimit(request: Request, config: RateLimitConfig) {
  const now = Date.now();
  const store = getStore();
  const clientId = getClientIdentifier(request);
  const key = `${config.bucket}:${request.method}:${clientId}`;
  const existing = store.get(key);

  if (!existing || existing.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + config.windowMs });
    return null;
  }

  if (existing.count >= config.maxRequests) {
    const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": retryAfterSeconds.toString(),
        },
      },
    );
  }

  existing.count += 1;
  store.set(key, existing);
  return null;
}
