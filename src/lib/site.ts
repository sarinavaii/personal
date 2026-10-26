import { routing } from "@i18n/routing";

export const SITE_URL = "https://sarinavaii.ir";

/**
 * Builds the public path for a route in a given locale, honouring
 * `localePrefix: "as-needed"` (the default locale has no prefix).
 */
export function localePath(locale: string, path = "") {
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
    const normalized = path === "/" ? "" : path;
    return `${prefix}${normalized}` || "/";
}

export function absoluteUrl(path: string) {
    return new URL(path, SITE_URL).toString();
}

/** Hreflang map for every supported locale, for `alternates.languages`. */
export function languageAlternates(path = "") {
    return Object.fromEntries(
        routing.locales.map((locale) => [locale, absoluteUrl(localePath(locale, path))]),
    ) as Record<string, string>;
}
