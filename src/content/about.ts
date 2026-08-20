export interface Stat {
  value: string;
  label: string;
}

export const aboutSection = {
  eyebrow: "about",
  title: "About",
  description: "Placeholder description introducing the about section.",
};

export const about = {
  monogram: "T",
  paragraphs: [
    "Placeholder bio paragraph one — background and focus.",
    "Placeholder bio paragraph two — how you work.",
    "Placeholder bio paragraph three — what you're looking for.",
  ],
  stats: [
    { value: "10+", label: "Years of experience" },
    { value: "40+", label: "Projects shipped" },
    { value: "99%", label: "Client satisfaction" },
  ] as Stat[],
};
