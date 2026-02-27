import { apiUrl } from "@/lib/api-client";

export default async function checkAuth() {
  try {
    const res = await fetch(apiUrl("/auth/check"), {
      cache: "no-store",
      credentials: "include",
    });
    return res.ok;

  } catch (err) {
    
    console.error("Auth check failed:", err);
    return false;
  }
}
