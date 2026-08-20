import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/Eyebrow";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 max-w-[640px]", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.01em] text-text">{title}</h2>
      {description && <p className="mt-4 text-text-muted">{description}</p>}
    </div>
  );
}
