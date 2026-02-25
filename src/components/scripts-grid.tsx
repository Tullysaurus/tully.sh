"use client";

import { useState } from "react";
import GridItem from "./grid-item";
import AuthModal from "./auth-modal";

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
  checkAuthAction,
}: {
  scripts: Scripts;
  checkAuthAction: (cookieString: string) => Promise<string>;
}) {
  const [showModal, setShowModal] = useState(false);

  const handleItemClick = async (cookieString: string) => {
    const result = await checkAuthAction(cookieString);
    // If the server action returns "0", it means not authorized
    if (result === "0") {
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