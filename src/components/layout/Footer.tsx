import { Container } from "@/components/ui/Container";
import { footer } from "@/content/footer";

export function Footer() {
  return (
    <footer className="py-8">
      <Container>
        <p className="font-mono text-xs text-text-muted">{footer.signOff}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-text-muted">
          <p>{footer.copyright}</p>
          <p>{footer.siteName}</p>
        </div>
      </Container>
    </footer>
  );
}
