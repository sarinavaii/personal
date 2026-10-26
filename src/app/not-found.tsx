import type { Metadata } from "next";

import ButtonLink from "@ui/ButtonLink";

export const metadata: Metadata = {
    title: "Page not found",
    robots: {
        index: false,
        follow: false,
    },
};

export default function NotFound() {
    return (
        <section className="container-page flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
            <p className="eyebrow">Error 404</p>
            <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] text-strong sm:text-7xl">Page not found</h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
                The page you are looking for does not exist or has been moved.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
                <ButtonLink href="/">Back home</ButtonLink>
                <ButtonLink href="/projects" variant="secondary">
                    Browse projects
                </ButtonLink>
            </div>
        </section>
    );
}
