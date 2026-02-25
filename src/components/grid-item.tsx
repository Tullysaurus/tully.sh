"use client";

import { useState } from "react";

export default function GridItem({
  title,
  description,
  id,
  url,
  date,
  onclick,
}: {
  title: string | null;
  description: string | null;
  id: string | null;
  url: string | null;
  date: number | null;
  onclick: (c: string) => Promise<boolean>;
}) {
  const unixTime = new Date(date || 0);
  const dayOfMonth = unixTime.getDate();
  const month = unixTime.toLocaleString("default", { month: "short" });
  const [auth, setAuth] = useState(false);

  return (
    <div
      onClick={() => {
        if (auth) {
          window.open(url || "", "_blank");
          return;
        }
        onclick(document.cookie).then((res) => {
          if (res) {
            setAuth(true);
            window.open(url || "", "_blank");
          }
        });
      }}
      className="group flex h-full min-h-80 w-full cursor-pointer flex-col overflow-hidden rounded-lg bg-[#1f1f1f] transition hover:scale-[1.02]"
    >
      <div className="relative h-44 w-full overflow-hidden bg-neutral-800 sm:h-48">
        <img
          src={`https://r2.tully.sh/scripts/preview/${id}.png`}
          alt="Preview"
          className="h-full w-full object-cover"
        />

        <div className="absolute right-3 top-3 rounded bg-[#f5b041] px-2 py-1 text-xs font-semibold text-black">
          <div className="leading-none text-center">
            <div>{dayOfMonth}</div>
            <div className="text-[10px]">{month}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4 text-white">
        <h3 className="text-lg font-semibold leading-tight transition group-hover:text-[#f5b041]">
          {title}
        </h3>

        <p className="line-clamp-3 text-sm text-neutral-400">{description}</p>

        <span className="mt-auto pt-1 text-sm font-medium text-[#f5b041]">Get Now {"->"}</span>
      </div>
    </div>
  );
}
