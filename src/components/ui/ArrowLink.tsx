import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { isInternalHref } from "@/lib/is-internal-href";

interface ArrowLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

export function ArrowLink({ href, className, children, ...props }: ArrowLinkProps) {
  const classes = cn(
    "inline-flex items-center gap-2 font-mono text-sm text-brass transition-colors duration-150 ease-out hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass",
    className,
  );
  const content = (
    <>
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </>
  );

  if (isInternalHref(href)) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...props}>
      {content}
    </a>
  );
}
