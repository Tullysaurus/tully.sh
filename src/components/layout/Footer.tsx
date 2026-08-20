import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { footer } from "@/content/footer";

export function Footer() {
  return (
    <footer className="py-8">
      <Container>
        <p className="font-mono text-xs text-text-muted">{footer.signOff}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-text-muted">
          <div className="flex flex-wrap items-center gap-4">
            <p>{footer.copyright}</p>
            <Link href={footer.privacyLink.href} className="transition-colors duration-150 ease-out hover:text-brass">
              {footer.privacyLink.label}
            </Link>
          </div>
          <p>{footer.siteName}</p>
        </div>
      </Container>
    </footer>
  );
}
