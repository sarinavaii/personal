import type { Metadata } from "next";
import HomeTemplate from "@templates/HomeTemplate";
import { setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    return pageMetadata({ locale });
}

export default async function HomePage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <HomeTemplate />;
}
