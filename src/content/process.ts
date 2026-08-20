export interface ProcessStep {
  label: string;
  title: string;
  description: string;
}

export const processSection = {
  eyebrow: "process",
  title: "How it works",
  description: "Placeholder description of the shape of a typical engagement.",
};

export const processSteps: ProcessStep[] = [
  { label: "01", title: "Message me", description: "Placeholder copy for the first-contact step." },
  { label: "02", title: "Design & build", description: "Placeholder copy for the design-and-build step." },
  {
    label: "03",
    title: "Ship it",
    description: "Placeholder copy for deployment — domain and hosting are a detail here, not the headline, for website projects.",
  },
  { label: "04", title: "Launch & support", description: "Placeholder copy for the launch-and-support step." },
];
