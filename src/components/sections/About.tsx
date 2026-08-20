import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about, aboutSection } from "@/content/about";

export function About() {
  return (
    <Section id="about">
      <SectionHeading path={aboutSection.path} command={aboutSection.command} title={aboutSection.title} />
      <p className="max-w-[640px] text-text-muted">{about.paragraph}</p>
      <div className="mt-10 flex flex-wrap gap-9">
        {about.stats.map((stat) => (
          <div key={stat.value}>
            <p className="font-display text-[26px] font-semibold tracking-[-0.01em] text-brass">{stat.value}</p>
            <p className="mt-1 text-sm text-text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
