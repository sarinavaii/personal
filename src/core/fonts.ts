import localFont from "next/font/local";

/**
 * Space Grotesk, self-hosted.
 *
 * The upstream Google Fonts build is a variable font, so one 22 KB `latin`
 * woff2 covers every weight the UI uses (300–700) instead of four ~86 KB TTFs.
 * next/font emits `font-display: swap`, a size-adjusted Arial fallback and a
 * single preload tag, replacing the render-blocking @font-face blocks that used
 * to live in src/styles/fonts.css.
 *
 * Apply `spaceGrotesk.variable` to <html> so `--font-space-grotesk` resolves to
 * the generated family stack (the `font-space-grotesk` utility reads it).
 */
export const spaceGrotesk = localFont({
    src: [
        {
            path: "../../public/fonts/SpaceGrotesk-latin.woff2",
            weight: "300 700",
            style: "normal",
        },
    ],
    variable: "--font-space-grotesk",
    display: "swap",
    preload: true,
    fallback: ["system-ui", "arial"],
    adjustFontFallback: "Arial",
});
