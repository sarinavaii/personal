"use client";

import XSection from "@atoms/XSection";
import { getPosts } from "@lib/posts";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Pagination } from "@mantine/core";
import { useState } from "react";

const PAGE_SIZE = 10;

const BlogTemplate = () => {
    const t = useTranslations("home.blogs");
    const allPosts = getPosts();
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(allPosts.length / PAGE_SIZE);
    const posts = allPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <XSection transparent>
                <h1 className="text-3xl text-center font-bold">{t("title")}</h1>
            </XSection>

            {posts.map((post) => (
                <XSection
                    key={post.slug}
                    containerClassname="transition-all hover:shadow-xl dark:hover:shadow-woodsmoke-900/40 hover:shadow-woodsmoke-300/30 hover:scale-[1.03] duration-300"
                >
                    <Link href={`/blog/${post.slug}`}>
                        <div className="text-xs text-woodsmoke-500 dark:text-woodsmoke-300">
                            {new Date(post.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "2-digit",
                            })}
                        </div>
                        <h3 className="leading-tight font-bold text-lg mt-2 mb-1">{post.title}</h3>
                        <div className="text-sm text-woodsmoke-600 dark:text-woodsmoke-300">{post.description}</div>
                    </Link>
                </XSection>
            ))}

            {totalPages > 1 && (
                <div className="flex justify-center mt-6 mb-10">
                    <Pagination total={totalPages} value={page} onChange={handlePageChange} />
                </div>
            )}
        </>
    );
};

export default BlogTemplate;
