import type { Metadata } from "next";
import { t } from "@lib/i18n";
import ContactTemplate from "@templates/ContactTemplate/ContactTemplate";
import { pageMetadata } from "@lib/seo";

export function generateMetadata(): Metadata {
    const translate = t("pages");

    return pageMetadata({ path: "/contact", title: translate("contact") });
}

export default function ContactPage() {
    return <ContactTemplate />;
}
