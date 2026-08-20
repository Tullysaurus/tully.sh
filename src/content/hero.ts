import { paths } from "@/config/paths";

export interface HeroContent {
  path: string;
  command: string;
  headlineBefore: string;
  headlineHighlight: string;
  headlineAfter: string;
  lead: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export const homeHero: HeroContent = {
  path: paths.home,
  command: "whoami",
  headlineBefore: "I build sites, tools, and systems, and take them to ",
  headlineHighlight: "production",
  headlineAfter: ".",
  lead: "Placeholder lead paragraph naming the range: web, apps, automation, infrastructure — without turning into a bullet list.",
  primaryCta: { label: "Hire me", href: "/hire" },
  secondaryCta: { label: "See my work", href: "/projects" },
};
