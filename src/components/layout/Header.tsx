"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/config/nav";
import { site } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-panel-line bg-ink/[0.88] backdrop-blur-md">
      <Container className="flex items-center justify-between py-4">
        <a href="#top" className="font-mono text-lg">
          <span className="text-text">{site.logo.name}</span>
          <span className="text-brass">{site.logo.tld}</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 min-[760px]:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-sm text-text-muted transition-colors duration-150 ease-out hover:text-brass"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden min-[760px]:block">
          <Button href={site.headerCta.href} variant="outline" className="px-5 py-2 text-xs">
            {site.headerCta.label}
          </Button>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex items-center justify-center rounded-[3px] p-2 text-text-muted transition-colors duration-150 ease-out hover:text-brass min-[760px]:hidden"
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-panel-line px-[28px] py-6 min-[760px]:hidden">
          <nav aria-label="Mobile" className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-mono text-sm text-text-muted transition-colors duration-150 ease-out hover:text-brass"
              >
                {link.label}
              </a>
            ))}
            <Button href={site.headerCta.href} variant="primary" className="self-start" onClick={() => setOpen(false)}>
              {site.headerCta.label}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
