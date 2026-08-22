import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { crosPage } from "@/content/cros";

export const metadata: Metadata = {
  title: "ChromeOS Firmware Manual",
  description: "Step-by-step instructions for unlocking dev mode and reflashing firmware on a Chromebook.",
  alternates: {
    canonical: "/cros",
  },
  openGraph: {
    title: "ChromeOS Firmware Manual — Tully",
    description: "Step-by-step instructions for unlocking dev mode and reflashing firmware on a Chromebook.",
    url: "/cros",
  },
};

export default function CrosPage() {
  return (
    <Section paddingTop="160px" paddingBottom="120px" border={false}>
      <Eyebrow path={crosPage.path} command={crosPage.command} />
      <h1 className="mt-6 font-display text-[clamp(32px,4vw,48px)] font-semibold tracking-[-0.01em] text-text">
        {crosPage.title}
      </h1>
      <p className="mt-3 font-mono text-xs text-text-muted">{crosPage.updated}</p>
      <p className="mt-8 max-w-[640px] text-text-muted">{crosPage.intro}</p>

      <div className="mt-6 max-w-[640px] rounded-md border border-brass-dim bg-panel px-5 py-4">
        <p className="font-mono text-xs text-brass">{crosPage.warning}</p>
      </div>

      <div className="mt-12 flex max-w-[640px] flex-col gap-10">
        {crosPage.groups.map((group) => (
          <div key={group.label}>
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold tracking-[-0.01em] text-text">
              {group.label}
              {group.optional ? (
                <span className="rounded-full border border-panel-line px-3 py-1 font-mono text-[10px] font-normal uppercase tracking-wide text-text-muted">
                  Optional
                </span>
              ) : null}
            </h2>
            {group.credit ? (
              <p className="mt-1 font-mono text-xs text-text-muted">
                Credit:{" "}
                <a href={group.credit.href} target="_blank" className="text-brass underline underline-offset-4 hover:text-brass-dim">
                  {group.credit.label}
                </a>
              </p>
            ) : null}
            <ol className="mt-4 flex flex-col gap-4">
              {group.steps.map((step) => (
                <li key={step.number} className="flex gap-4 border-l-2 border-brass-dim pl-4">
                  <span className="shrink-0 font-mono text-sm text-brass">
                    {String(step.number).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="text-text">{step.title}</p>
                    {step.detail ? <p className="mt-1 text-sm text-text-muted">{step.detail}</p> : null}
                    {step.download ? (
                      <a
                        href={step.download.href}
                        className="mt-2 inline-flex items-center gap-1.5 font-mono text-xs text-brass underline underline-offset-4 hover:text-brass-dim"
                      >
                        ↓ Download {step.download.label}
                      </a>
                    ) : null}
                    {step.code ? (
                      <pre className="mt-2 overflow-x-auto rounded-md border border-panel-line bg-ink px-4 py-3 font-mono text-xs text-green">
                        <code>{step.code}</code>
                      </pre>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </Section>
  );
}
