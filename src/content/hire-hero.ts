import { paths } from "@/config/paths";
import type { HeroContent } from "@/content/hero";

export const hireHero: HeroContent = {
  path: paths.hire,
  command: "cat pitch.md",
  headlineBefore: "Hire an engineer who ships the ",
  headlineHighlight: "whole thing",
  headlineAfter: ", not just the design.",
  lead: "Placeholder lead paragraph naming what an end-to-end build with you looks like.",
  primaryCta: { label: "Get in touch", href: "#contact" },
  secondaryCta: { label: "See recent work", href: "#work" },
};
