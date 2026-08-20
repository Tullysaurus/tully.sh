import type { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
}

/**
 * The shell-prompt label ("$ services") repeated above every section
 * heading — the one signature element that ties the page to a `.sh` /
 * developer identity.
 */
export function Eyebrow({ children }: EyebrowProps) {
  return (
    <p className="font-mono text-sm tracking-wide">
      <span className="text-green">$ </span>
      <span className="text-brass">{children}</span>
    </p>
  );
}
