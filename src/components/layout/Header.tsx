"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IconArrowUpRight, IconMenu2, IconX } from "@tabler/icons-react";

import ButtonLink from "@ui/ButtonLink";
import LogoMark from "@ui/LogoMark";
import { cn } from "@core/utils";
import { t } from "@lib/i18n";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
    { href: "/", key: "home" },
    { href: "/projects", key: "projects" },
    { href: "/blog", key: "blog" },
    { href: "/contact", key: "contact" },
] as const;

const Header = () => {
    const translate = t();
    const pages = t("pages");
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", onKeyDown);

        const desktop = window.matchMedia("(min-width: 768px)");
        const onDesktop = (event: MediaQueryListEvent) => {
            if (event.matches) setOpen(false);
        };
        desktop.addEventListener("change", onDesktop);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", onKeyDown);
            desktop.removeEventListener("change", onDesktop);
        };
    }, [open]);

    const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

    return (
        <>
            <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
                <div className="container-page flex h-16 items-center justify-between gap-6">
                    <Link
                        href="/"
                        className="group flex items-center gap-2.5"
                        aria-label={translate("common.site-name")}
                    >
                        <LogoMark className="transition-transform duration-300 group-hover:scale-105" />
                        <span className="text-sm font-semibold tracking-tight text-strong">
                            {translate("common.site-name")}
                        </span>
                    </Link>

                    <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                aria-current={isActive(link.href) ? "page" : undefined}
                                className={cn(
                                    "rounded-md px-3 py-2 text-sm transition-colors",
                                    isActive(link.href)
                                        ? "text-strong"
                                        : "text-muted hover:bg-surface hover:text-foreground",
                                )}
                            >
                                {pages(link.key)}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <ButtonLink href="/contact" className="hidden h-9 px-3.5 sm:inline-flex">
                            Let&apos;s talk
                            <IconArrowUpRight size={14} aria-hidden />
                        </ButtonLink>
                        <button
                            type="button"
                            onClick={() => setOpen((value) => !value)}
                            aria-expanded={open}
                            aria-controls="mobile-navigation"
                            aria-label={open ? "Close menu" : "Open menu"}
                            className="grid size-9 place-items-center rounded-md border border-border text-muted transition-[color,background-color,border-color,transform] duration-200 hover:border-border-strong hover:bg-surface hover:text-foreground active:scale-95 md:hidden"
                        >
                            <span className="relative grid size-4 place-items-center" aria-hidden>
                                <IconMenu2
                                    size={17}
                                    className={cn(
                                        "absolute transition-all duration-300",
                                        open ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100",
                                    )}
                                />
                                <IconX
                                    size={17}
                                    className={cn(
                                        "absolute transition-all duration-300",
                                        open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0",
                                    )}
                                />
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            <div
                id="mobile-navigation"
                role="dialog"
                aria-modal="true"
                aria-label="Site menu"
                aria-hidden={!open}
                inert={!open}
                className={cn(
                    "fixed inset-x-0 top-16 bottom-0 z-50 flex flex-col border-t border-border bg-background px-6 py-6 transition-[opacity,transform] duration-300 ease-out md:hidden",
                    open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
                )}
            >
                <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                    {NAV_LINKS.map((link, index) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            aria-current={isActive(link.href) ? "page" : undefined}
                            style={{ transitionDelay: open ? `${60 + index * 35}ms` : "0ms" }}
                            className={cn(
                                "group/link flex items-center justify-between rounded-md px-3 py-3 text-lg font-medium transition-[opacity,transform,background-color,color] duration-300 ease-out",
                                open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                                isActive(link.href)
                                    ? "bg-surface text-strong"
                                    : "text-muted hover:bg-surface hover:text-foreground",
                            )}
                        >
                            {pages(link.key)}
                            <IconArrowUpRight
                                size={16}
                                className="opacity-0 transition-all duration-300 group-hover/link:translate-x-0.5 group-hover/link:opacity-60"
                                aria-hidden
                            />
                        </Link>
                    ))}
                </nav>

                <div
                    className={cn(
                        "mt-auto border-t border-border pt-6 transition-[opacity,transform] duration-300 ease-out",
                        open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                    )}
                    style={{ transitionDelay: open ? "210ms" : "0ms" }}
                >
                    <ButtonLink href="/contact" className="w-full" onClick={() => setOpen(false)}>
                        Let&apos;s talk
                        <IconArrowUpRight size={14} aria-hidden />
                    </ButtonLink>
                </div>
            </div>
        </>
    );
};

export default Header;
