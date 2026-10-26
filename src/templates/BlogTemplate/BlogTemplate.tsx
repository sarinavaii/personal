import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";

import Badge from "@ui/Badge";
import { formatDate, t } from "@lib/i18n";
import { getPosts } from "@lib/posts";

const BlogTemplate = () => {
    const translate = t("home.blogs");
    const posts = getPosts();

    return (
        <>
            <section className="border-b border-border">
                <div className="container-page py-16 lg:py-24">
                    <p className="eyebrow">{translate("eyebrow")}</p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-strong sm:text-5xl">
                        {translate("page-title")}
                    </h1>
                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                        {translate("description")}
                    </p>
                    <p className="eyebrow mt-8">
                        {String(posts.length).padStart(2, "0")} {translate("count-label")}
                    </p>
                </div>
            </section>

            <div className="container-page py-12">
                <div className="divide-y divide-border border-y border-border">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group flex flex-col gap-3 py-7 transition-colors duration-200 hover:bg-surface/60 sm:flex-row sm:items-start sm:justify-between sm:gap-8 sm:px-3"
                        >
                            <div className="sm:flex sm:gap-8">
                                <time
                                    dateTime={post.date}
                                    className="block shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-faint sm:w-24 sm:pt-1"
                                >
                                    {formatDate(post.date, {
                                        year: "numeric",
                                        month: "short",
                                        day: "2-digit",
                                    })}
                                </time>

                                <div className="transition-transform duration-300 group-hover:translate-x-0.5">
                                    <h2 className="text-lg font-medium text-foreground transition-colors group-hover:text-strong">
                                        {post.title}
                                    </h2>
                                    <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">
                                        {post.description}
                                    </p>
                                    {post.tags.length > 0 ? (
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {post.tags.map((tag) => (
                                                <Badge key={tag}>{tag}</Badge>
                                            ))}
                                        </div>
                                    ) : null}
                                </div>
                            </div>

                            <IconArrowUpRight
                                size={16}
                                className="mt-1 shrink-0 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                                aria-hidden
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default BlogTemplate;
