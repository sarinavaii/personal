import { cn } from "@core/utils";

export default function LogoMark({ className }: { className?: string }) {
    return (
        <span
            className={cn(
                "grid size-7 shrink-0 place-items-center rounded-md border border-border bg-surface font-mono text-[13px] font-semibold leading-none text-strong transition-transform duration-300",
                className,
            )}
            aria-hidden
        >
            S
        </span>
    );
}
