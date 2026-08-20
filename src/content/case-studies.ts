export interface CaseStudySpec {
  label: string;
  detail: string;
}

export interface CaseStudy {
  url: string;
  role: string;
  name: string;
  paragraphs: string[];
  linkLabel: string;
  href: string;
  specs: CaseStudySpec[];
}

// The flagship entry in the Work section — rendered as a "browser window"
// card above the lighter project grid. Add another entry once there's a
// second project worth featuring at this scale.
export const caseStudies: CaseStudy[] = [
  {
    url: "mercurieconsulting.com",
    role: "Lead engineer",
    name: "Mercurie",
    paragraphs: [
      "Mercurie is a regulatory consulting firm for radioactive medical products; a pretty specialized field, and the site needed to feel credible to pharmaceutical companies and healthcare institutions, not just look nice. That meant putting the founder's decade-plus at the U.S. Nuclear Regulatory Commission front and center, while keeping the whole thing approachable to visitors who aren't regulatory experts.",
      "I built it in Next.js with a clean, fast layout that puts the actual work first: services, credentials, and a portfolio of real regulatory filings and presentations. The result reads as specialized and trustworthy without burying anyone in jargon.",
    ],
    linkLabel: "Visit live project",
    href: "https://mercurieconsulting.com",
    specs: [
      { label: "Scope", detail: "Marketing site; design, build & content" },
      { label: "Stack", detail: "Next.js, TypeScript, Tailwind CSS" },
      { label: "Timeline", detail: "3 days, design to launch" },
      { label: "Role", detail: "End-to-end; design, development, deployment" },
    ],
  },
];
