"use client";

type Waypoint = {
    /** translate in % of the blob's own size (the blobs are 50vw x 50vh) */
    x: number;
    y: number;
    /** index into RADII */
    radius: number;
};

type BlobConfig = {
    background: string;
    /** full loop duration in seconds */
    duration: number;
    /** negative delay so the three blobs never move in lockstep */
    delay: number;
    stops: readonly [Waypoint, Waypoint, Waypoint, Waypoint];
};

const RADII = [
    "60% 40% 55% 45% / 50% 60% 40% 55%",
    "40% 60% 45% 55% / 60% 40% 55% 45%",
    "55% 45% 60% 40% / 45% 55% 50% 50%",
    "50% 50% 40% 60% / 55% 45% 60% 40%",
] as const;

// Each blob walks four waypoints (~7-10s per leg, the tempo of the previous
// gsap tweens) and loops back to where it started. Values are percentages of the
// element's own size, which is exactly the old 0..0.5 * viewport range.
const BLOBS: readonly BlobConfig[] = [
    {
        background:
            "radial-gradient(ellipse at 40% 50%, rgba(102,116,114,0.45) 0%, rgba(58,66,64,0.25) 55%, transparent 75%)",
        duration: 28,
        delay: 0,
        stops: [
            { x: 0, y: 0, radius: 0 },
            { x: 58, y: 26, radius: 1 },
            { x: 16, y: 74, radius: 2 },
            { x: 86, y: 44, radius: 3 },
        ],
    },
    {
        background:
            "radial-gradient(ellipse at 60% 40%, rgba(80,100,96,0.45) 0%, rgba(40,58,54,0.2) 55%, transparent 75%)",
        duration: 34,
        delay: -9,
        stops: [
            { x: 24, y: 8, radius: 2 },
            { x: 8, y: 62, radius: 3 },
            { x: 70, y: 88, radius: 0 },
            { x: 42, y: 30, radius: 1 },
        ],
    },
    {
        background:
            "radial-gradient(ellipse at 50% 60%, rgba(120,138,136,0.4) 0%, rgba(70,84,82,0.18) 55%, transparent 75%)",
        duration: 40,
        delay: -21,
        stops: [
            { x: 12, y: 36, radius: 3 },
            { x: 78, y: 6, radius: 2 },
            { x: 38, y: 82, radius: 1 },
            { x: 92, y: 58, radius: 0 },
        ],
    },
];

const CSS = [
    ...BLOBS.map((blob, index) => {
        const frames = [
            ...blob.stops.map((stop, stopIndex) => {
                const position = `${stopIndex * 25}%`;
                return `${position}{transform:translate3d(${stop.x}%,${stop.y}%,0);border-radius:${RADII[stop.radius]};}`;
            }),
            `100%{transform:translate3d(${blob.stops[0].x}%,${blob.stops[0].y}%,0);border-radius:${RADII[blob.stops[0].radius]};}`,
        ].join("");
        return `@keyframes blob-drift-${index}{${frames}}`;
    }),
    "@media (prefers-reduced-motion: reduce){.blob-motion{animation:none !important;}}",
].join("");

export default function BlobScene() {
    return (
        <div className="fixed z-[-1] inset-0 overflow-hidden">
            <style>{CSS}</style>
            {BLOBS.map((config, index) => (
                <div
                    key={index}
                    className="blob-motion absolute w-[50vw] h-[50vh] blur-[110px] will-change-transform opacity-50 dark:opacity-100"
                    style={{
                        background: config.background,
                        borderRadius: RADII[config.stops[0].radius],
                        animation: `blob-drift-${index} ${config.duration}s ease-in-out ${config.delay}s infinite`,
                    }}
                />
            ))}
        </div>
    );
}
