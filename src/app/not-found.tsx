import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { paths } from "@/config/paths";

export const metadata: Metadata = {
  title: "Page not found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <Section paddingTop="160px" paddingBottom="160px" border={false}>
      <Eyebrow path={paths.home} command="cat 404.md" />
      <h1 className="mt-6 max-w-[820px] font-display text-[clamp(34px,5vw,58px)] font-semibold leading-[1.08] tracking-[-0.01em] text-text">
        404: page not found.
      </h1>
      <p className="mt-6 max-w-[560px] text-lg text-text-muted">
        Whatever you were looking for isn&apos;t here. It might&apos;ve moved, or never existed.
      </p>
      <div className="mt-10">
        <Button href="/" variant="primary">
          Back to the homepage
        </Button>
      </div>
    </Section>
  );
}
