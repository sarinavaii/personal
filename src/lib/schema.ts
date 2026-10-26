import { createElement } from "react";
import type { Post } from "@velite";
import { t } from "@lib/i18n";
import { SITE_URL, absoluteUrl } from "@lib/site";

/**
 * Schema.org JSON-LD builders.
 *
 * Everything here is dependency-free and typed: the builders return plain
 * objects that can be serialized with `JSON.stringify` and rendered through the
 * `JsonLd` component below.
 */

/** Stable node identifiers so nodes can reference each other by `@id`. */
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Shape accepted by `blogPostingSchema` — the subset of Velite's `Post` we need. */
export type BlogPostingInput = Pick<Post, "slug" | "title" | "description" | "date" | "tags">;

export type PersonNode = {
    "@type": "Person";
    "@id": string;
    name: string;
    jobTitle: string;
    description: string;
    url: string;
    image: string;
    sameAs: string[];
    knowsAbout: string[];
    worksFor: {
        "@type": "Organization";
        name: string;
        url: string;
    };
    address: {
        "@type": "PostalAddress";
        addressLocality: string;
        addressCountry: string;
    };
};

export type ProfilePageNode = {
    "@type": "ProfilePage";
    "@id": string;
    url: string;
    name: string;
    description: string;
    inLanguage: "en";
    mainEntity: { "@id": string };
    dateModified: string;
};

export type WebSiteNode = {
    "@type": "WebSite";
    "@id": string;
    name: string;
    url: string;
    description: string;
    inLanguage: "en";
    publisher: { "@id": string };
};

export type BlogPostingNode = {
    "@type": "BlogPosting";
    "@id": string;
    url: string;
    headline: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified: string;
    author: { "@id": string };
    publisher: { "@id": string };
    mainEntityOfPage: { "@type": "WebPage"; "@id": string };
    keywords: string[];
    inLanguage: "en";
};

export type BreadcrumbNode = {
    "@type": "BreadcrumbList";
    "@id": string;
    itemListElement: Array<{
        "@type": "ListItem";
        position: number;
        name: string;
        item: string;
    }>;
};

export type JsonLdNode = PersonNode | WebSiteNode | BlogPostingNode | BreadcrumbNode | ProfilePageNode;

export type JsonLdGraph = {
    "@context": "https://schema.org";
    "@graph": JsonLdNode[];
};

type ContactItem = { id: string; href: string };

/** Only real `http(s)` profile links — `mailto:` / `tel:` entries are skipped. */
function socialProfiles(): string[] {
    const items = t().raw<ContactItem[]>("contact.items");

    return items.map((item) => item.href).filter((href) => /^https?:\/\//i.test(href));
}

function keywords(): string[] {
    return t()("metadata.keywords")
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean);
}

export function personSchema(): PersonNode {
    const translate = t();

    return {
        "@type": "Person",
        "@id": PERSON_ID,
        name: translate("common.site-name"),
        jobTitle: translate("metadata.profession"),
        description: translate("metadata.description"),
        url: SITE_URL,
        image: absoluteUrl("/images/profile.jpg"),
        sameAs: socialProfiles(),
        knowsAbout: keywords(),
        worksFor: {
            "@type": "Organization",
            name: "Cyberno",
            url: "https://cyberno.ir",
        },
        address: {
            "@type": "PostalAddress",
            addressLocality: "Sari",
            addressCountry: "IR",
        },
    };
}

export function profilePageSchema(): ProfilePageNode {
    const translate = t();

    return {
        "@type": "ProfilePage",
        "@id": `${absoluteUrl("/about")}#profile`,
        url: absoluteUrl("/about"),
        name: `About ${translate("common.site-name")}`,
        description: translate("about.meta-description"),
        inLanguage: "en",
        mainEntity: { "@id": PERSON_ID },
        dateModified: new Date().toISOString(),
    };
}

export function websiteSchema(): WebSiteNode {
    const translate = t();

    return {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: translate("common.site-name"),
        url: SITE_URL,
        description: translate("metadata.description"),
        inLanguage: "en",
        publisher: { "@id": PERSON_ID },
    };
}

export function blogPostingSchema(post: BlogPostingInput): BlogPostingNode {
    const url = absoluteUrl(`/blog/${post.slug}`);
    const published = new Date(post.date).toISOString();

    return {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        url,
        headline: post.title,
        description: post.description,
        // Velite has no "updated" field, so publish and modify dates match.
        datePublished: published,
        dateModified: published,
        // Deterministic, always-existing asset: the generated per-post OG image
        // route URL is hashed by the build, so it cannot be referenced here.
        image: absoluteUrl("/images/profile.jpg"),
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        keywords: post.tags,
        inLanguage: "en",
    };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>): BreadcrumbNode {
    return {
        "@type": "BreadcrumbList",
        "@id": `${absoluteUrl(items[items.length - 1]?.path ?? "/")}#breadcrumb`,
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: absoluteUrl(item.path),
        })),
    };
}

/** Wraps one or more nodes into a single `@graph` document. */
export function graphSchema(nodes: JsonLdNode[]): JsonLdGraph {
    return {
        "@context": "https://schema.org",
        "@graph": nodes,
    };
}

/**
 * Renders a JSON-LD payload. Kept JSX-free so this module stays a plain `.ts`
 * file; the output is the equivalent of:
 *
 * ```tsx
 * <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
 * ```
 */
export function JsonLd({ data }: { data: JsonLdGraph | JsonLdNode }) {
    return createElement("script", {
        type: "application/ld+json",
        dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
    });
}
