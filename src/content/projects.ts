export interface Project {
  name: string;
  description: string;
  tags: string[];
  linkLabel: string;
  href: string;
}

// The lighter grid rendered below the flagship case study in the Work
// section — everything else worth showing, at a glance.
export const projects: Project[] = [
  {
    name: "Wasans",
    description: "An open-source site for sharing and comparing competetive speedrunning times and routes for the game Parkour Reborn",
    tags: ["TypeScript", "Open source"],
    linkLabel: "View live site",
    href: "https://wasans.tully.sh",
  },
  {
    name: "Parkour Reborn",
    description: "An all-in-one platform for players to get any information they need about Parkour Reborn",
    tags: ["Next.js", "Tool"],
    linkLabel: "View live site",
    href: "https://parkourreborn.com",
  },
  {
    name: "Roomba",
    description: "The code for my team's robot for the 25-26 FRC Robotics Year",
    tags: ["Robot", "Automation"],
    linkLabel: "View on GitHub",
    href: "https://github.com/robohornets/roomba",
  },
];
