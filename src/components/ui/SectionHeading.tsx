import type { ReactNode } from "react";
import { cn } from "@core/utils";

type SectionHeadingProps = {
    eyebrow: string;
    title: string;
    description?: string;
    action?: ReactNode;
    className?: string;
};

export default function SectionHeading({ eyebrow, title, description, action, className }: SectionHeadingProps) {
    return (
        <div className={cn("flex flex-wrap items-end justify-between gap-6", className)}>
            <div>
                <p className="eyebrow">{eyebrow}</p>
                <h2 className="mt-3 text-2xl font-semibold text-strong sm:text-3xl">{title}</h2>
                {description ? <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{description}</p> : null}
            </div>
            {action}
        </div>
    );
}
