import type { Metadata } from "next";
import { t } from "@lib/i18n";
import ProjectsTemplate from "@templates/ProjectsTemplate/ProjectsTemplate";
import { pageMetadata } from "@lib/seo";

export function generateMetadata(): Metadata {
    const translate = t("pages");

    return pageMetadata({ path: "/projects", title: translate("projects") });
}

export default function ProjectsPage() {
    return <ProjectsTemplate />;
}
