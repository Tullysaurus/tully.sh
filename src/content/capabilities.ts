export interface Capability {
  index: string;
  title: string;
  description: string;
}

export const capabilitiesSection = {
  eyebrow: "capabilities",
  title: "What I can build",
  description: "Placeholder description of the breadth of engagements this covers.",
};

export const capabilities: Capability[] = [
  {
    index: "01",
    title: "Websites & web apps",
    description:
      "Placeholder — the proven lane: design, domain, hosting, SEO, and branding all fold in here.",
  },
  {
    index: "02",
    title: "Backend, APIs & integrations",
    description: "Placeholder copy describing backend, API, and integration work.",
  },
  {
    index: "03",
    title: "Automation & tooling",
    description: "Placeholder copy describing automation and internal tooling work.",
  },
  {
    index: "04",
    title: "Infra, deployment & hosting",
    description: "Placeholder copy describing infrastructure and deployment work.",
  },
];
