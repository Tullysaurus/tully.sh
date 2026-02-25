"use client";

import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BugPlay, CheckCircle2, CloudUpload, Github, House, Key, Loader2, Megaphone, Router, Terminal } from "lucide-react";
import AuthModal from "./auth-modal";
import SidebarLink from "./sidebar-link";
import SocialLink from "./social-link";
import checkAuth from "@/lib/auth";

export default function Sidebar() {
  const pathname = usePathname();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authStatus, setAuthStatus] = useState<"idle" | "checking" | "valid" | "invalid">("idle");

  const urls: {
    [key: string]: {
      name: string;
      icon: ReactElement;
    };
  } = Object.fromEntries(
    Object.entries({
      "/": {
        name: "Home",
        icon: <House className="h-4 w-4 lg:h-5 lg:w-5" />,
      },
      "/projects": {
        name: "Projects",
        icon: <Terminal className="h-4 w-4 lg:h-5 lg:w-5" />,
      },
      "/blog": {
        name: "Blog",
        icon: <Megaphone className="h-4 w-4 lg:h-5 lg:w-5" />,
      },
      "/cheats": {
        name: "Home",
        icon: <House className="h-4 w-4 lg:h-5 lg:w-5" />,
      },
      "/cheats/scripts": {
        name: "Scripts",
        icon: <BugPlay className="h-4 w-4 lg:h-5 lg:w-5" />,
      },
      "/cheats/uploads": {
        name: "Uploads",
        icon: <CloudUpload className="h-4 w-4 lg:h-5 lg:w-5" />,
      },
      "/cheats/proxy": {
        name: "Proxy",
        icon: <Router className="h-4 w-4 lg:h-5 lg:w-5" />,
      },
    }).filter(([k]) => (
      (k.startsWith("/cheats") && pathname.startsWith("/cheats")) ||
      (!pathname.startsWith("/cheats") && !k.startsWith("/cheats"))
    )),
  );

  useEffect(() => {
    if (!pathname.startsWith("/cheats")) return;

    const authKey = Object.fromEntries(document.cookie.split("; ").map((c) => c.split("=")))["auth"] || "";
    if (!authKey) {
      setAuthStatus("invalid");
      return;
    }

    setAuthStatus("checking");
    checkAuth(authKey)
      .then((isValid) => {
        setAuthStatus(isValid ? "valid" : "invalid");
      })
      .catch(() => {
        setAuthStatus("invalid");
      });
  }, [pathname, showAuthModal]);

  return (
    <aside className="sticky top-0 z-30 w-full border-b border-neutral-800 bg-[#0f0f0f] px-4 py-3 lg:flex lg:h-screen lg:w-64 lg:min-w-64 lg:flex-col lg:border-b-0 lg:border-r lg:px-6 lg:py-8">
      <h1 className="mb-3 flex h-fit w-full justify-center lg:mb-8">
        <Link href="/" className="flex h-fit w-fit justify-center text-2xl italic font-bold lg:text-4xl">
          <p>tully</p>
          <p className="text-[#FFC17B]">.sh</p>
        </Link>
      </h1>

      <nav className="w-full lg:flex-1">
        <div className="flex w-full flex-wrap items-center justify-center gap-2 text-sm lg:flex-col lg:items-start lg:gap-1 lg:text-base">
          {Object.keys(urls).map((key) => (
            <SidebarLink key={key} href={key} pathname={pathname}>
              {urls[key].icon}
              {urls[key].name}
            </SidebarLink>
          ))}
        </div>
      </nav>

      <div className="mt-3 flex w-full flex-col justify-center gap-3 lg:mt-auto">
        {pathname.startsWith("/cheats") && (
          <button
            onClick={() => {
              if (authStatus !== "valid") setShowAuthModal(true);
            }}
            className={
              "flex w-full items-center justify-center gap-2 rounded py-2 font-bold transition-transform active:scale-[0.98] " +
              (authStatus === "valid"
                ? "cursor-default bg-green-600 text-white"
                : "cursor-pointer bg-[#f5b041] text-black hover:bg-[#d49b3b]")
            }
          >
            {authStatus === "checking" ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Checking key...
              </>
            ) : authStatus === "valid" ? (
              <>
                <CheckCircle2 size={20} />
                Key Active
              </>
            ) : (
              <>
                <Key size={20} />
                Enter Key
              </>
            )}
          </button>
        )}
        <div className="hidden h-fit w-full flex-row items-center justify-around lg:flex">
          <SocialLink
            href="https://discord.com/users/694274948071555154"
            icon={<img src="https://r2.tully.sh/icons/discord.png" className="h-fit w-5" />}
          />
          <SocialLink href="https://github.com/tullysaurus" icon={<Github className="w-6 fill-white" />} />
        </div>
        <p className="hidden text-center text-sm lg:block">(c) 2026 Tully</p>
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </aside>
  );
}
