import Link from "next/link";
import { IconArrowRight, IconArrowUpRight } from "@tabler/icons-react";

import SectionHeading from "@ui/SectionHeading";
import { formatDate, t } from "@lib/i18n";
import { getLatestPosts } from "@lib/posts";

const LatestPosts = () => {
    const translate = t("home.blogs");
    const posts = getLatestPosts(4);

    return (
        <section className="border-b border-border">
            <div className="container-page py-16 lg:py-20">
                <SectionHeading
                    eyebrow={translate("eyebrow")}
                    title={translate("title")}
                    description={translate("description")}
                    className="mb-10"
                    action={
                        <Link
                            href="/blog"
                            className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
                        >
                            {translate("view-all")}
                            <IconArrowRight
                                size={14}
                                className="transition-transform group-hover:translate-x-0.5"
                                aria-hidden
                            />
                        </Link>
                    }
                />

                <div className="divide-y divide-border border-y border-border">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group grid gap-2 py-5 transition-colors duration-200 hover:bg-surface/60 sm:grid-cols-[8rem_1fr_auto] sm:items-center sm:gap-6 sm:px-3"
                        >
                            <time
                                dateTime={post.date}
                                className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint"
                            >
                                {formatDate(post.date, { year: "numeric", month: "short", day: "2-digit" })}
                            </time>

                            <div className="min-w-0 transition-transform duration-300 group-hover:translate-x-0.5">
                                <h3 className="font-medium text-foreground transition-colors group-hover:text-strong">
                                    {post.title}
                                </h3>
                                <p className="mt-1 line-clamp-2 text-sm text-muted sm:line-clamp-1">
                                    {post.description}
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                {post.tags[0] ? (
                                    <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-faint sm:block">
                                        {post.tags[0]}
                                    </span>
                                ) : null}
                                <IconArrowUpRight
                                    size={15}
                                    className="text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                                    aria-hidden
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestPosts;
