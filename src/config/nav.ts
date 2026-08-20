export interface NavLink {
  label: string;
  href: string;
}

/**
 * Header nav — anchors into the homepage's sections. Prefixed with "/" so
 * they still resolve correctly from other routes (e.g. /privacy), not just
 * from the homepage itself.
 */
export const navLinks: NavLink[] = [
  { label: "Services", href: "/#capabilities" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];
