import { cn } from "@core/utils";
import { PropsWithChildren } from "react";

const XSection = ({
    children,
    className,
    containerClassname,
    transparent = false,
    withPadding = true,
}: PropsWithChildren<{
    className?: string;
    containerClassname?: string;
    transparent?: boolean;
    withPadding?: boolean;
}>) => {
    return (
        <div
            className={cn(
                "container py-4 rounded-xl not-last:mb-4",
                {
                    "bg-woodsmoke-50  dark:bg-woodsmoke-900": !transparent,
                    "p-4": withPadding,
                },
                containerClassname,
            )}
        >
            <div className={cn(className)}>{children}</div>
        </div>
    );
};

export default XSection;
