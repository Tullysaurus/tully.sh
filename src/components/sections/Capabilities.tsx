import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HairlineGrid, HairlineGridItem } from "@/components/ui/HairlineGrid";
import { capabilities, capabilitiesSection } from "@/content/capabilities";

export function Capabilities() {
  return (
    <Section id="capabilities">
      <SectionHeading
        path={capabilitiesSection.path}
        command={capabilitiesSection.command}
        title={capabilitiesSection.title}
        description={capabilitiesSection.description}
      />
      <HairlineGrid className="grid-cols-1 min-[700px]:grid-cols-2">
        {capabilities.map((capability) => (
          <HairlineGridItem key={capability.index}>
            <span className="font-mono text-sm text-brass-dim">{capability.index}</span>
            <h3 className="mt-4 font-display text-xl font-semibold tracking-[-0.01em] text-text">
              {capability.title}
            </h3>
            <p className="mt-3 text-text-muted">{capability.description}</p>
          </HairlineGridItem>
        ))}
      </HairlineGrid>
    </Section>
  );
}
