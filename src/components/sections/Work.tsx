import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HairlineGrid, HairlineGridItem } from "@/components/ui/HairlineGrid";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { caseStudies } from "@/content/case-studies";
import { projects } from "@/content/projects";
import { workSection } from "@/content/work";

export function Work() {
  return (
    <Section id="work">
      <SectionHeading
        path={workSection.path}
        command={workSection.command}
        title={workSection.title}
        description={workSection.description}
      />
      <div className="flex flex-col gap-8">
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.name} study={study} />
        ))}
      </div>
      <HairlineGrid className="mt-8 grid-cols-1 min-[640px]:grid-cols-2 min-[1000px]:grid-cols-3">
        {projects.map((project) => (
          <HairlineGridItem key={project.name} className="flex flex-col">
            <h3 className="font-display text-xl font-semibold tracking-[-0.01em] text-text">{project.name}</h3>
            <p className="mt-3 flex-1 text-text-muted">{project.description}</p>
            <p className="mt-4 font-mono text-xs text-text-muted">{project.tags.join(" · ")}</p>
            <ArrowLink href={project.href} target="_blank" rel="noreferrer" className="mt-6">
              {project.linkLabel}
            </ArrowLink>
          </HairlineGridItem>
        ))}
      </HairlineGrid>
    </Section>
  );
}
