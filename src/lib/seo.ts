import type { Metadata } from "next";
import { t } from "@lib/i18n";
import { SITE_URL, absoluteUrl } from "@lib/site";

type PageMetadataInput = {
    /** Route path, e.g. "/blog". Empty for home. */
    path?: string;
    /** Page title without the site suffix. Omit to inherit the layout default. */
    title?: string;
    description?: string;
    type?: "website" | "article";
    publishedTime?: string;
    /** Last modification time (ISO). Defaults to `publishedTime` for articles. */
    modifiedTime?: string;
    tags?: string[];
    /** Overrides the site-wide keywords from the message catalog. */
    keywords?: string[];
    /** Emit `robots: noindex, nofollow` for pages that must stay out of search. */
    noIndex?: boolean;
};

type OpenGraph = NonNullable<Metadata["openGraph"]>;

/**
 * Builds a complete metadata object for a page.
 *
 * `openGraph` / `twitter` are replaced wholesale by Next when a child route
 * defines them, so every page that wants a correct `og:url` has to provide the
 * full object instead of just the url.
 *
 * Images are intentionally omitted: the route-level `opengraph-image.tsx` file
 * convention supplies the 1200x630 card (and Next copies it to `twitter:image`).
 */
export function pageMetadata({
    path = "",
    title,
    description,
    type = "website",
    publishedTime,
    modifiedTime,
    tags,
    keywords,
    noIndex = false,
}: PageMetadataInput): Metadata {
    const translate = t();

    const siteName = translate("common.site-name");
    const siteTitle = `${siteName} | ${translate("metadata.profession")}`;
    const url = absoluteUrl(path);
    const resolvedTitle = title ? `${title} | ${siteName}` : siteTitle;
    const resolvedDescription = description ?? translate("metadata.description");
    const resolvedKeywords =
        keywords ??
        translate("metadata.keywords")
            .split(",")
            .map((keyword) => keyword.trim())
            .filter(Boolean);

    const openGraph: OpenGraph =
        type === "article"
            ? {
                  type: "article",
                  url,
                  title: resolvedTitle,
                  description: resolvedDescription,
                  siteName: `${siteName} ${translate("metadata.personal-website")}`,
                  locale: "en_US",
                  ...(publishedTime ? { publishedTime } : {}),
                  ...((modifiedTime ?? publishedTime) ? { modifiedTime: modifiedTime ?? publishedTime } : {}),
                  authors: [siteName],
                  ...(tags?.length ? { tags, section: tags[0] } : {}),
              }
            : {
                  type: "website",
                  url,
                  title: resolvedTitle,
                  description: resolvedDescription,
                  siteName: `${siteName} ${translate("metadata.personal-website")}`,
                  locale: "en_US",
              };

    return {
        // `title: undefined` still counts as "set" and would wipe the layout's
        // default title, so it is only added when the page actually overrides it.
        ...(title ? { title } : {}),
        description: resolvedDescription,
        alternates: {
            canonical: url,
            types: {
                "application/rss+xml": absoluteUrl("/feed.xml"),
            },
        },
        authors: [{ name: siteName, url: SITE_URL }],
        keywords: resolvedKeywords,
        ...(noIndex ? { robots: { index: false, follow: false } } : {}),
        openGraph,
        twitter: {
            card: "summary_large_image",
            title: resolvedTitle,
            description: resolvedDescription,
        },
    };
}
