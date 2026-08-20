import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import type { HeroContent } from "@/content/hero";

interface HeroProps {
  content: HeroContent;
}

export function Hero({ content }: HeroProps) {
  return (
    <Section id="top" paddingTop="120px" paddingBottom="90px">
      <Eyebrow path={content.path} command={content.command}>
        <span
          aria-hidden="true"
          className="ml-1 inline-block h-[1em] w-[0.5ch] translate-y-[0.15em] bg-green motion-safe:animate-[cursor-blink_1.1s_step-end_infinite]"
        />
      </Eyebrow>
      <h1 className="mt-6 max-w-[820px] font-display text-[clamp(34px,5vw,58px)] font-semibold leading-[1.08] tracking-[-0.01em] text-text">
        {content.headlineBefore}
        <span className="text-brass">{content.headlineHighlight}</span>
        {content.headlineAfter}
      </h1>
      <p className="mt-6 max-w-[560px] text-lg text-text-muted">{content.lead}</p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Button href={content.primaryCta.href} variant="primary">
          {content.primaryCta.label}
        </Button>
        <Button href={content.secondaryCta.href} variant="ghost">
          {content.secondaryCta.label}
        </Button>
      </div>
    </Section>
  );
}
