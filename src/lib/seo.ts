import type { Metadata } from "next";
import { t } from "@lib/i18n";
import { absoluteUrl } from "@lib/site";

type PageMetadataInput = {
    /** Route path, e.g. "/blog". Empty for home. */
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
export function pageMetadata({
    path = "",
    title,
    description,
    type = "website",
    publishedTime,
    tags,
}: PageMetadataInput): Metadata {
    const translate = t();

    const siteName = translate("common.site-name");
    const siteTitle = `${siteName} | ${translate("metadata.profession")}`;
    const url = absoluteUrl(path);
    const resolvedTitle = title ? `${title} | ${siteName}` : siteTitle;
    const resolvedDescription = description ?? translate("metadata.description");
    const images = [{ url: "/images/profile.jpg", width: 1024, height: 1024, alt: siteName }];

    return {
        // `title: undefined` still counts as "set" and would wipe the layout's
        // default title, so it is only added when the page actually overrides it.
        ...(title ? { title } : {}),
        description: resolvedDescription,
        alternates: {
            canonical: url,
        },
        openGraph: {
            type,
            url,
            title: resolvedTitle,
            description: resolvedDescription,
            siteName: `${siteName} ${translate("metadata.personal-website")}`,
            locale: "en_US",
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
