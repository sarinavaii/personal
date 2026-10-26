import localFont from "next/font/local";

/**
 * Geist Sans and Geist Mono, self-hosted from the official variable builds.
 *
 * A single woff2 per family covers the full weight range, so the site ships
 * two small font files instead of a render-blocking Google Fonts request.
 * Apply the `.variable` class names to <html>; the values feed the
 * `--font-sans` / `--font-mono` tokens in `variables.css`.
 */
export const geistSans = localFont({
    src: [
        {
            path: "../../public/fonts/Geist-Variable.woff2",
            weight: "100 900",
            style: "normal",
        },
    ],
    variable: "--font-geist-sans",
    display: "swap",
    preload: true,
    fallback: ["ui-sans-serif", "system-ui", "Arial"],
    adjustFontFallback: "Arial",
});

export const geistMono = localFont({
    src: [
        {
            path: "../../public/fonts/GeistMono-Variable.woff2",
            weight: "100 900",
            style: "normal",
        },
    ],
    variable: "--font-geist-mono",
    display: "swap",
    preload: true,
    fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
});
