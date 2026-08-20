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
  { label: "01 / discover", title: "Discovery", description: "Placeholder copy for the discovery step." },
  { label: "02 / plan", title: "Planning", description: "Placeholder copy for the planning step." },
  { label: "03 / build", title: "Build", description: "Placeholder copy for the build step." },
  { label: "04 / ship", title: "Ship & support", description: "Placeholder copy for the ship step." },
];
