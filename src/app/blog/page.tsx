import type { Metadata } from "next";
import { t } from "@lib/i18n";
import BlogTemplate from "@templates/BlogTemplate/BlogTemplate";
import { pageMetadata } from "@lib/seo";

export function generateMetadata(): Metadata {
    const translate = t("home.blogs");

    return pageMetadata({ path: "/blog", title: translate("title") });
}

export default function BlogPage() {
    return <BlogTemplate />;
}
