export interface HeroContent {
  terminalLine: string;
  headlineBefore: string;
  headlineHighlight: string;
  headlineAfter: string;
  lead: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export const homeHero: HeroContent = {
  terminalLine: "$ whoami",
  headlineBefore: "I build software — sites, tools, systems — and take it all the way to ",
  headlineHighlight: "production",
  headlineAfter: ".",
  lead: "Placeholder lead paragraph naming the range: web, apps, automation, infrastructure — without turning into a bullet list.",
  primaryCta: { label: "Hire me", href: "/hire" },
  secondaryCta: { label: "See my work", href: "/projects" },
};
