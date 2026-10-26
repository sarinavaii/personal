import { ImageResponse } from "next/og";
import { getPostBySlug } from "@lib/posts";
import { t } from "@lib/i18n";
import { SITE_URL } from "@lib/site";

const translate = t();
const siteName = translate("common.site-name");
const host = new URL(SITE_URL).host;

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Params = { slug: string };

/**
 * Per-post alt text. `alt` cannot be a function export, so the dynamic alt is
 * provided through `generateImageMetadata` (receives synchronous `params` in
 * Next 16).
 */
export function generateImageMetadata({ params }: { params: Params }) {
    const post = getPostBySlug(params.slug);

    return [
        {
            id: "post",
            alt: post ? `${post.title} — ${siteName}` : `${siteName} — Blog`,
            size,
            contentType,
        },
    ];
}

const MAX_TITLE_LENGTH = 130;

function excerpt(value: string, max: number) {
    return value.length > max ? `${value.slice(0, max - 1).trimEnd()}…` : value;
}

export default async function Image({ params }: { params: Promise<Params> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    const title = post ? excerpt(post.title, MAX_TITLE_LENGTH) : "Article";
    const tags = post?.tags.slice(0, 4) ?? [];

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
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        backgroundColor: "#0a0a0a",
                        border: "1px solid #262626",
                    }}
                >
                    <div style={{ display: "flex", fontSize: 21, fontWeight: 700, color: "#ffffff" }}>S</div>
                </div>
                <div style={{ display: "flex", fontSize: 24, color: "#a1a1a1" }}>{siteName} · Blog</div>
            </div>

            <div
                style={{
                    display: "flex",
                    fontSize: title.length > 80 ? 54 : 66,
                    fontWeight: 700,
                    lineHeight: 1.12,
                    letterSpacing: "-0.035em",
                }}
            >
                {title}
            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 14,
                    borderTop: "1px solid #262626",
                    paddingTop: 24,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {tags.map((tag) => (
                        <div
                            key={tag}
                            style={{
                                display: "flex",
                                padding: "8px 18px",
                                borderRadius: 6,
                                backgroundColor: "#0a0a0a",
                                border: "1px solid #262626",
                                fontSize: 20,
                                color: "#a1a1a1",
                            }}
                        >
                            {tag}
                        </div>
                    ))}
                </div>
                <div style={{ display: "flex", fontSize: 20, color: "#737373" }}>{host}</div>
            </div>
        </div>,
        { ...size },
    );
}
