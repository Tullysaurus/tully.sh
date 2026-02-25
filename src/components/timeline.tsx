"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  const railRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const animationRef = useRef<number | null>(null);
  const scrollCarryRef = useRef(0);
  const [isRailHovered, setIsRailHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [centeredIndex, setCenteredIndex] = useState<number | null>(null);
  const duplicatedItems = useMemo(() => [...items, ...items, ...items], [items]);

  const updateCenteredIndex = useCallback(() => {
    const rail = railRef.current;
    if (!rail || duplicatedItems.length === 0) return;

    const railRect = rail.getBoundingClientRect();
    const railCenter = railRect.left + railRect.width / 2;
    let bestIndex = 0;
    let bestDistance = Number.POSITIVE_INFINITY;

    itemRefs.current.forEach((node, index) => {
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const dist = Math.abs(center - railCenter);
      if (dist < bestDistance) {
        bestDistance = dist;
        bestIndex = index;
      }
    });

    setCenteredIndex(bestIndex);
  }, [duplicatedItems.length]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || duplicatedItems.length === 0) return;

    const contentWidth = rail.scrollWidth;
    const segmentWidth = contentWidth / 3;
    const maxScroll = contentWidth - rail.clientWidth;
    if (maxScroll <= 1) return;
    rail.scrollLeft = Math.max(1, Math.min(maxScroll - 1, segmentWidth));

    const animate = () => {
      const currentSegment = rail.scrollWidth / 3;
      const currentMax = rail.scrollWidth - rail.clientWidth;
      if (currentMax <= 1) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      if (!isRailHovered) {
        scrollCarryRef.current += 0.2;
        const step = Math.floor(scrollCarryRef.current);
        if (step > 0) {
          rail.scrollLeft -= step;
          scrollCarryRef.current -= step;
        }
        if (rail.scrollLeft <= currentSegment * 0.5) {
          rail.scrollLeft += currentSegment;
        }
      }

      updateCenteredIndex();
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [duplicatedItems.length, isRailHovered, updateCenteredIndex]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const onScroll = () => {
      const segment = rail.scrollWidth / 3;
      if (segment > 0) {
        if (rail.scrollLeft <= segment * 0.5) rail.scrollLeft += segment;
        if (rail.scrollLeft >= segment * 2.5) rail.scrollLeft -= segment;
      }
      if (isRailHovered) updateCenteredIndex();
    };

    rail.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateCenteredIndex);
    updateCenteredIndex();

    return () => {
      rail.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateCenteredIndex);
    };
  }, [isRailHovered, updateCenteredIndex]);

  const expandedIndex = isRailHovered ? hoveredIndex : centeredIndex;

  return (
    <div className="w-full">
      <div
        ref={railRef}
        onMouseEnter={() => {
          setIsRailHovered(true);
        }}
        onMouseLeave={() => {
          setIsRailHovered(false);
          setHoveredIndex(null);
        }}
        className="timeline-scroll overflow-x-auto pb-3"
      >
        <div className="relative w-max min-w-full px-2 pt-10 after:absolute after:left-0 after:top-10 after:h-px after:w-full after:bg-white">
          <div className="flex w-max min-w-full flex-nowrap gap-3 sm:gap-4">
            {duplicatedItems.map((item, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <article
                  key={`${item.id}-${index}`}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  className="relative w-60 shrink-0 sm:w-56 lg:w-52"
                >
                  <div className="absolute left-1/2 top-0 z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/70 bg-background">
                    {item.icon}
                  </div>
                  <div
                    onMouseEnter={() => setHoveredIndex(index)}
                    className={
                      "relative mt-10 h-36 w-full rounded-sm border border-white/10 bg-[#171717] px-3 py-2 text-left text-neutral-100 transition-all " +
                      (isExpanded
                        ? "-translate-y-0.5 shadow-[0_4px_10px_rgba(0,0,0,0.22)]"
                        : "opacity-95 hover:-translate-y-0.5 hover:opacity-100")
                    }
                  >
                    <span className="absolute -top-2 left-1/2 h-2 w-px -translate-x-1/2 bg-white/45" />
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-white/35">{getYear(item.period)}</p>
                    <h3 className="mt-0.5 min-h-[34px] text-sm font-semibold leading-snug">{item.title}</h3>
                    <div className="mt-1 h-[58px]">
                      <p
                        className={
                          "text-xs leading-relaxed text-neutral-300 " +
                          (isExpanded ? "h-full overflow-y-auto pr-1" : "line-clamp-3")
                        }
                      >
                        {item.details}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
