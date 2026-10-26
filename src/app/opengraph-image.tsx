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
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    backgroundColor: "#111313",
                    color: "#f4f4f5",
                    padding: "72px 80px",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 68,
                            height: 68,
                            borderRadius: 18,
                            backgroundColor: "#1f2222",
                            border: "1px solid #2b2f2f",
                            fontSize: 26,
                            fontWeight: 700,
                            color: "#a1a1aa",
                        }}
                    >
                        SS
                    </div>
                    <div style={{ display: "flex", fontSize: 30, color: "#a1a1aa" }}>{siteName}</div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <div
                        style={{
                            display: "flex",
                            fontSize: 68,
                            fontWeight: 700,
                            lineHeight: 1.15,
                            letterSpacing: "-0.02em",
                        }}
                    >
                        {translate("home.hero.tagline-1")}
                    </div>
                    <div style={{ display: "flex", fontSize: 34, color: "#a1a1aa" }}>
                        {translate("metadata.profession")}
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: 26,
                        color: "#71717a",
                    }}
                >
                    <div style={{ display: "flex" }}>{host}</div>
                    <div style={{ display: "flex" }}>Front-end · React · Next.js</div>
                </div>
            </div>
        ),
        { ...size },
    );
}
