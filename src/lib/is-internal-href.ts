export function isInternalHref(href?: string): boolean {
  return !!href && href.startsWith("/");
}
