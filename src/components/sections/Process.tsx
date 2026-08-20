import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps, processSection } from "@/content/process";

export function Process() {
  return (
    <Section id="process">
      <SectionHeading
        eyebrow={processSection.eyebrow}
        title={processSection.title}
        description={processSection.description}
      />
      <div className="grid grid-cols-1 gap-8 min-[480px]:grid-cols-2 min-[800px]:grid-cols-4">
        {processSteps.map((step) => (
          <div key={step.label} className="border-l-2 border-brass-dim pl-5">
            <span className="font-mono text-sm text-brass">{step.label}</span>
            <h3 className="mt-3 font-display text-[17px] font-semibold tracking-[-0.01em] text-text">
              {step.title}
            </h3>
            <p className="mt-2 text-sm text-text-muted">{step.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
