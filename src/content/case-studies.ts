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
      "Placeholder paragraph describing the problem Mercurie solved.",
      "Placeholder paragraph describing the approach and outcome.",
    ],
    linkLabel: "Visit live project",
    href: "https://mercurieconsulting.com",
    specs: [
      { label: "Scope", detail: "Placeholder scope detail." },
      { label: "Stack", detail: "Placeholder stack detail." },
      { label: "Timeline", detail: "Placeholder timeline detail." },
      { label: "Role", detail: "Placeholder role detail." },
    ],
  },
];
