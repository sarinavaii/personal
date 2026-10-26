import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProjectsTemplate from "@templates/ProjectsTemplate/ProjectsTemplate";
import { pageMetadata } from "@lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "pages" });

    return pageMetadata({ locale, path: "/projects", title: t("projects") });
}

export default async function ProjectsPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <ProjectsTemplate />;
}
