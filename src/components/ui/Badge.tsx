import type { ReactNode } from "react";
import { cn } from "@core/utils";

export default function Badge({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-[10px] uppercase leading-none tracking-[0.14em] text-muted",
                className,
            )}
        >
            {children}
        </span>
    );
}
