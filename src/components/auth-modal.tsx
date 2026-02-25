"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const [key, setKey] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key) {
      // Set cookie and reload to trigger server-side auth check
      document.cookie = `auth=${encodeURIComponent(key)}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-[90vw] max-w-md bg-[#1f1f1f] rounded-lg border border-neutral-800 p-6 shadow-2xl flex flex-col gap-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>
        <div className="text-center">
          <h2 className="text-xl font-bold text-[#f5b041] mb-2">Enter Access Key</h2>
          <p className="text-neutral-400 text-sm mt-1">
            Keys are purchasable in person for <span className="text-[#f5b041] font-semibold">$5</span> cash
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Access Key"
            className="w-full bg-neutral-900 border border-neutral-700 rounded p-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#f5b041] transition-colors"
            autoFocus
          />
          <button
            type="submit"
            className="w-full bg-[#f5b041] hover:bg-[#d49b3b] text-black font-bold py-3 rounded transition-transform active:scale-[0.98] cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}