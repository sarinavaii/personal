import type { Metadata } from "next";
import { t } from "@lib/i18n";
import BlogTemplate from "@templates/BlogTemplate/BlogTemplate";
import { pageMetadata } from "@lib/seo";

export function generateMetadata(): Metadata {
    const translate = t("home.blogs");
    const metadata = t("metadata.pages");

    return pageMetadata({ path: "/blog", title: translate("page-title"), description: metadata("blog") });
}

export default function BlogPage() {
    return <BlogTemplate />;
}
