export default async function checkAuth(auth: string) {
  if (!auth) return false;

  try {
    const res = await fetch(`https://api.tully.sh/check?key=${auth}`, {});
    return res.ok;
  } catch (err) {
    console.error("Auth check failed:", err);
    return false;
  }
}