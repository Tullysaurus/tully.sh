export interface NavLink {
  label: string;
  href: string;
}

/**
 * Header nav — real routes now, not in-page anchors. "About" points at the
 * homepage's about section regardless of which page you're on.
 */
export const navLinks: NavLink[] = [
  { label: "Hire me", href: "/hire" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/#about" },
];
