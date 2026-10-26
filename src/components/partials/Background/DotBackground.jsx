"use client";

import { useComputedColorScheme } from "@mantine/core";
import DotGrid from "./DotGrid";

// The grid is painted on a canvas, so the palette has to be resolved in JS
// instead of coming from Tailwind classes. `opacity` is part of each palette:
// on black the dots only need a fraction of their colour to read as texture,
// while on the light background the same trick washes them out entirely.
const GRID = {
    dark: { base: "#dbdadf", active: "#8a868c", opacity: 0.2 },
    light: { base: "#8f9b99", active: "#5c6b69", opacity: 0.4 },
};

export default function DotBackground() {
    const colorScheme = useComputedColorScheme("dark");
    const grid = GRID[colorScheme] ?? GRID.dark;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
                pointerEvents: "none",
            }}
        >
            <DotGrid
                dotSize={2}
                gap={20}
                baseColor={grid.base}
                activeColor={grid.active}
                opacity={grid.opacity}
                proximity={120}
                shockRadius={250}
                shockStrength={5}
                resistance={750}
                returnDuration={1.5}
                style={{ width: "100%", height: "100%" }}
            />
        </div>
    );
}
