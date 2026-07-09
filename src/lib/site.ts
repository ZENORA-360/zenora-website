/** Site-wide constants — single source of truth for URLs and public assets. */
export const SITE_URL = "https://zenora360.com";
export const SITE_NAME = "ZENORA";
export const SITE_TAGLINE_FR = "De Zéro au Zénith";
export const SITE_TAGLINE_EN = "From Zero to Zenith";

export const projectImages = {
  ketc: "/images/projects/ketc.png",
  esopa: "/images/projects/esopa.png",
  erp: "/images/projects/erp-architecture.png",
  kaza: "/images/projects/kaza.webp",
  portfolio: "/images/projects/portfolio.png",
} as const;

export const partnerImages = {
  nexus: "/images/partners/nexus.png",
  cafca: "/images/partners/cafca.png",
  eyg: "/images/partners/eyg.png",
  kcServices: "/images/partners/kc-services.png",
  worketyamo: "/images/partners/worketyamo.png",
} as const;

export const publicImages = {
  og: "/og-image.svg",
  favicon: "/favicon.svg",
} as const;

/** Build an absolute URL from a site path or pass through external URLs. */
export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Canonical path for the current page (no query/hash). */
export function canonicalPath(pathname: string): string {
  const clean = pathname.replace(/\/$/, "") || "/";
  return absoluteUrl(clean);
}
