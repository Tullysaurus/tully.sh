import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const AUTH_COOKIE_NAME = "auth_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

type SessionPayload = {
  key: string;
  exp: number;
};

let cachedCryptoKey: Promise<CryptoKey> | null = null;




function getSessionSecret() {
  const secret = process.env.AUTH_SESSION_SECRET
  if (!secret || secret.length < 32) {
    throw new Error("AUTH_SESSION_SECRET must be set and at least 32 characters long.");
  }
  return secret;
}

export function hasAuthSessionSecret() {
  const secret = process.env.AUTH_SESSION_SECRET
  return Boolean(secret && secret.length >= 32);
}

function base64UrlEncode(input: Uint8Array) {
  let binary = "";
  input.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  const base64 =
    typeof btoa === "function"
      ? btoa(binary)
      : Buffer.from(binary, "binary").toString("base64");

  return base64
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64UrlDecode(input: string) {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary =
    typeof atob === "function"
      ? atob(padded)
      : Buffer.from(padded, "base64").toString("binary");
  return Uint8Array.from(binary, (char) => (char as string).charCodeAt(0));
}

async function getCryptoKey() {
  if (!cachedCryptoKey) {
    cachedCryptoKey = (async () => {
      const encoder = new TextEncoder();
      const secretBytes = encoder.encode(await getSessionSecret());
      const keyMaterial = await crypto.subtle.digest("SHA-256", secretBytes);
      return crypto.subtle.importKey("raw", keyMaterial, { name: "AES-GCM" }, false, [
        "encrypt",
        "decrypt",
      ]);
    })();
  }
  return cachedCryptoKey;
}

async function encryptPayload(payload: SessionPayload) {
  const key = await getCryptoKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const plaintext = new TextEncoder().encode(JSON.stringify(payload));
  const ciphertext = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plaintext));
  return `${base64UrlEncode(iv)}.${base64UrlEncode(ciphertext)}`;
}

async function decryptPayload(token: string) {
  const [ivPart, ciphertextPart] = token.split(".");
  if (!ivPart || !ciphertextPart) return null;

  try {
    const key = await getCryptoKey();
    const iv = base64UrlDecode(ivPart);
    const ciphertext = base64UrlDecode(ciphertextPart);
    const plaintext = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext);
    const parsed = JSON.parse(new TextDecoder().decode(plaintext)) as SessionPayload;
    if (!parsed.key || !parsed.exp || parsed.exp < Date.now()) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function setAuthSession(response: NextResponse, rawKey: string) {
  const payload: SessionPayload = {
    key: rawKey,
    exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
  };

  response.cookies.set(AUTH_COOKIE_NAME, await encryptPayload(payload), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export function clearAuthSession(response: NextResponse) {
  response.cookies.set(AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function getAuthSessionKey() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = await decryptPayload(token);
  return payload?.key ?? null;
}
