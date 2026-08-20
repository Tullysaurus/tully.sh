export interface RouterCard {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}

export const routerSection = {
  eyebrow: "start here",
  title: "Pick a path",
  description: "Placeholder one-line description introducing the two ways to look around.",
};

export const routerCards: RouterCard[] = [
  {
    title: "Hire me",
    description: "Placeholder — one or two lines on what working together looks like.",
    href: "/hire",
    linkLabel: "See how it works",
  },
  {
    title: "Projects",
    description: "Placeholder — one or two lines on personal and open-source work.",
    href: "/projects",
    linkLabel: "Browse the work",
  },
];
