import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@core/utils";

type ButtonLinkProps = {
    href: string;
    children: ReactNode;
    variant?: "primary" | "secondary" | "ghost";
    className?: string;
    onClick?: () => void;
};

const VARIANTS = {
    primary: "bg-strong text-background hover:bg-foreground",
    secondary: "border border-border bg-surface text-foreground hover:border-border-strong hover:bg-surface-hover",
    ghost: "text-muted hover:bg-surface hover:text-foreground",
} as const;

export default function ButtonLink({ href, children, variant = "primary", className, onClick }: ButtonLinkProps) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(
                "inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-all duration-200 active:scale-[0.98] hover:-translate-y-px",
                VARIANTS[variant],
                className,
            )}
        >
            {children}
        </Link>
    );
}
