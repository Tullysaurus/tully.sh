'use client';

import { useState } from "react";

export default function Proxy() {
  const [status, setStatus] = useState<"idle" | "redirecting" >("idle");

  const handleGoToProxy = async () => {
    setStatus("redirecting");
    window.location.replace("https://proxy.tully.sh");
    return;
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 pb-10 pt-10 lg:pt-16">
      <h1 className="text-center text-4xl italic font-light sm:text-5xl">tully.sh/cheats/<span className="text-[#FFC17B]">proxy</span></h1>
      <p className="max-w-xl text-center text-base font-semibold sm:text-lg">
        {status === "idle" && "Click below to continue to the proxy."}
        {status === "redirecting" && "Access granted. Redirecting to proxy"}
        </p>
      <button
        onClick={handleGoToProxy}
        disabled={status === "redirecting"}
        className="cursor-pointer rounded bg-[#f5b041] px-5 py-2 font-bold text-black transition-colors hover:bg-[#d49b3b] disabled:cursor-not-allowed disabled:opacity-60"
      >
        Go to proxy
      </button>
    </div>
  );
}
