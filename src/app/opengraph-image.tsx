import { ImageResponse } from "next/og";
import { t } from "@lib/i18n";
import { SITE_URL } from "@lib/site";

const translate = t();
const siteName = translate("common.site-name");

export const alt = `${siteName} — ${translate("metadata.profession")}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Site-wide Open Graph card. Uses the default bundled font only — no remote
 * font fetching — so the build stays fully offline.
 */
export default function Image() {
    const host = new URL(SITE_URL).host;

    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "#000000",
                color: "#ededed",
                padding: "72px 80px",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 44,
                        height: 44,
                        borderRadius: 8,
                        backgroundColor: "#0a0a0a",
                        border: "1px solid #262626",
                    }}
                >
                    <div style={{ display: "flex", fontSize: 24, fontWeight: 700, color: "#ffffff" }}>S</div>
                </div>
                <div style={{ display: "flex", fontSize: 28, color: "#a1a1a1" }}>{siteName}</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div
                    style={{
                        display: "flex",
                        fontSize: 74,
                        fontWeight: 700,
                        lineHeight: 1.1,
                        letterSpacing: "-0.04em",
                    }}
                >
                    {translate("home.hero.tagline-1")} {translate("home.hero.tagline-2")}
                </div>
                <div style={{ display: "flex", fontSize: 32, color: "#a1a1a1" }}>
                    {translate("metadata.profession")}
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid #262626",
                    paddingTop: 28,
                    fontSize: 24,
                    color: "#737373",
                }}
            >
                <div style={{ display: "flex" }}>{host}</div>
                <div style={{ display: "flex", fontFamily: "monospace" }}>React · Next.js · TypeScript</div>
            </div>
        </div>,
        { ...size },
    );
}
