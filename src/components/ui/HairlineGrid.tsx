import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface HairlineGridProps {
  className?: string;
  children: ReactNode;
}

/**
 * The seam-bordered card grid reused across the site (homepage router
 * cards, /hire capability cards, /projects cards): a 1px background color
 * shows through the grid gap as hairline dividers between cards. Column
 * count is supplied by the caller via className so the same grid works at
 * 2-up, 4-up, or any other layout.
 */
export function HairlineGrid({ className, children }: HairlineGridProps) {
  return <div className={cn("grid gap-px bg-panel-line", className)}>{children}</div>;
}

interface HairlineGridItemProps {
  className?: string;
  children: ReactNode;
}

export function HairlineGridItem({ className, children }: HairlineGridItemProps) {
  return <div className={cn("bg-ink p-8", className)}>{children}</div>;
}
