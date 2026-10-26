import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { absoluteUrl, languageAlternates, localePath } from "@lib/site";

type PageMetadataInput = {
    locale: string;
    /** Route path without the locale prefix, e.g. "/blog". Empty for home. */
    path?: string;
    /** Page title without the site suffix. Omit to inherit the layout default. */
    title?: string;
    description?: string;
    type?: "website" | "article";
    publishedTime?: string;
    tags?: string[];
};

/**
 * Builds a complete metadata object for a page.
 *
 * `openGraph` / `twitter` are replaced wholesale by Next when a child route
 * defines them, so every page that wants a correct `og:url` has to provide the
 * full object instead of just the url.
 */
export async function pageMetadata({
    locale,
    path = "",
    title,
    description,
    type = "website",
    publishedTime,
    tags,
}: PageMetadataInput): Promise<Metadata> {
    const t = await getTranslations({ locale });

    const siteName = t("common.site-name");
    const siteTitle = `${siteName} | ${t("metadata.profession")}`;
    const url = absoluteUrl(localePath(locale, path));
    const resolvedTitle = title ? `${title} | ${siteName}` : siteTitle;
    const resolvedDescription = description ?? t("metadata.description");
    const images = [{ url: "/images/profile.jpg", width: 1024, height: 1024, alt: siteName }];

    return {
        // `title: undefined` still counts as "set" and would wipe the layout's
        // default title, so it is only added when the page actually overrides it.
        ...(title ? { title } : {}),
        description: resolvedDescription,
        alternates: {
            canonical: url,
            languages: languageAlternates(path),
        },
        openGraph: {
            type,
            url,
            title: resolvedTitle,
            description: resolvedDescription,
            siteName: `${siteName} ${t("metadata.personal-website")}`,
            locale: locale === "fa" ? "fa_IR" : "en_US",
            alternateLocale: locale === "fa" ? "en_US" : "fa_IR",
            images,
            ...(publishedTime ? { publishedTime } : {}),
            ...(tags ? { tags } : {}),
        },
        twitter: {
            card: "summary_large_image",
            title: resolvedTitle,
            description: resolvedDescription,
            images: ["/images/profile.jpg"],
        },
    };
}
