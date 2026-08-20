export interface Stat {
  value: string;
  label: string;
}

export const aboutSection = {
  eyebrow: "about",
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
