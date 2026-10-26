import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactTemplate from "@templates/ContactTemplate/ContactTemplate";
import { pageMetadata } from "@lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "pages" });

    return pageMetadata({ locale, path: "/contact", title: t("contact") });
}

export default async function ContactPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <ContactTemplate />;
}
