'use client';

import Link from "next/link";

export default function CheatsHome() {
  const cheatsTags = [
    {
      id: "scripts",
      title: "Scripts Library",
      description: "Prebuilt tools and utilities for doing homework faster.",
      tone: "bg-[#1e2321] border-[#2f5a49]",
    },
    {
      id: "uploads",
      title: "Uploads",
      description: "Share and view answers to full assignments and tests.",
      tone: "bg-[#23211e] border-[#5b4f34]",
    },
    {
      id: "proxy",
      title: "Web Proxy",
      description: "Built-in web proxy with network bypass utilities.",
      tone: "bg-[#1f2026] border-[#3f4665]",
    },
    {
      id: "private",
      title: "Active users",
      description: "Active users uploading the answers as they come out.",
      tone: "bg-[#241f26] border-[#4f3d61]",
    },
  ];

  const scrollingTags = [...cheatsTags, ...cheatsTags];
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 pb-10 pt-10 lg:pt-16">
      <h1 className="reveal-up text-center text-4xl italic font-light sm:text-5xl">tully.sh/<span className="text-[#FFC17B]">cheats</span></h1>

      <p className="reveal-up delay-1 max-w-3xl text-center text-base font-semibold sm:text-lg">
        A private toolkit area for simple scripts, answer sharing tools, and internet bypasses.
      </p>
      <p className="reveal-up delay-2 max-w-3xl text-center text-sm text-neutral-300 sm:text-base">
        This is your place to cheat in school; pre-made and tested scripts to cheat on online assignments,
        viewing and sharing answers to assignments, and browsing the internet without restrictions.
      </p>
      <div className="reveal-up delay-3 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/cheats/scripts"
          className="inline-flex min-w-[10.5rem] items-center justify-center rounded-md bg-[#f5b041] px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-[#d49b3b]"
        >
          Explore Scripts
        </Link>
        <Link
          href="/cheats/uploads"
          className="inline-flex min-w-[10.5rem] items-center justify-center rounded-md border border-[#6f8dff] bg-transparent px-4 py-2 text-sm font-semibold text-[#b9c8ff] transition-colors hover:bg-[#6f8dff]/10"
        >
          Browse Uploads
        </Link>
        <Link
          href="/cheats/proxy"
          className="inline-flex min-w-[10.5rem] items-center justify-center rounded-md border border-[#58a585] bg-transparent px-4 py-2 text-sm font-semibold text-[#8fd6b7] transition-colors hover:bg-[#58a585]/10"
        >
          Search Freely
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
        Some tools may require a valid access key.
      </p>
    </div>
  );
}
