'use client';

export default function GetKey() {
  const cheatsTags = [
    {
      id: "scripts",
      title: "Scripts",
      description: "Access to prebuilt tools and utilities for doing homework faster.",
      tone: "bg-[#1e2321] border-[#2f5a49]",
    },
    {
      id: "uploads",
      title: "Uploads",
      description: "Get full access to all uploaded assingments and tests",
      tone: "bg-[#23211e] border-[#5b4f34]",
    },
    {
      id: "active",
      title: "Users",
      description: "Join a private group who gets full access to everything the site provides.",
      tone: "bg-[#241f26] border-[#4f3d61]",
    },
  ];

  const scrollingTags = [...cheatsTags, ...cheatsTags];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 pb-10 pt-10 lg:pt-16">
      <h1 className="reveal-up text-center text-4xl italic font-light sm:text-5xl">tully.sh/cheats/<span className="text-[#FFC17B]">get-key</span></h1>

      <p className="reveal-up delay-1 max-w-2xl text-center text-base font-semibold sm:text-lg">
        Unlock the full cheats toolkit with one access key.
      </p>
      <p className="reveal-up delay-2 max-w-3xl text-center text-sm text-neutral-300 sm:text-base">
        Get instant access to premium uploads, private answers, and the best scripts.
        One key gives you everything in one place; no setup headaches.
      </p>
      <div className="reveal-up delay-3 home-card-marquee w-full max-w-3xl overflow-hidden">
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
      <section className="reveal-up delay-4 w-full max-w-3xl text-left">
        <h2 className="text-base font-semibold text-white">How To Get A Key</h2>
        <p className="mt-3 text-sm leading-relaxed text-neutral-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-neutral-300">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </section>
      <p className="reveal-up delay-4 text-center text-xs text-neutral-500">
        Access keys are limited. Buy once and start using everything immediately.
      </p>
    </div>
  );
}
