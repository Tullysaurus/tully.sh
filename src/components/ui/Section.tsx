import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";

interface SectionProps {
  id?: string;
  border?: boolean;
  paddingTop?: string;
  paddingBottom?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}

/**
 * Layout wrapper shared by every page section: fixed side padding via
 * Container, configurable vertical rhythm, and the hairline bottom border
 * that separates sections instead of background-color changes.
 */
export function Section({
  id,
  border = true,
  paddingTop = "90px",
  paddingBottom = "90px",
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      style={{ paddingTop, paddingBottom }}
      className={cn(border && "border-b border-panel-line", className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
