import { paths } from "@/config/paths";

export const contact = {
  path: paths.home,
  command: "./contact.sh --new",
  title: "Let's build something",
  description: "Placeholder supporting text inviting the reader to get in touch.",
  primaryCta: { label: "Email me", href: "mailto:tully@tully.sh" },
  secondaryCta: {
    label: "Discord",
    href: "https://discord.com/users/694274948071555154",
    icon: "/icons/discord.png",
  },
};
