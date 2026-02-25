"use client";

import { useMemo, useState } from "react";
import type { ReactElement } from "react";

type TimelineItem = {
  id: string;
  period: string;
  title: string;
  details: string;
  icon: ReactElement;
};

function getYear(period: string) {
  const match = period.match(/\d{4}/);
  return match ? match[0] : period;
}

export default function Timeline({ items }: { items: TimelineItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const activeItem = useMemo(
    () => items.find((item) => item.id === activeId) ?? items[0],
    [activeId, items],
  );

  return (
    <div className="w-full">
      <div className="relative pl-8 lg:hidden">
        <div className="absolute bottom-2 left-4 top-2 w-px bg-white/35" />
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <article key={item.id} className="relative rounded-md border border-white/15 bg-[#1a1a1a] px-3 py-2">
              <div className="absolute left-4 top-4 z-10 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-background">
                {item.icon}
              </div>
              <div className="pl-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#FFC17B]">{item.period}</p>
                <h3 className="mt-0.5 text-sm font-semibold text-white sm:text-base">{item.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-neutral-300 sm:text-sm">{item.details}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="rounded-lg border border-white/15 bg-[#1a1a1a] p-4">
          <div className="relative px-2 pb-8 pt-4">
            <div className="absolute left-2 right-2 top-8 h-px bg-white/35" />
            <div className="relative flex items-center justify-between gap-2">
              {items.map((item) => {
                const isActive = item.id === activeItem?.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveId(item.id)}
                    className={
                      "group flex flex-col items-center gap-2 bg-transparent px-1 text-center cursor-pointer transition-colors " +
                      (isActive ? "text-[#FFC17B]" : "text-neutral-300 hover:text-white")
                    }
                  >
                    <span
                      className={
                        "z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 bg-background text-xs font-bold transition-colors " +
                        (isActive ? "border-[#FFC17B]" : "border-white/60")
                      }
                    >
                      {getYear(item.period)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {activeItem && (
            <div className="rounded-md border border-white/10 bg-black/20 p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white/70">
                  {activeItem.icon}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#FFC17B]">{activeItem.period}</p>
                  <h3 className="mt-1 text-base font-semibold text-white">{activeItem.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-300">{activeItem.details}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
