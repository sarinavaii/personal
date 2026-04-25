import { cn } from "@core/utils";
import { PropsWithChildren } from "react";

const Section = ({
    children,
    className,
    transparent = false,
}: PropsWithChildren<{ className?: string; transparent?: boolean }>) => {
    return (
        <div
            className={cn("container p-4 rounded-xl not-last:mb-4", {
                "bg-woodsmoke-50 dark:bg-woodsmoke-900": !transparent,
            })}
        >
            <div className={cn("", className)}>{children}</div>
        </div>
    );
};

export default Section;
