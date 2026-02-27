import { apiUrl } from "@/lib/api-client";

export default async function checkModeratorAccess() {
  try {
    const params = new URLSearchParams({
      status: "PENDING",
      take: "1",
    });

    const res = await fetch(apiUrl(`/moderation/uploads?${params.toString()}`), {
      cache: "no-store",
      credentials: "include",
    });

    return res.ok;
  } catch (err) {
    console.error("Moderator access check failed:", err);
    return false;
  }
}
