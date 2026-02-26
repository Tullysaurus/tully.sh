export default async function checkAuth() {
  try {
    const res = await fetch("/api/auth/check", { cache: "no-store" });
    return res.ok;

  } catch (err) {
    
    console.error("Auth check failed:", err);
    return false;
  }
}
