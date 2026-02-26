"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
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
  const [searchName, setSearchName] = useState("");

  const rowDelayClass = (index: number) => {
    const row = Math.floor(index / 3);
    if (row <= 0) return "";
    if (row === 1) return "delay-1";
    if (row === 2) return "delay-2";
    if (row === 3) return "delay-3";
    return "delay-4";
  };

  const handleItemClick = async () => {
    const result = await checkAuth();
    // If the server action returns "0", it means not authorized
    if (!result) {
      openAuthModal();
    }
    return result;
  };

  const filteredEntries = useMemo(
    () =>
      Object.entries(scripts).filter(([, script]) =>
        (script.title || "").toLowerCase().includes(searchName.toLowerCase()),
      ),
    [scripts, searchName],
  );

  return (
    <>
      <div className="w-full max-w-6xl px-4 lg:px-0">
        <div className="mb-4 flex items-center rounded border border-neutral-700 bg-neutral-900 px-3">
          <Search size={18} className="mr-2 text-neutral-500" />
          <input
            type="text"
            placeholder="Search scripts by name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="w-full border-none bg-transparent py-2 text-sm text-white placeholder:text-neutral-600 outline-none"
          />
        </div>
      </div>
      <div className="grid w-full max-w-6xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-0">
        {filteredEntries.map(([key, script], index) => (
          <div key={key} className={`reveal-up ${rowDelayClass(index)}`}>
            <GridItem {...script} onclick={handleItemClick} />
          </div>
        ))}
      </div>
    </>
  );
}
