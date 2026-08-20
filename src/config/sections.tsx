import type { ComponentType } from "react";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export interface SectionEntry {
  id: string;
  label: string;
  /** Whether this section gets a link in the header nav. */
  nav: boolean;
  Component: ComponentType;
}

/**
 * Single source of truth for the page's scrollable sections (below the
 * hero). Reorder, remove, or add entries here — the page body and the
 * header nav both derive from this list.
 */
export const sections: SectionEntry[] = [
  { id: "services", label: "Services", nav: true, Component: Services },
  { id: "process", label: "Process", nav: false, Component: Process },
  { id: "work", label: "Work", nav: true, Component: CaseStudy },
  { id: "about", label: "About", nav: true, Component: About },
  { id: "contact", label: "Contact", nav: true, Component: Contact },
];

export const navLinks = sections.filter((section) => section.nav).map(({ id, label }) => ({ id, label }));
