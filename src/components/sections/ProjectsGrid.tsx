import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HairlineGrid, HairlineGridItem } from "@/components/ui/HairlineGrid";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { projects, projectsSection } from "@/content/projects";

export function ProjectsGrid() {
  return (
    <Section border={false}>
      <SectionHeading
        path={projectsSection.path}
        command={projectsSection.command}
        title={projectsSection.title}
        description={projectsSection.description}
      />
      <HairlineGrid className="grid-cols-1 min-[640px]:grid-cols-2 min-[1000px]:grid-cols-3">
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
