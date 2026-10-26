const FALLBACK_SITE_URL = "https://sarinavaii.ir";

/**
 * Canonical origin used by metadata, structured data, the sitemap, and the RSS
 * feed. Override with NEXT_PUBLIC_SITE_URL on preview deployments so canonical
 * URLs do not point at production.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || FALLBACK_SITE_URL).replace(/\/+$/, "");

export function absoluteUrl(path: string) {
    return new URL(path, SITE_URL).toString();
}
