import { cn } from "@/lib/cn";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about, aboutSection } from "@/content/about";

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow={aboutSection.eyebrow}
        title={aboutSection.title}
        description={aboutSection.description}
      />
      <div className="grid grid-cols-1 items-start gap-14 min-[760px]:grid-cols-[0.8fr_1.2fr]">
        <div className="flex aspect-square items-center justify-center rounded-[6px] border border-panel-line bg-[linear-gradient(135deg,var(--panel),var(--ink))]">
          <span className="font-mono text-[52px] text-brass-dim">{about.monogram}</span>
        </div>

        <div>
          {about.paragraphs.map((paragraph, index) => (
            <p key={index} className={cn("text-text-muted", index !== 0 && "mt-4")}>
              {paragraph}
            </p>
          ))}

          <div className="mt-10 flex flex-wrap gap-9">
            {about.stats.map((stat) => (
              <div key={stat.value}>
                <p className="font-display text-[26px] font-semibold tracking-[-0.01em] text-brass">{stat.value}</p>
                <p className="mt-1 text-sm text-text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
