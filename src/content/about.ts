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
  paragraphs: [
    "I'm Tully; a self-taught developer with more than seven years of programming experience, starting around age eight and never really stopping. Since then I've worked across a wide range of languages, frameworks, and cloud providers, and I keep almost everything I build free and open source.",
    "I build software that's simple to use, fast, and solves a real problem instead of overcomplicating things; usually starting from something I needed myself before it turns into something worth sharing. Long-term, I'm focused on shipping open tools that help people learn and build with fewer limits, and getting a little better as an engineer with every project.",
  ],
  stats: [
    { value: "7+", label: "Years of experience" },
    { value: "20+", label: "Projects shipped" },
    { value: "Full-stack", label: "Engineering" },
  ] as Stat[],
};
