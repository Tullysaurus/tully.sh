"use client";

import { usePathname } from "next/navigation";

export default function PageReveal({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="reveal-up">
      {children}
    </div>
  );
}
