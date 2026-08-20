import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services, servicesSection } from "@/content/services";

export function Services() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow={servicesSection.eyebrow}
        title={servicesSection.title}
        description={servicesSection.description}
      />
      <div className="grid grid-cols-1 gap-px bg-panel-line min-[700px]:grid-cols-2">
        {services.map((service) => (
          <div key={service.index} className="bg-ink p-8">
            <span className="font-mono text-sm text-brass-dim">{service.index}</span>
            <h3 className="mt-4 font-display text-xl font-semibold tracking-[-0.01em] text-text">
              {service.title}
            </h3>
            <p className="mt-3 text-text-muted">{service.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
