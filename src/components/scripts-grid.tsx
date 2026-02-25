"use client";

import { useState } from "react";
import GridItem from "./grid-item";
import AuthModal from "./auth-modal";
import checkAuth from "@/lib/auth";

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
  const [showModal, setShowModal] = useState(false);

  const handleItemClick = async (cookieString: string) => {
    const result = await checkAuth(Object.fromEntries(cookieString.split("; ").map((c) => c.split("=")))["auth"] || "");
    // If the server action returns "0", it means not authorized
    if (!result) {
      setShowModal(true);
    }
    return result;
  };

  return (
    <>
      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
      <div className="w-[70vw] grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.keys(scripts).map((key) => (
          <GridItem key={key} {...scripts[key]} onclick={handleItemClick} />
        ))}
      </div>
    </>
  );
}