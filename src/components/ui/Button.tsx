import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { isInternalHref } from "@/lib/is-internal-href";

type ButtonVariant = "primary" | "ghost" | "outline";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonVariant;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-brass text-ink hover:bg-brass/90",
  ghost: "border border-panel-line text-text hover:border-brass hover:text-brass",
  outline: "border border-brass-dim text-brass hover:border-brass hover:bg-brass hover:text-ink",
};

export function Button({ href, variant = "primary", className, children, ...props }: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-[3px] px-6 py-3 font-mono text-sm font-medium transition-colors duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass",
    variantStyles[variant],
    className,
  );

  if (isInternalHref(href)) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
}
