import { defineConfig, s } from "velite";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from "@rehype-pretty/transformers";

export default defineConfig({
    root: "content",
    output: {
        data: "velite",
    },
    markdown: {
        rehypePlugins: [
            [
                rehypePrettyCode,
                {
                    theme: "vitesse-black",
                    keepBackground: true,
                    transformers: [
                        transformerCopyButton({
                            visibility: "hover",
                            feedbackDuration: 2000,
                        }),
                    ],
                },
            ],
        ],
    },
    collections: {
        posts: {
            name: "Post",
            pattern: "blog/**/*.mdx",
            schema: s
                .object({
                    title: s.string(),
                    description: s.string(),
                    date: s.isodate(),
                    published: s.boolean().default(true),
                    tags: s.array(s.string()).default([]),
                    slug: s.path(),
                    content: s.markdown(),
                })
                .transform((data) => ({
                    ...data,
                    slug: data.slug.replace(/^blog\//, "").replace(/\.mdx$/, ""),
                })),
        },
    },
});
