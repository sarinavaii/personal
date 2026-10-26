import type { ReactNode } from "react";

export default function Badge({ children }: { children: ReactNode }) {
    return (
        <span className="inline-flex items-center rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-[10px] uppercase leading-none tracking-[0.14em] text-muted">
            {children}
        </span>
    );
}
