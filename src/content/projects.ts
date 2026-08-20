export interface Project {
  name: string;
  description: string;
  tags: string[];
  linkLabel: string;
  href: string;
}

export const projectsSection = {
  eyebrow: "projects",
  title: "Things I've built",
  description: "Placeholder description introducing open-source and personal work.",
};

export const projects: Project[] = [
  {
    name: "Placeholder Project One",
    description: "Placeholder — what it is and what problem it solves.",
    tags: ["TypeScript", "Open source"],
    linkLabel: "View on GitHub",
    href: "https://github.com/tullysaurus",
  },
  {
    name: "Placeholder Project Two",
    description: "Placeholder — what it is and what problem it solves.",
    tags: ["Next.js", "Tool"],
    linkLabel: "View demo",
    href: "https://example.com",
  },
  {
    name: "Placeholder Project Three",
    description: "Placeholder — what it is and what problem it solves.",
    tags: ["CLI", "Automation"],
    linkLabel: "View on GitHub",
    href: "https://github.com/tullysaurus",
  },
];
