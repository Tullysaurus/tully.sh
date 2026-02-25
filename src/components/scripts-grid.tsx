"use client";

import GridItem from "./grid-item";
import checkAuth from "@/lib/auth";
import { useModals } from "@/lib/modals";

interface Scripts {
  [key: string]: {
    title: string | null;
    description: string | null;
    id: string | null;
    url: string | null;
    date: number | null;
  };
}

export default function ScriptsGrid({
  scripts,
}: {
  scripts: Scripts;
}) {
  const { openAuthModal } = useModals();

  const handleItemClick = async (cookieString: string) => {
    const result = await checkAuth(Object.fromEntries(cookieString.split("; ").map((c) => c.split("=")))["auth"] || "");
    // If the server action returns "0", it means not authorized
    if (!result) {
      openAuthModal();
    }
    return result;
  };

  return (
    <>
      <div className="grid w-full max-w-6xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-0">
        {Object.keys(scripts).map((key) => (
          <GridItem key={key} {...scripts[key]} onclick={handleItemClick} />
        ))}
      </div>
    </>
  );
}
