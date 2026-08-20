import { paths } from "@/config/paths";

export const contact = {
  path: paths.home,
  command: "./contact.sh --new",
  title: "Let's build something",
  description: "Have a project in mind, or just want to talk shop? Reach out.",
  primaryCta: { label: "Email me", href: "mailto:tully@tully.sh" },
  secondaryCta: {
    label: "Discord",
    href: "https://discord.com/users/694274948071555154",
  },
};
