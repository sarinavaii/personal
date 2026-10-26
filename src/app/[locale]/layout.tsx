import { routing } from "@i18n/routing";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { cn } from "@core/utils";
import { Viewport } from "next/types";
import type { Metadata } from "next";

import Providers from "@core/providers";
import Header from "@partials/Header";
import Footer from "@partials/Footer";

import "@mantine/core/styles.css";
import "@styles/globals.css";

import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PropsWithChildren } from "react";
import Blob from "@partials/Blob";
import DotBackground from "@partials/Background/DotBackground";
import { SITE_URL, absoluteUrl, languageAlternates } from "@lib/site";

type Props = PropsWithChildren<{ params: Promise<{ locale: string }> }>;

// Base metadata that will be used for all locales
export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: "#111313",
};

// Pre-render both locales instead of rendering every request on demand.
export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

// Generate metadata based on locale
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    // Get translations from the appropriate JSON file
    const t = await getTranslations({ locale });

    const siteName = t("common.site-name");
    const baseTitle = `${siteName} | ${t("metadata.profession")}`;
    const description = t("metadata.description");
    const homePath = locale === routing.defaultLocale ? "/" : `/${locale}`;

    return {
        metadataBase: new URL(SITE_URL),
        title: {
            default: baseTitle,
            template: `%s | ${siteName}`,
        },
        description,
        keywords: t("metadata.keywords").split(","),
        authors: [{ name: siteName, url: SITE_URL }],
        creator: siteName,
        publisher: siteName,
        alternates: {
            canonical: absoluteUrl(homePath),
            languages: languageAlternates(""),
        },
        openGraph: {
            type: "website",
            locale: locale === "fa" ? "fa_IR" : "en_US",
            alternateLocale: locale === "fa" ? "en_US" : "fa_IR",
            url: homePath,
            title: baseTitle,
            description,
            siteName: `${siteName} ${t("metadata.personal-website")}`,
            images: [
                {
                    url: "/images/profile.jpg",
                    width: 1024,
                    height: 1024,
                    alt: siteName,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: baseTitle,
            description,
            images: ["/images/profile.jpg"],
        },
        icons: {
            icon: [
                { url: "/icon.svg", type: "image/svg+xml" },
                { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
                { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            ],
            shortcut: "/favicon.ico",
            apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
        },
        manifest: "/site.webmanifest",
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-image-preview": "large",
                "max-snippet": -1,
                "max-video-preview": -1,
            },
        },
    };
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    // Opts every nested page into static rendering for this locale.
    setRequestLocale(locale);

    return (
        <html
            lang={locale}
            dir={locale === "en" ? "ltr" : "rtl"}
            {...mantineHtmlProps}
            data-mantine-color-scheme="dark"
        >
            <head>
                <ColorSchemeScript defaultColorScheme="dark" />
            </head>
            <body
                className={cn("bg-woodsmoke-100 text-woodsmoke-900 dark:bg-black dark:text-woodsmoke-100", {
                    "font-peyda": locale === "fa",
                    "font-space-grotesk leading-snug": locale === "en",
                })}
            >
                <Providers>
                    {/* <XMouseFollower /> */}
                    <DotBackground />
                    <Blob />
                    <div className="p-4 min-h-dvh flex flex-col relative z-1">
                        <Header />
                        <div className="grow">{children}</div>
                        <Footer />
                    </div>
                </Providers>
            </body>
        </html>
    );
}
