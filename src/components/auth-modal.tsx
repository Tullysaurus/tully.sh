"use client";

import { useState } from "react";
import { X, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function AuthModal({
  onClose,
  checkAuth,
}: {
  onClose: () => void;
  checkAuth: (cookieString: string) => Promise<string>;
}) {
  const [key, setKey] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!key) return;

    setStatus("loading");
    setMessage("");

    try {
      // Check auth using the server action
      const res = await checkAuth(`auth=${encodeURIComponent(key)}`);

      if (res === "1") {
        // Set cookie only on success
        document.cookie = `auth=${encodeURIComponent(key)}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
        setStatus("success");
        setMessage("Access granted. You may close this window.");
      } else {
        setStatus("error");
        setMessage("Invalid access key.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleClose = () => {
    if (status === "success") {
      window.location.reload();
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-[90vw] max-w-md bg-[#1f1f1f] rounded-lg border border-neutral-800 p-6 shadow-2xl flex flex-col gap-4">
        <button
          onClick={handleClose}
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

        {status === "success" ? (
          <div className="flex flex-col items-center justify-center py-4 gap-3">
            <CheckCircle className="text-green-500 w-12 h-12" />
            <p className="text-white font-medium">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Access Key"
              className={`w-full bg-neutral-900 border ${status === "error" ? "border-red-500" : "border-neutral-700"} rounded p-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#f5b041] transition-colors`}
              autoFocus
              disabled={status === "loading"}
            />
            {status === "error" && (
              <div className="flex items-center gap-2 text-red-500 text-sm px-1">
                <AlertCircle size={16} />
                <span>{message}</span>
              </div>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#f5b041] hover:bg-[#d49b3b] disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-3 rounded transition-transform active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              {status === "loading" && <Loader2 className="animate-spin" size={18} />}
              {status === "loading" ? "Checking..." : "Submit"}
            </button>
          </form>
        )}
        <p className="text-center text-xs text-neutral-500">
          Sharing keys will result in your key being revoked
        </p>
      </div>
    </div>
  );
}