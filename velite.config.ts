import { defineConfig, s } from "velite";

export default defineConfig({
    root: "content",
    output: {
        data: "velite",
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
