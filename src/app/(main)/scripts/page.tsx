import { cookies } from "next/headers";
import Client from "@/components/client";
import GridItem from "@/components/grid-item";

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

async function checkAuth(auth: string) {
  if (!auth) return false;

  try {
    const res = await fetch(`https://api.tully.sh/check?key=${auth}`, {
      cache: "no-store", // Ensure we don't cache auth results
    });
    return res.ok;
  } catch (err) {
    console.error("Auth check failed:", err);
    return false;
  }
}

export default async function ScriptsPage() {
  // 1. Fetch the cookie on the server
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("auth")?.value;

  // 2. Run the check
  const isAuthorized = await checkAuth(authCookie || "");

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
    return authResult ? "1" : "0";
  };

  // Client-side prompt logic
  const requestAuth = async (window: Window) => {
    "use server";
    const key = window.prompt("Please enter your access key:");
    if (key) {
      document.cookie = `auth=${encodeURIComponent(key)}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full items-center pt-[10vh] gap-8">
      {/* If NOT authorized, 'run' becomes true, 
          which triggers the useEffect in your Client component 
      */}
      <Client fn={requestAuth} callback={() => {}} run={!isAuthorized} />

      <h1 className="text-5xl italic font-light">tully.sh/scripts</h1>

      <div className="w-[70vw] grid grid-cols-1 md:grid-cols-3 gap-4">
        {isAuthorized ? (
          Object.keys(scripts).map((key) => (
            <GridItem key={key} {...scripts[key]} onclick={clicked} />
          ))
        ) : (
          <p className="col-span-3 text-center opacity-50">
            Please authenticate to view scripts.
          </p>
        )}
      </div>
    </div>
  );
}