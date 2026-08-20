import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { CaseStudy } from "@/content/case-studies";

interface CaseStudyCardProps {
  study: CaseStudy;
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <div className="overflow-hidden rounded-[6px] border border-panel-line bg-panel">
      <div className="flex items-center gap-2 border-b border-panel-line bg-chrome px-5 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-panel-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-panel-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-panel-line" />
        <span className="ml-3 font-mono text-xs text-text-muted">{study.url}</span>
      </div>

      <div className="grid grid-cols-1 gap-10 p-7 min-[700px]:grid-cols-[55fr_45fr] min-[700px]:p-10">
        <div>
          <p className="font-mono text-sm text-brass">{study.role}</p>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.01em] text-text">{study.name}</h3>
          {study.paragraphs.map((paragraph, index) => (
            <p key={index} className="mt-4 text-text-muted">
              {paragraph}
            </p>
          ))}
          <a
            href={study.href}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-brass transition-colors duration-150 ease-out hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
          >
            {study.linkLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <ul>
          {study.specs.map((spec, index) => (
            <li
              key={spec.label}
              className={cn("flex gap-2 py-3 text-sm", index !== 0 && "border-t border-panel-line")}
            >
              <span className="font-semibold text-text">{spec.label}</span>
              <span className="text-text-muted">{spec.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
