import { paths } from "@/config/paths";

export interface Capability {
  index: string;
  title: string;
  description: string;
}

export const capabilitiesSection = {
  path: paths.home,
  command: "ls services/",
  title: "What I can build",
  description: "A quick rundown of what I actually work on, from full builds to the pieces most people never see.",
};

export const capabilities: Capability[] = [
  {
    index: "01",
    title: "Websites & web apps",
    description: "Design, domain, hosting, SEO, and branding all fold into this one.",
  },
  {
    index: "02",
    title: "Backend, APIs & integrations",
    description: "Server-side logic, APIs, and connecting the tools you already use so they actually talk to each other.",
  },
  {
    index: "03",
    title: "Automation & tooling",
    description: "Scripts and internal tools that take the repetitive stuff off your plate.",
  },
  {
    index: "04",
    title: "Infra, deployment & hosting",
    description: "Getting a project deployed, monitored, and actually staying up; the unglamorous part that matters most.",
  },
];
