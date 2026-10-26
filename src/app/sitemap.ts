import type { MetadataRoute } from "next";
import { routing } from "@i18n/routing";
import { getPosts } from "@lib/posts";
import { absoluteUrl, localePath } from "@lib/site";

const STATIC_PATHS = ["", "/blog", "/projects", "/contact"];

function entriesFor(path: string, lastModified?: Date): MetadataRoute.Sitemap {
    const languages = Object.fromEntries(
        routing.locales.map((locale) => [locale, absoluteUrl(localePath(locale, path))]),
    );

    return routing.locales.map((locale) => ({
        url: absoluteUrl(localePath(locale, path)),
        lastModified,
        alternates: { languages },
    }));
}

export default function sitemap(): MetadataRoute.Sitemap {
    const staticEntries = STATIC_PATHS.flatMap((path) => entriesFor(path));
    const postEntries = getPosts().flatMap((post) =>
        entriesFor(`/blog/${post.slug}`, new Date(post.date)),
    );

    return [...staticEntries, ...postEntries];
}
