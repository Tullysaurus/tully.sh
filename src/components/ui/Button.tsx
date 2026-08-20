import type { AnchorHTMLAttributes, ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "ghost" | "outline";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonVariant;
  /** Optional leading icon, e.g. a brand mark like Discord's. */
  icon?: string;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-brass text-ink hover:bg-brass/90",
  ghost: "border border-panel-line text-text hover:border-brass hover:text-brass",
  outline: "border border-brass-dim text-brass hover:border-brass hover:bg-brass hover:text-ink",
};

export function Button({ href, variant = "primary", icon, className, children, ...props }: ButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[3px] px-6 py-3 font-mono text-sm font-medium transition-colors duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {icon && <Image src={icon} alt="" width={16} height={16} className="h-4 w-4 object-contain" />}
      {children}
    </a>
  );
}
