import type { Metadata } from "next";
import { t } from "@lib/i18n";
import ProjectsTemplate from "@templates/ProjectsTemplate/ProjectsTemplate";
import { pageMetadata } from "@lib/seo";

export function generateMetadata(): Metadata {
    const translate = t("pages");
    const metadata = t("metadata.pages");

    return pageMetadata({ path: "/projects", title: translate("projects"), description: metadata("projects") });
}

export default function ProjectsPage() {
    return <ProjectsTemplate />;
}
