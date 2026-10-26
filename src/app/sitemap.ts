import type { MetadataRoute } from "next";
import { getPosts } from "@lib/posts";
import { absoluteUrl } from "@lib/site";

const STATIC_PATHS = ["", "/blog", "/projects", "/contact"];

function entry(path: string, lastModified?: Date): MetadataRoute.Sitemap[number] {
    return {
        url: absoluteUrl(path),
        lastModified,
    };
}

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        ...STATIC_PATHS.map((path) => entry(path)),
        ...getPosts().map((post) => entry(`/blog/${post.slug}`, new Date(post.date))),
    ];
}
