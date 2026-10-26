import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Page not found",
    robots: {
        index: false,
        follow: false,
    },
};

const LINKS = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/projects", label: "Projects" },
];

export default function NotFound() {
    return (
        <div className="container py-16">
            <div className="max-w-xl mx-auto text-center">
                <p className="text-xs uppercase tracking-[0.35em] text-woodsmoke-500">404</p>
                <h1 className="text-3xl font-bold mt-3">Page not found</h1>
                <p className="text-woodsmoke-600 dark:text-woodsmoke-300 mt-4">
                    The page you are looking for does not exist or has been moved.
                </p>

                <nav className="flex flex-wrap justify-center gap-3 mt-8">
                    {LINKS.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className="px-5 py-2 rounded-xl text-sm font-semibold border border-woodsmoke-200 dark:border-woodsmoke-900 bg-woodsmoke-50 dark:bg-woodsmoke-950 hover:bg-woodsmoke-100 dark:hover:bg-woodsmoke-900 transition-colors"
                        >
                            {label}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
}
