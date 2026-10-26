import { cn } from "@core/utils";
import { Viewport } from "next/types";
import type { Metadata } from "next";

import Providers from "@core/providers";
import Header from "@partials/Header";
import Footer from "@partials/Footer";

import "@mantine/core/styles.css";
import "@styles/globals.css";

import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import { PropsWithChildren } from "react";
import { spaceGrotesk } from "@core/fonts";
import Blob from "@partials/Blob";
import DotBackground from "@partials/Background/DotBackground";
import { t } from "@lib/i18n";
import { SITE_URL, absoluteUrl } from "@lib/site";
import { JsonLd, graphSchema, personSchema, websiteSchema } from "@lib/schema";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: "#111313",
};

export function generateMetadata(): Metadata {
    const translate = t();

    const siteName = translate("common.site-name");
    const baseTitle = `${siteName} | ${translate("metadata.profession")}`;
    const description = translate("metadata.description");

    return {
        metadataBase: new URL(SITE_URL),
        title: {
            default: baseTitle,
            template: `%s | ${siteName}`,
        },
        description,
        keywords: translate("metadata.keywords").split(","),
        authors: [{ name: siteName, url: SITE_URL }],
        creator: siteName,
        publisher: siteName,
        alternates: {
            canonical: absoluteUrl("/"),
        },
        openGraph: {
            type: "website",
            locale: "en_US",
            url: "/",
            title: baseTitle,
            description,
            siteName: `${siteName} ${translate("metadata.personal-website")}`,
        },
        twitter: {
            card: "summary_large_image",
            title: baseTitle,
            description,
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

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en" dir="ltr" className={spaceGrotesk.variable} {...mantineHtmlProps} data-mantine-color-scheme="dark">
            <head>
                <ColorSchemeScript defaultColorScheme="dark" />
            </head>
            <body
                className={cn(
                    "bg-woodsmoke-100 text-woodsmoke-900 dark:bg-black dark:text-woodsmoke-100",
                    "font-space-grotesk leading-snug",
                )}
            >
                <JsonLd data={graphSchema([personSchema(), websiteSchema()])} />
                <Providers>
                    {/* <XMouseFollower /> */}
                    <DotBackground />
                    <Blob />
                    <div className="p-4 min-h-dvh flex flex-col relative z-1">
                        <header>
                            <Header />
                        </header>
                        <main className="grow">{children}</main>
                        <footer>
                            <Footer />
                        </footer>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
