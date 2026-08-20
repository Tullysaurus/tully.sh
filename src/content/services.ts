export interface Service {
  index: string;
  title: string;
  description: string;
}

export const servicesSection = {
  eyebrow: "services",
  title: "What I do",
  description: "Placeholder description of the kinds of engagements you take on.",
};

export const services: Service[] = [
  {
    index: "01",
    title: "Product engineering",
    description: "Placeholder copy describing end-to-end product build work.",
  },
  {
    index: "02",
    title: "Systems design",
    description: "Placeholder copy describing architecture and infrastructure work.",
  },
  {
    index: "03",
    title: "Performance & reliability",
    description: "Placeholder copy describing optimization and hardening work.",
  },
  {
    index: "04",
    title: "Technical advisory",
    description: "Placeholder copy describing consulting and advisory work.",
  },
];
