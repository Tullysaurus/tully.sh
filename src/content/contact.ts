export interface ContactLink {
  label: string;
  href: string;
  icon?: string;
}

export const contact = {
  eyebrow: "contact",
  title: "Let's build something",
  description: "Placeholder supporting text inviting the reader to get in touch.",
  primaryCta: { label: "Email me", href: "mailto:tully@tully.sh" },
  secondaryCta: { label: "GitHub", href: "https://github.com/tullysaurus" },
  links: [
    { label: "Discord", href: "https://discord.com/users/694274948071555154", icon: "/icons/discord.png" },
  ] as ContactLink[],
};
