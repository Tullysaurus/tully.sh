import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HairlineGrid, HairlineGridItem } from "@/components/ui/HairlineGrid";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { routerCards, routerSection } from "@/content/router";

export function Router() {
  return (
    <Section>
      <SectionHeading
        path={routerSection.path}
        command={routerSection.command}
        title={routerSection.title}
        description={routerSection.description}
      />
      <HairlineGrid className="grid-cols-1 min-[600px]:grid-cols-2">
        {routerCards.map((card) => (
          <HairlineGridItem key={card.href}>
            <h3 className="font-display text-xl font-semibold tracking-[-0.01em] text-text">{card.title}</h3>
            <p className="mt-3 text-text-muted">{card.description}</p>
            <ArrowLink href={card.href} className="mt-6">
              {card.linkLabel}
            </ArrowLink>
          </HairlineGridItem>
        ))}
      </HairlineGrid>
    </Section>
  );
}
