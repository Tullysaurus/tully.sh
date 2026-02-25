import { cookies } from "next/headers";
import ScriptsGrid from "@/components/scripts-grid";
import checkAuth from "@/lib/auth";

// Type definition for your R2 data
interface Scripts {
  [key: string]: {
    title: string | null;
    description: string | null;
    id: string | null;
    url: string | null;
    date: number | null;
  };
}

export default async function ScriptsPage() {
  // 1. Fetch the cookie on the server
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("auth")?.value;

  // 3. Fetch data from R2
  const scripts: Scripts = await fetch("https://r2.tully.sh/scripts/scripts.json", {
    next: { revalidate: 60 } // Cache for 1 minute
  }).then((res) => res.json());

  // Server Action to handle item clicks
  const clicked = async (cookieString: string) => {
    "use server";
    const cookiesObj = Object.fromEntries(
      cookieString.split("; ").map((c) => c.split("="))
    );
    const authResult = await checkAuth(cookiesObj["auth"]);
    return authResult;
  };

  return (
    <div className="flex flex-col min-h-screen w-full items-center pt-[10vh] gap-8">
      <h1 className="text-5xl italic font-light">tully.sh/scripts</h1>
      <ScriptsGrid scripts={scripts} checkAuthAction={clicked} />
    </div>
  );
}