import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/Eyebrow";

interface SectionHeadingProps {
  path: string;
  command: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({ path, command, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 max-w-[640px]", className)}>
      <Eyebrow path={path} command={command} />
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.01em] text-text">{title}</h2>
      {description && <p className="mt-4 text-text-muted">{description}</p>}
    </div>
  );
}
