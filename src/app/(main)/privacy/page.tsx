import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { privacyPage } from "@/content/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How tully.sh handles data. In short, it doesn't collect any.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy — Tully",
    description: "How tully.sh handles data. In short, it doesn't collect any.",
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <Section paddingTop="160px" paddingBottom="120px" border={false}>
      <Eyebrow path={privacyPage.path} command={privacyPage.command} />
      <h1 className="mt-6 font-display text-[clamp(32px,4vw,48px)] font-semibold tracking-[-0.01em] text-text">
        {privacyPage.title}
      </h1>
      <p className="mt-3 font-mono text-xs text-text-muted">{privacyPage.updated}</p>
      <p className="mt-8 max-w-[640px] text-text-muted">{privacyPage.intro}</p>

      <div className="mt-12 flex max-w-[640px] flex-col gap-10">
        {privacyPage.sections.map((section) => (
          <div key={section.title}>
            <h2 className="font-display text-xl font-semibold tracking-[-0.01em] text-text">{section.title}</h2>
            {section.body.map((paragraph, index) => (
              <p key={index} className="mt-3 text-text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>
    </Section>
  );
}
