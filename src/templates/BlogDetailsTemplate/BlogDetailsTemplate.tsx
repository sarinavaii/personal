import Link from "next/link";
import { IconArrowLeft, IconChevronRight } from "@tabler/icons-react";

import Badge from "@ui/Badge";
import Prose from "@ui/Prose";
import { formatDate, t } from "@lib/i18n";

type BlogPost = {
    slug: string;
    title: string;
    content: string;
    description: string;
    date: string;
    published: boolean;
    tags: string[];
};

type Props = {
    post: BlogPost;
    prevPost: BlogPost | null;
    nextPost: BlogPost | null;
};

const BlogDetailsTemplate = ({ post, prevPost, nextPost }: Props) => {
    const translate = t("home.blogs");
    const pages = t("pages");

    return (
        <article className="container-page py-10 lg:py-16">
            <div className="mx-auto max-w-3xl">
                <nav
                    aria-label="Breadcrumb"
                    className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-faint"
                >
                    <Link href="/" className="transition-colors hover:text-foreground">
                        {pages("home")}
                    </Link>
                    <IconChevronRight size={12} aria-hidden />
                    <Link href="/blog" className="transition-colors hover:text-foreground">
                        {pages("blog")}
                    </Link>
                    <IconChevronRight size={12} aria-hidden />
                    <span className="truncate text-muted">{post.title}</span>
                </nav>

                <header className="mt-6 border-b border-border pb-8">
                    <h1 className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-strong sm:text-4xl">
                        {post.title}
                    </h1>
                    <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{post.description}</p>

                    <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
                        <time
                            dateTime={post.date}
                            className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint"
                        >
                            {formatDate(post.date, { year: "numeric", month: "long", day: "numeric" })}
                        </time>
                        {post.tags.length > 0 ? (
                            <>
                                <span className="h-3 w-px bg-border" aria-hidden />
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <Badge key={tag}>{tag}</Badge>
                                    ))}
                                </div>
                            </>
                        ) : null}
                    </div>
                </header>

                <div className="mt-10">
                    <Prose>{post.content}</Prose>
                </div>

                <nav className="mt-14 grid gap-4 border-t border-border pt-8 sm:grid-cols-2" aria-label="More articles">
                    {prevPost ? (
                        <Link
                            href={`/blog/${prevPost.slug}`}
                            className="group rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong"
                        >
                            <span className="eyebrow">← {translate("newer")}</span>
                            <span className="mt-2 block text-sm font-medium text-foreground transition-colors group-hover:text-strong">
                                {prevPost.title}
                            </span>
                        </Link>
                    ) : null}

                    {nextPost ? (
                        <Link
                            href={`/blog/${nextPost.slug}`}
                            className="group rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong sm:text-right"
                        >
                            <span className="eyebrow">{translate("older")} →</span>
                            <span className="mt-2 block text-sm font-medium text-foreground transition-colors group-hover:text-strong">
                                {nextPost.title}
                            </span>
                        </Link>
                    ) : null}
                </nav>

                <div className="mt-8">
                    <Link
                        href="/blog"
                        className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                    >
                        <IconArrowLeft
                            size={14}
                            className="transition-transform duration-300 group-hover:-translate-x-0.5"
                            aria-hidden
                        />
                        {translate("back")}
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default BlogDetailsTemplate;
