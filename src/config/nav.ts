export interface NavLink {
  label: string;
  href: string;
}

/** Header nav — in-page anchors, all on the single homepage. */
export const navLinks: NavLink[] = [
  { label: "Services", href: "#capabilities" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
