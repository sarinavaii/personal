import { routing } from "@i18n/routing";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { cn } from "@core/utils";
import { Viewport } from "next/types";

import Providers from "@core/providers";
import Header from "@partials/Header";
import Footer from "@partials/Footer";

import "@mantine/core/styles.css";
import "@styles/globals.css";

import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import { getLocale, getTranslations } from "next-intl/server";
import { PropsWithChildren } from "react";

// Base metadata that will be used for all locales
export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
};

// Generate metadata based on locale
export async function generateMetadata() {
    const locale = await getLocale();

    // Get translations from the appropriate JSON file
    const t = await getTranslations({ locale });

    // Add these translations to your JSON files
    const baseTitle = `${t("common.site-name")} | ${t("metadata.profession")}`;
    const baseDescription = t("metadata.description");
    const personalWebsite = t("metadata.personal-website");

    return {
        title: baseTitle,
        description: baseDescription,
        authors: [{ name: t("common.site-name"), url: "https://sarinavaii.ir" }],
        keywords: t("metadata.keywords").split(","),
        creator: t("common.site-name"),
        publisher: t("common.site-name"),
        openGraph: {
            type: "website",
            locale: locale,
            alternateLocale: locale === "fa" ? "en" : "fa",
            url: "https://sarinavaii.ir",
            title: baseTitle,
            description: baseDescription,
            siteName: `${t("common.site-name")} ${personalWebsite}`,
            images: [
                {
                    url: "/images/profile-image.jpg",
                    width: 1200,
                    height: 630,
                    alt: t("common.site-name"),
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: baseTitle,
            description: baseDescription,
            creator: "@your_twitter_handle",
            images: ["/images/profile-image.jpg"],
        },
        icons: {
            icon: "/favicon.ico",
            shortcut: "/favicon-16x16.png",
            apple: "/apple-touch-icon.png",
            other: [
                {
                    rel: "icon",
                    type: "image/png",
                    sizes: "32x32",
                    url: "/favicon-32x32.png",
                },
                {
                    rel: "icon",
                    type: "image/png",
                    sizes: "16x16",
                    url: "/favicon-16x16.png",
                },
                {
                    rel: "manifest",
                    url: "/site.webmanifest",
                },
            ],
        },
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

export default async function LocaleLayout({ children }: PropsWithChildren) {
    const locale = await getLocale();
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <html lang={locale} dir={locale === "en" ? "ltr" : "rtl"} {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript />
            </head>
            <body
                className={cn("bg-woodsmoke-100 text-woodsmoke-900 dark:bg-black dark:text-woodsmoke-100", {
                    "font-peyda": locale === "fa",
                    "font-space-grotesk leading-snug": locale === "en",
                })}
            >
                <Providers>
                    <div className="p-4 min-h-dvh flex flex-col">
                        <Header />
                        <div className="grow">{children}</div>
                        <Footer />
                    </div>
                </Providers>
            </body>
        </html>
    );
}
