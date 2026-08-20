import type { ReactNode } from "react";

interface EyebrowProps {
  /** Working directory shown in the prompt, e.g. "~" or "~/hire". */
  path: string;
  /** The command itself, e.g. "whoami" or "ls services/". */
  command: string;
  /** Optional trailing content rendered after the command — used by the hero's blinking cursor. */
  children?: ReactNode;
}

/**
 * The shell-prompt label ("tully@tully.sh:~/hire$ ls services/") repeated
 * above every section heading — the signature element that ties the page
 * to a `.sh` / developer identity, and (via the path segment) to the
 * current page's place in the site map.
 */
export function Eyebrow({ path, command, children }: EyebrowProps) {
  return (
    <p className="font-mono text-sm tracking-wide">
      <span className="text-text-muted">tully@tully.sh:{path}$ </span>
      <span className="text-brass">{command}</span>
      {children}
    </p>
  );
}
