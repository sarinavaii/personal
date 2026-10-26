import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import BlogTemplate from "@templates/BlogTemplate/BlogTemplate";
import { pageMetadata } from "@lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "home.blogs" });

    return pageMetadata({ locale, path: "/blog", title: t("title") });
}

export default async function BlogPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <BlogTemplate />;
}
