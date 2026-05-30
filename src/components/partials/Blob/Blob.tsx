"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const RADII = [
    "60% 40% 55% 45% / 50% 60% 40% 55%",
    "40% 60% 45% 55% / 60% 40% 55% 45%",
    "55% 45% 60% 40% / 45% 55% 50% 50%",
    "50% 50% 40% 60% / 55% 45% 60% 40%",
];

const BLOBS = [
    {
        background:
            "radial-gradient(ellipse at 40% 50%, rgba(102,116,114,0.45) 0%, rgba(58,66,64,0.25) 55%, transparent 75%)",
        speedMin: 5,
        speedMax: 9,
    },
    {
        background:
            "radial-gradient(ellipse at 60% 40%, rgba(80,100,96,0.45) 0%, rgba(40,58,54,0.2) 55%, transparent 75%)",
        speedMin: 6,
        speedMax: 11,
    },
    {
        background:
            "radial-gradient(ellipse at 50% 60%, rgba(120,138,136,0.4) 0%, rgba(70,84,82,0.18) 55%, transparent 75%)",
        speedMin: 7,
        speedMax: 13,
    },
];

function useBlob() {
    const ref = useRef<HTMLDivElement | null>(null);
    const running = useRef(true);
    const tween = useRef<gsap.core.Tween | null>(null);

    function getRandomProps() {
        const W = window.innerWidth;
        const H = window.innerHeight;
        const x = Math.random() * (W - W * 0.5);
        const y = Math.random() * (H - H * 0.5);
        const borderRadius = RADII[Math.floor(Math.random() * RADII.length)];
        return { x, y, borderRadius };
    }

    function start(speedMin: number, speedMax: number) {
        running.current = true;
        const el = ref.current;
        if (!el) return;

        function animateBlob() {
            if (!running.current) return;
            const { x, y, borderRadius } = getRandomProps();
            const duration = speedMin + Math.random() * (speedMax - speedMin);

            tween.current = gsap.to(el, {
                x,
                y,
                borderRadius,
                duration,
                ease: "power1.inOut",
                onComplete: animateBlob,
            });
        }
        animateBlob();
    }

    function stop() {
        running.current = false;
        if (tween.current) {
            tween.current.kill();
            tween.current = null;
        }
    }

    return { ref, start, stop };
}

export default function BlobScene() {
    const blobs = [useBlob(), useBlob(), useBlob()];

    useEffect(() => {
        blobs.forEach((blob, i) => blob.start(BLOBS[i].speedMin, BLOBS[i].speedMax));
        return () => blobs.forEach((blob) => blob.stop());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="fixed z-[-1] inset-0 overflow-hidden">
            {BLOBS.map((config, i) => (
                <div
                    key={i}
                    ref={blobs[i].ref}
                    className="absolute w-[50vw] h-[50vh] blur-[110px] will-change-transform opacity-50 dark:opacity-100"
                    style={{
                        background: config.background,
                        borderRadius: RADII[0],
                    }}
                />
            ))}
        </div>
    );
}
