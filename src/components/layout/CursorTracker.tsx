"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = 'a, button, input, textarea, select, [role="button"], [data-cursor="hover"]';

/**
 * Two low-opacity rings that trail the pointer. The native cursor is left
 * untouched; the effect is decorative and disabled on touch devices or when
 * the visitor prefers reduced motion.
 */
export default function CursorTracker() {
    const innerRef = useRef<HTMLDivElement>(null);
    const outerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const finePointer = window.matchMedia("(pointer: fine)").matches;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (!finePointer || reducedMotion) return;

        const inner = innerRef.current;
        const outer = outerRef.current;
        if (!inner || !outer) return;

        let targetX = -100;
        let targetY = -100;
        let innerX = -100;
        let innerY = -100;
        let outerX = -100;
        let outerY = -100;
        let hovering = false;
        let pressed = false;
        let visible = false;
        let initialized = false;
        let frame = 0;

        const setVisible = (next: boolean) => {
            if (visible === next) return;
            visible = next;
            inner.style.opacity = next ? "1" : "0";
            outer.style.opacity = next ? "1" : "0";
        };

        const render = () => {
            frame = 0;

            innerX += (targetX - innerX) * 0.35;
            innerY += (targetY - innerY) * 0.35;
            outerX += (targetX - outerX) * 0.16;
            outerY += (targetY - outerY) * 0.16;

            const innerScale = pressed ? 0.75 : hovering ? 1.35 : 1;
            const outerScale = pressed ? 1.1 : hovering ? 1.25 : 1;

            inner.style.transform = `translate3d(${innerX}px, ${innerY}px, 0) translate(-50%, -50%) scale(${innerScale})`;
            outer.style.transform = `translate3d(${outerX}px, ${outerY}px, 0) translate(-50%, -50%) scale(${outerScale})`;

            const settled =
                Math.abs(targetX - innerX) < 0.1 &&
                Math.abs(targetY - innerY) < 0.1 &&
                Math.abs(targetX - outerX) < 0.1 &&
                Math.abs(targetY - outerY) < 0.1;

            if (!settled) frame = requestAnimationFrame(render);
        };

        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(render);
        };

        const onMove = (event: MouseEvent) => {
            targetX = event.clientX;
            targetY = event.clientY;

            if (!initialized) {
                initialized = true;
                innerX = outerX = targetX;
                innerY = outerY = targetY;
            }

            const target = event.target instanceof Element ? event.target : null;
            hovering = Boolean(target?.closest(INTERACTIVE));
            setVisible(true);
            schedule();
        };

        const onDown = () => {
            pressed = true;
            schedule();
        };

        const onUp = () => {
            pressed = false;
            schedule();
        };

        const onLeave = () => setVisible(false);

        const onVisibilityChange = () => {
            if (document.hidden) setVisible(false);
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("mousedown", onDown, { passive: true });
        window.addEventListener("mouseup", onUp, { passive: true });
        window.addEventListener("blur", onLeave);
        document.documentElement.addEventListener("mouseleave", onLeave);
        document.addEventListener("visibilitychange", onVisibilityChange);

        return () => {
            if (frame) cancelAnimationFrame(frame);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mousedown", onDown);
            window.removeEventListener("mouseup", onUp);
            window.removeEventListener("blur", onLeave);
            document.documentElement.removeEventListener("mouseleave", onLeave);
            document.removeEventListener("visibilitychange", onVisibilityChange);
        };
    }, []);

    return (
        <div className="cursor-tracker pointer-events-none fixed inset-0 z-[90]" aria-hidden>
            <div
                ref={outerRef}
                className="fixed left-0 top-0 size-10 rounded-full border border-white/20 opacity-0 mix-blend-difference transition-opacity duration-300 will-change-transform"
            />
            <div
                ref={innerRef}
                className="fixed left-0 top-0 size-5 rounded-full border border-white/50 bg-white/[0.06] opacity-0 mix-blend-difference transition-opacity duration-300 will-change-transform"
            />
        </div>
    );
}
