"use client";

import { useState } from "react";
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

  return (
    <div className="w-full">
      <div className="relative lg:hidden">
        <div className="absolute bottom-1 left-[14px] top-1 w-px bg-white/35" />
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <article key={item.id} className="flex items-center gap-3">
              <div className="z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-white bg-background">
                {item.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#FFC17B]">{item.period}</p>
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                <p className="text-xs leading-relaxed text-neutral-300">{item.details}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="timeline-scroll overflow-x-auto pb-3">
          <div className="relative w-max min-w-full px-2 pt-10 after:absolute after:left-0 after:top-10 after:h-px after:w-full after:bg-white">
            <div className="flex w-max min-w-full flex-nowrap gap-4">
              {items.map((item) => {
                const isActive = item.id === activeId;
                return (
                  <article key={item.id} className="relative w-52 shrink-0">
                    <div className="absolute left-1/2 top-0 z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/70 bg-background">
                      {item.icon}
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveId(item.id)}
                      className={
                        "relative mt-10 w-full cursor-pointer rounded-sm border border-white/10 bg-[#171717] px-3 py-2 text-left text-neutral-100 transition-all " +
                        (isActive
                          ? "-translate-y-0.5 shadow-[0_4px_10px_rgba(0,0,0,0.22)]"
                          : "opacity-95 hover:-translate-y-0.5 hover:opacity-100")
                      }
                    >
                      <span className="absolute -top-2 left-1/2 h-2 w-px -translate-x-1/2 bg-white/45" />
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-white/35">{getYear(item.period)}</p>
                      <h3 className="mt-0.5 text-sm font-semibold">{item.title}</h3>
                      <p className={"mt-1 text-xs leading-relaxed text-neutral-300 " + (isActive ? "" : "line-clamp-2")}>
                        {item.details}
                      </p>
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
