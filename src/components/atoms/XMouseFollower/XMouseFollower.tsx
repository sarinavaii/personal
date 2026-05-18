"use client";

import { cn } from "@core/utils";
import { useMediaQuery } from "@mantine/hooks";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface MousePosition {
    x: number;
    y: number;
}

const XMouseFollower = () => {
    const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });

            // Check if hovering over a link or button
            const target = e.target as HTMLElement;
            const isInteractive = target.closest('a, button, [role="button"]');
            setIsHovering(!!isInteractive);
        };

        // Only add listener on desktop
        if (isDesktop) {
            window.addEventListener("mousemove", handleMouseMove);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [isDesktop]);

    return (
        isDesktop && (
            <>
                <motion.div
                    className={cn(
                        "fixed transition-colors top-8 left-8 dark:border-woodsmoke-200 border-woodsmoke-900 border rounded-full pointer-events-none z-1002 opacity-20",
                        {
                            "bg-woodsmoke-500": isHovering,
                        },
                    )}
                    animate={{
                        x: mousePosition.x - (isHovering ? 0 : 16),
                        y: mousePosition.y - (isHovering ? 0 : 16),
                        scale: isHovering ? 1.5 : 1,
                    }}
                    transition={{
                        type: "spring",
                        damping: 30,
                        stiffness: 200,
                        mass: 0.5,
                    }}
                    style={{
                        width: "28px",
                        height: "28px",
                    }}
                />

                {/* Optional: Larger delayed circle for trail effect */}
                <motion.div
                    className={cn(
                        "fixed top-8 left-8 border dark:border-woodsmoke-400 border-woodsmoke-300 rounded-full pointer-events-none z-1001 backdrop-blur-[3px]",
                    )}
                    animate={{
                        x: mousePosition.x - (isHovering ? 8 : 24),
                        y: mousePosition.y - (isHovering ? 8 : 24),
                        scale: isHovering ? 1.5 : 1,
                    }}
                    transition={{
                        type: "spring",
                        damping: 20,
                        stiffness: 100,
                        mass: 0.8,
                    }}
                    style={{
                        width: "44px",
                        height: "44px",
                    }}
                />
            </>
        )
    );
};

export default XMouseFollower;
