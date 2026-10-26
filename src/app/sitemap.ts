import type { MetadataRoute } from "next";
import { getPosts } from "@lib/posts";
import { absoluteUrl } from "@lib/site";

type SitemapEntry = MetadataRoute.Sitemap[number];
type ChangeFrequency = NonNullable<SitemapEntry["changeFrequency"]>;

type StaticEntry = {
    path: string;
    changeFrequency: ChangeFrequency;
    priority: number;
};

const STATIC_ENTRIES: StaticEntry[] = [
    { path: "", changeFrequency: "daily", priority: 1 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
    { path: "/projects", changeFrequency: "monthly", priority: 0.7 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
    // Static pages have no content date, so the build time is the best signal
    // we have (the deploy that produced the HTML).
    const buildTime = new Date();

    return [
        ...STATIC_ENTRIES.map(
            ({ path, changeFrequency, priority }): SitemapEntry => ({
                url: absoluteUrl(path),
                lastModified: buildTime,
                changeFrequency,
                priority,
            }),
        ),
        ...getPosts().map(
            (post): SitemapEntry => ({
                url: absoluteUrl(`/blog/${post.slug}`),
                lastModified: new Date(post.date),
                changeFrequency: "monthly",
                priority: 0.6,
            }),
        ),
    ];
}
