import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface ArrowLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

export function ArrowLink({ href, className, children, ...props }: ArrowLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center gap-2 font-mono text-sm text-brass transition-colors duration-150 ease-out hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass",
        className,
      )}
      {...props}
    >
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}
