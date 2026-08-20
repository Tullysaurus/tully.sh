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

export const hero: HeroContent = {
  path: paths.home,
  command: "whoami",
  headlineBefore: "I build sites, tools, and systems, and take them to ",
  headlineHighlight: "production",
  headlineAfter: ".",
  lead: "Websites, internal tools, automation scripts, the infrastructure underneath; I like picking up whatever a project actually needs and building something that works.",
  primaryCta: { label: "Hire me", href: "#contact" },
  secondaryCta: { label: "See my work", href: "#work" },
};
