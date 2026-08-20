import { paths } from "@/config/paths";

export interface ProcessStep {
  label: string;
  title: string;
  description: string;
}

export const processSection = {
  path: paths.home,
  command: "./run-project.sh --verbose",
  title: "How it works",
  description: "How a typical project goes, from first message to launch.",
};

export const processSteps: ProcessStep[] = [
  {
    label: "01",
    title: "Message me",
    description: "Tell me what you're trying to build and what's not working right now. No forms, just a conversation.",
  },
  {
    label: "02",
    title: "Design & build",
    description: "I design and build in the open, so you're seeing progress the whole way, not just at the end.",
  },
  {
    label: "03",
    title: "Ship it",
    description: "Deployed and live; domain and hosting handled if it's a website, infra set up if it's something bigger.",
  },
  {
    label: "04",
    title: "Launch & support",
    description: "Live doesn't mean done. I stick around for fixes, tweaks, and whatever comes up after launch.",
  },
];
