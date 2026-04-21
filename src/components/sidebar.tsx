"use client";

import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BugPlay, CheckCircle2, CloudUpload, Github, House, Key, Loader2, Megaphone, Router, Shield, ShieldOff, Terminal } from "lucide-react";
import SidebarLink from "./sidebar-link";
import SocialLink from "./social-link";
export default function Sidebar() {
  const pathname = usePathname();
 
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
      "/cheats/proxy": {
        name: "Proxy",
        icon: <Router className="h-4 w-4 lg:h-5 lg:w-5" />,
      },
    }).filter(([k]) => (
      (k.startsWith("/cheats") && pathname.startsWith("/cheats")) ||
      (!pathname.startsWith("/cheats") && !k.startsWith("/cheats"))
    )),
  );

  return (
    <aside className="relative sticky top-0 z-30 w-full border-b border-neutral-800 bg-[#0f0f0f] px-4 py-3 lg:flex lg:h-screen lg:w-64 lg:min-w-64 lg:flex-col lg:border-b-0 lg:border-r lg:px-6 lg:py-8">
      <h1 className="mb-3 flex h-fit w-full justify-center lg:mb-8">
        <Link href="/" className="flex h-fit w-fit justify-center text-2xl italic font-bold lg:text-4xl">
          <p>tully</p>
          <p className="text-[#FFC17B]">.sh</p>
        </Link>
      </h1>

      <nav className="w-full lg:flex-1">
        <div className="w-full overflow-x-auto pb-1 lg:overflow-visible lg:pb-0">
          <div className="mx-auto flex w-max min-w-full flex-nowrap items-center justify-center gap-2 text-sm lg:w-full lg:min-w-0 lg:flex-col lg:items-start lg:gap-1 lg:text-base">
            {Object.keys(urls).map((key) => (
              <SidebarLink key={key} href={key} pathname={pathname}>
                {urls[key].icon}
                {urls[key].name}
              </SidebarLink>
            ))}
          </div>
        </div>
      </nav>

      <div className="mt-3 flex w-full flex-col justify-center gap-3 lg:mt-auto">
        <div className="hidden h-fit w-full flex-row items-center justify-around lg:flex">
          <SocialLink
            href="https://discord.com/users/694274948071555154"
            icon={<img src="https://tully.sh/icons/discord.png" className="h-fit w-5" />}
          />
          <SocialLink href="https://github.com/tullysaurus" icon={<Github className="w-6 fill-white" />} />
        </div>
        <p className="hidden text-center text-sm lg:block">© 2026 Tully</p>
      </div>

      {!pathname.startsWith("/cheats") && (
        <button
          onClick={()=>{
            window.location.replace("/cheats")
          }}
          aria-label="Go to cheats"
          className="absolute bottom-0 left-0 h-6 w-12 cursor-pointer"
        />
      )}

    </aside>
  );
}
