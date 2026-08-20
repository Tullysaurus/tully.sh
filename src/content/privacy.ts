import { paths } from "@/config/paths";

export interface PrivacySection {
  title: string;
  body: string[];
}

export const privacyPage = {
  path: paths.home,
  command: "cat privacy.md",
  title: "Privacy Policy",
  updated: "Last updated: August 2026",
  intro:
    "This site is a personal portfolio for Tully. It does not collect, store, or sell personal information. This page explains what little data passes through the site and how it is handled.",
  sections: [
    {
      title: "Information this site collects",
      body: [
        "This site does not use contact forms, cookies, or analytics tracking. Browsing tully.sh does not create an account, a profile, or any record tied to you.",
      ],
    },
    {
      title: "Hosting and server logs",
      body: [
        "This site is hosted on Cloudflare. Like most web hosts, Cloudflare's infrastructure may briefly process standard technical information, such as IP address, browser type, and request timestamps, for security and performance purposes. This information is not accessed or used by Tully personally, and is handled under Cloudflare's own privacy policy.",
      ],
    },
    {
      title: "Third-party links",
      body: [
        "This site links to external services, including email, Discord, and GitHub. Visiting or using those services is subject to their own privacy policies, not this one.",
      ],
    },
    {
      title: "Changes to this policy",
      body: [
        "This policy may be updated if the site's functionality changes, for example if a contact form or analytics tool is added later. Any changes will be reflected on this page.",
      ],
    },
    {
      title: "Contact",
      body: ["Questions about this policy can be sent to tully@tully.sh."],
    },
  ] as PrivacySection[],
};
