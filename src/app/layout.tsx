import type { Metadata } from "next";
import type { Viewport } from "next/types";
import type { PropsWithChildren } from "react";

import Header from "@layout/Header";
import Footer from "@layout/Footer";
import ThemeScript from "@layout/ThemeScript";
import CursorTracker from "@layout/CursorTracker";
import { geistMono, geistSans } from "@core/fonts";
import { cn } from "@core/utils";
import { t } from "@lib/i18n";
import { SITE_URL, absoluteUrl } from "@lib/site";
import { JsonLd, graphSchema, personSchema, websiteSchema } from "@lib/schema";

import "@styles/globals.css";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        { media: "(prefers-color-scheme: dark)", color: "#000000" },
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    ],
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
        <html
            lang="en"
            dir="ltr"
            data-theme="dark"
            suppressHydrationWarning
            className={cn(geistSans.variable, geistMono.variable)}
        >
            <head>
                <ThemeScript />
            </head>
            <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
                <JsonLd data={graphSchema([personSchema(), websiteSchema()])} />
                <a href="#main" className="skip-link">
                    Skip to content
                </a>
                <div className="site-grid" aria-hidden />
                <div className="site-glow" aria-hidden />
                <CursorTracker />
                <div className="relative z-10 flex min-h-dvh flex-col">
                    <Header />
                    <main id="main" className="flex-1">
                        {children}
                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
