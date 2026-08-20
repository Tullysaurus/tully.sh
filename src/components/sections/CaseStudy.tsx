import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { caseStudies, caseStudySection } from "@/content/case-studies";

export function CaseStudy() {
  return (
    <Section id="work">
      <SectionHeading
        eyebrow={caseStudySection.eyebrow}
        title={caseStudySection.title}
        description={caseStudySection.description}
      />
      <div className="flex flex-col gap-8">
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.name} study={study} />
        ))}
      </div>
    </Section>
  );
}
