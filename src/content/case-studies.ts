import { paths } from "@/config/paths";

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

export const caseStudySection = {
  path: paths.hire,
  command: "ssh deploy@mercurieconsulting.com",
  title: "Selected work",
  description: "Placeholder description introducing recent project work.",
};

// Rendered as a repeatable "browser window" card — add another entry here
// once there's a second project worth featuring.
export const caseStudies: CaseStudy[] = [
  {
    url: "mercurie.co",
    role: "Lead engineer",
    name: "Mercurie",
    paragraphs: [
      "Placeholder paragraph describing the problem Mercurie solved.",
      "Placeholder paragraph describing the approach and outcome.",
    ],
    linkLabel: "Visit live project",
    href: "https://mercurie.co",
    specs: [
      { label: "Scope", detail: "Placeholder scope detail." },
      { label: "Stack", detail: "Placeholder stack detail." },
      { label: "Timeline", detail: "Placeholder timeline detail." },
      { label: "Role", detail: "Placeholder role detail." },
    ],
  },
];
