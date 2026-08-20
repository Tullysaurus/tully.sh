import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { contact } from "@/content/contact";

export function Contact() {
  return (
    <Section id="contact" border={false}>
      <div className="max-w-[640px]">
        <Eyebrow path={contact.path} command={contact.command} />
        <h2 className="mt-3 font-display text-[clamp(26px,4vw,40px)] font-semibold tracking-[-0.01em] text-text">
          {contact.title}
        </h2>
        <p className="mt-4 text-text-muted">{contact.description}</p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button href={contact.primaryCta.href} variant="primary">
            {contact.primaryCta.label}
          </Button>
          <Button
            href={contact.secondaryCta.href}
            variant="ghost"
            icon={contact.secondaryCta.icon}
            target="_blank"
            rel="noreferrer"
          >
            {contact.secondaryCta.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
