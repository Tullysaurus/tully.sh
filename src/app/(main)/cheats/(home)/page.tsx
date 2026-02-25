'use client';

import Link from "next/link";

export default function CheatsHome() {
  const cheatsTags = [
    {
      id: "scripts",
      title: "Scripts Library",
      description: "Prebuilt tools and utilities for quick workflows.",
      tone: "bg-[#1e2321] border-[#2f5a49]",
    },
    {
      id: "uploads",
      title: "Uploads Exchange",
      description: "Browse and preview shared upload archives fast.",
      tone: "bg-[#23211e] border-[#5b4f34]",
    },
    {
      id: "proxy",
      title: "Proxy Experiments",
      description: "In-progress routing and network bypass utilities.",
      tone: "bg-[#1f2026] border-[#3f4665]",
    },
    {
      id: "private",
      title: "Key-Gated Access",
      description: "Protected areas with lightweight auth flow.",
      tone: "bg-[#241f26] border-[#4f3d61]",
    },
  ];

  const scrollingTags = [...cheatsTags, ...cheatsTags];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 pb-10 pt-10 lg:pt-16">
      <h1 className="reveal-up text-center text-4xl italic font-light sm:text-5xl">tully.sh/<span className="text-[#FFC17B]">cheats</span></h1>

      <p className="reveal-up delay-1 max-w-2xl text-center text-base font-semibold sm:text-lg">
        A private toolkit area for rapid utilities, script drops, and experimental tools.
      </p>
      <p className="reveal-up delay-2 max-w-3xl text-center text-sm text-neutral-300 sm:text-base">
        This section is focused on practical workflows: quickly accessing shared scripts,
        previewing upload bundles, and testing features before they get promoted into core projects.
      </p>
      <div className="reveal-up delay-3 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/cheats/scripts"
          className="rounded bg-[#f5b041] px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-[#d49b3b]"
        >
          Explore Scripts
        </Link>
        <Link
          href="/cheats/uploads"
          className="rounded border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
        >
          Browse Uploads
        </Link>
      </div>
      <div className="reveal-up delay-4 home-card-marquee w-full overflow-hidden">
        <div className="home-card-track flex w-max items-stretch gap-3 py-1">
          {scrollingTags.map((tag, index) => (
            <article
              key={`${tag.id}-${index}`}
              className={`w-[18rem] shrink-0 rounded-md border p-3 ${tag.tone}`}
            >
              <p className="text-sm font-semibold text-white">{tag.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-neutral-300">{tag.description}</p>
            </article>
          ))}
        </div>
      </div>
      <p className="reveal-up delay-4 text-center text-xs text-neutral-500">
        Some tools require a valid access key.
      </p>
    </div>
  );
}
