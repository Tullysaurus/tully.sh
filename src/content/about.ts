import { paths } from "@/config/paths";

export interface Stat {
  value: string;
  label: string;
}

export const aboutSection = {
  path: paths.home,
  command: "cat about.md",
  title: "About",
};

export const about = {
  paragraph:
    "Placeholder bio — a couple of sentences: self-taught, years of experience, what you care about.",
  stats: [
    { value: "7+", label: "Years of experience" },
    { value: "40+", label: "Projects shipped" },
    { value: "Full-stack", label: "Engineering" },
  ] as Stat[],
};
