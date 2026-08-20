import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { hero } from "@/content/hero";

export function Hero() {
  return (
    <Section id="top" paddingTop="120px" paddingBottom="90px">
      <p className="font-mono text-sm text-text-muted">
        {hero.terminalLine}
        <span
          aria-hidden="true"
          className="ml-1 inline-block h-[1em] w-[0.5ch] translate-y-[0.15em] bg-green motion-safe:animate-[cursor-blink_1.1s_step-end_infinite]"
        />
      </p>
      <h1 className="mt-6 max-w-[820px] font-display text-[clamp(34px,5vw,58px)] font-semibold leading-[1.08] tracking-[-0.01em] text-text">
        {hero.headlineBefore}
        <span className="text-brass">{hero.headlineHighlight}</span>
        {hero.headlineAfter}
      </h1>
      <p className="mt-6 max-w-[560px] text-lg text-text-muted">{hero.lead}</p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Button href={hero.primaryCta.href} variant="primary">
          {hero.primaryCta.label}
        </Button>
        <Button href={hero.secondaryCta.href} variant="ghost">
          {hero.secondaryCta.label}
        </Button>
      </div>
    </Section>
  );
}
