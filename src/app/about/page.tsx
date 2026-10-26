import type { Metadata } from "next";

import AboutTemplate from "@templates/AboutTemplate/AboutTemplate";
import { pageMetadata } from "@lib/seo";
import { JsonLd, breadcrumbSchema, profilePageSchema } from "@lib/schema";
import { t } from "@lib/i18n";

export function generateMetadata(): Metadata {
    const translate = t("about");
    const pages = t("pages");

    return pageMetadata({
        path: "/about",
        title: pages("about"),
        description: translate("meta-description"),
        keywords: translate.raw<string[]>("meta-keywords"),
    });
}

export default function AboutPage() {
    const pages = t("pages");

    return (
        <>
            <JsonLd data={profilePageSchema()} />
            <JsonLd
                data={breadcrumbSchema([
                    { name: pages("home"), path: "/" },
                    { name: pages("about"), path: "/about" },
                ])}
            />
            <AboutTemplate />
        </>
    );
}
