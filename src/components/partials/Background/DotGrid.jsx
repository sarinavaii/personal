"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const TAU = Math.PI * 2;
const DPR_CAP = 2;
// Upper bound for the number of dots we are willing to keep in memory. On very
// large viewports the gap grows a little so the array stays bounded.
const MAX_DOTS = 9000;
// Per-canvas backing-store budget (device pixels). Keeps a full-screen canvas
// pair around ~17 MB each instead of ballooning on 4K-ish viewports.
const MAX_CANVAS_PIXELS = 4200000;
// Hard ceiling for a single dot displacement, so a fast flick or a click can
// never launch a dot off into the void.
const MAX_PUSH = 200;

const clamp = (value, min, max) => (value < min ? min : value > max ? max : value);

function hexToRgb(hex) {
    const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (!m) return { r: 0, g: 0, b: 0 };
    return {
        r: parseInt(m[1], 16),
        g: parseInt(m[2], 16),
        b: parseInt(m[3], 16),
    };
}

// devicePixelRatio capped at 2, and further reduced for very large viewports.
function resolveDpr(width, height) {
    const raw = Math.min(DPR_CAP, window.devicePixelRatio || 1);
    const area = Math.max(1, width * height);
    return Math.max(1, Math.min(raw, Math.sqrt(MAX_CANVAS_PIXELS / area)));
}

const DotGrid = ({
    dotSize = 16,
    gap = 32,
    baseColor = "#5227FF",
    activeColor = "#5227FF",
    proximity = 150,
    speedTrigger = 100,
    shockRadius = 250,
    shockStrength = 5,
    maxSpeed = 5000,
    resistance = 750,
    returnDuration = 1.5,
    className = "",
    style,
    opacity = 1,
}) => {
    const wrapperRef = useRef(null);
    const canvasRef = useRef(null);
    // The canvas is only created once the browser is idle, so the grid never
    // competes with hydration or the LCP paint.
    const [mounted, setMounted] = useState(false);

    const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
    const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

    useEffect(() => {
        let idleId = null;
        let timeoutId = null;
        if (typeof window.requestIdleCallback === "function") {
            idleId = window.requestIdleCallback(() => setMounted(true), { timeout: 800 });
        } else {
            timeoutId = window.setTimeout(() => setMounted(true), 200);
        }
        return () => {
            if (idleId !== null && typeof window.cancelIdleCallback === "function") {
                window.cancelIdleCallback(idleId);
            }
            if (timeoutId !== null) window.clearTimeout(timeoutId);
        };
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const canvas = canvasRef.current;
        const wrap = wrapperRef.current;
        if (!canvas || !wrap) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
        const interactive = !reducedMotion && !coarsePointer;

        const proxSq = proximity * proximity;
        const { r: baseR, g: baseG, b: baseB } = baseRgb;
        const { r: activeR, g: activeG, b: activeB } = activeRgb;

        // Spring used for both the outward push and the return to rest.
        // `returnDuration` sets the settle time, `resistance` the damping.
        const omega = 13.5 / Math.max(0.2, returnDuration);
        const zeta = clamp(375 / Math.max(1, resistance), 0.25, 0.85);
        const damping = 2 * zeta * omega;
        const stiffness = omega * omega;
        const pushCooldown = 320;

        const geom = {
            width: 0,
            height: 0,
            dpr: 1,
            cols: 0,
            rows: 0,
            cell: 0,
            startX: 0,
            startY: 0,
        };

        let dots = [];
        let baseCanvas = null;
        let rafId = null;
        let lastTs = 0;
        let frameId = 0;
        let prevRect = null;
        let resizeTimer = null;

        const moving = new Set();
        const pointer = {
            x: -1e4,
            y: -1e4,
            inside: false,
            dirty: false,
            lastX: 0,
            lastY: 0,
            lastTime: 0,
        };

        // Paints the static grid once into an offscreen canvas. Everything the
        // animation loop does is a small drawImage restore + the handful of dots
        // that actually changed.
        const buildGrid = () => {
            const rect = wrap.getBoundingClientRect();
            const width = Math.round(rect.width);
            const height = Math.round(rect.height);
            if (width < 2 || height < 2) return;

            const dpr = resolveDpr(width, height);
            const pixelW = Math.max(2, Math.round(width * dpr));
            const pixelH = Math.max(2, Math.round(height * dpr));

            canvas.width = pixelW;
            canvas.height = pixelH;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            const off = baseCanvas ?? document.createElement("canvas");
            off.width = pixelW;
            off.height = pixelH;
            const offCtx = off.getContext("2d");
            if (!offCtx) return;

            // Touch devices get a sparser, non-interactive grid.
            let effectiveGap = coarsePointer ? Math.round(gap * 1.5) : gap;
            const dotBudget = coarsePointer ? 3500 : MAX_DOTS;
            let cell = dotSize + effectiveGap;
            while (
                cell > dotSize &&
                (width / cell) * (height / cell) > dotBudget
            ) {
                effectiveGap = Math.round(effectiveGap * 1.3) || effectiveGap + 1;
                cell = dotSize + effectiveGap;
            }

            const cols = Math.max(1, Math.floor((width + effectiveGap) / cell));
            const rows = Math.max(1, Math.floor((height + effectiveGap) / cell));
            const gridW = cell * cols - effectiveGap;
            const gridH = cell * rows - effectiveGap;
            const startX = (width - gridW) / 2 + dotSize / 2;
            const startY = (height - gridH) / 2 + dotSize / 2;

            offCtx.setTransform(1, 0, 0, 1, 0, 0);
            offCtx.clearRect(0, 0, pixelW, pixelH);
            offCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
            offCtx.fillStyle = baseColor;

            const radius = dotSize / 2;
            const nextDots = [];
            offCtx.beginPath();
            for (let row = 0; row < rows; row++) {
                const cy = startY + row * cell;
                for (let col = 0; col < cols; col++) {
                    const cx = startX + col * cell;
                    offCtx.moveTo(cx + radius, cy);
                    offCtx.arc(cx, cy, radius, 0, TAU);
                    nextDots.push({
                        cx,
                        cy,
                        ox: 0,
                        oy: 0,
                        vx: 0,
                        vy: 0,
                        _frame: 0,
                        _pushedAt: 0,
                    });
                }
            }
            offCtx.fill();

            geom.width = width;
            geom.height = height;
            geom.dpr = dpr;
            geom.cols = cols;
            geom.rows = rows;
            geom.cell = cell;
            geom.startX = startX;
            geom.startY = startY;

            dots = nextDots;
            baseCanvas = off;

            moving.clear();
            prevRect = null;
            lastTs = 0;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(off, 0, 0, width, height);
        };

        // Puts the untouched base pixels back for the region the previous frame
        // painted over. One blit instead of a full 4000-dot repaint.
        const restoreRect = (rect) => {
            if (!baseCanvas) return;
            const x0 = Math.max(0, Math.floor(rect.x));
            const y0 = Math.max(0, Math.floor(rect.y));
            const x1 = Math.min(geom.width, Math.ceil(rect.x + rect.w) + 1);
            const y1 = Math.min(geom.height, Math.ceil(rect.y + rect.h) + 1);
            const w = x1 - x0;
            const h = y1 - y0;
            if (w <= 0 || h <= 0) return;
            ctx.clearRect(x0, y0, w, h);
            ctx.drawImage(
                baseCanvas,
                x0 * geom.dpr,
                y0 * geom.dpr,
                w * geom.dpr,
                h * geom.dpr,
                x0,
                y0,
                w,
                h,
            );
        };

        const colorFor = (dot) => {
            if (!pointer.inside) return baseColor;
            const dx = dot.cx - pointer.x;
            const dy = dot.cy - pointer.y;
            const dsq = dx * dx + dy * dy;
            if (dsq >= proxSq) return baseColor;
            const t = 1 - Math.sqrt(dsq) / proximity;
            const r = Math.round(baseR + (activeR - baseR) * t);
            const g = Math.round(baseG + (activeG - baseG) * t);
            const b = Math.round(baseB + (activeB - baseB) * t);
            return `rgb(${r},${g},${b})`;
        };

        const frame = (now) => {
            rafId = null;
            if (document.hidden || !baseCanvas || geom.width === 0) {
                lastTs = 0;
                return;
            }

            const dt = lastTs ? clamp((now - lastTs) / 1000, 0.008, 0.05) : 1 / 60;
            lastTs = now;
            const id = ++frameId;

            if (prevRect) {
                restoreRect(prevRect);
                prevRect = null;
            }

            // Self-contained spring: integrate the displaced dots only.
            for (const dot of moving) {
                dot.vx += (-stiffness * dot.ox - damping * dot.vx) * dt;
                dot.vy += (-stiffness * dot.oy - damping * dot.vy) * dt;
                dot.ox += dot.vx * dt;
                dot.oy += dot.vy * dt;

                const offset = Math.hypot(dot.ox, dot.oy);
                if (offset > MAX_PUSH) {
                    const scale = MAX_PUSH / offset;
                    dot.ox *= scale;
                    dot.oy *= scale;
                }

                if (
                    Math.abs(dot.ox) < 0.03 &&
                    Math.abs(dot.oy) < 0.03 &&
                    Math.abs(dot.vx) < 0.6 &&
                    Math.abs(dot.vy) < 0.6
                ) {
                    dot.ox = 0;
                    dot.oy = 0;
                    dot.vx = 0;
                    dot.vy = 0;
                    moving.delete(dot);
                }
            }

            let minX = Infinity;
            let minY = Infinity;
            let maxX = -Infinity;
            let maxY = -Infinity;
            const radius = dotSize / 2;
            const pending = [];
            const restSpots = [];

            const collect = (dot) => {
                if (dot._frame === id) return;
                dot._frame = id;

                const x = dot.cx + dot.ox;
                const y = dot.cy + dot.oy;
                const color = colorFor(dot);
                const displaced = dot.ox !== 0 || dot.oy !== 0;

                // At rest and back to its base colour the offscreen layer is
                // already correct, so there is nothing to draw.
                if (!displaced && color === baseColor) return;

                if (displaced) restSpots.push(dot);
                pending.push({ x, y, color });

                // The dirty rect has to cover both the painted dot and the base
                // dot underneath it, otherwise the rest position would show
                // through as a trail.
                const lo = Math.min(dot.cx, x) - radius;
                const hi = Math.max(dot.cx, x) + radius;
                const top = Math.min(dot.cy, y) - radius;
                const bottom = Math.max(dot.cy, y) + radius;
                if (lo < minX) minX = lo;
                if (top < minY) minY = top;
                if (hi > maxX) maxX = hi;
                if (bottom > maxY) maxY = bottom;
            };

            if (pointer.inside && geom.cols > 0) {
                // Only the grid cells inside the proximity radius are considered.
                const c0 = Math.max(0, Math.floor((pointer.x - proximity - geom.startX) / geom.cell));
                const c1 = Math.min(
                    geom.cols - 1,
                    Math.ceil((pointer.x + proximity - geom.startX) / geom.cell),
                );
                const r0 = Math.max(0, Math.floor((pointer.y - proximity - geom.startY) / geom.cell));
                const r1 = Math.min(
                    geom.rows - 1,
                    Math.ceil((pointer.y + proximity - geom.startY) / geom.cell),
                );
                for (let row = r0; row <= r1; row++) {
                    const rowStart = row * geom.cols;
                    for (let col = c0; col <= c1; col++) {
                        collect(dots[rowStart + col]);
                    }
                }
            }

            for (const dot of moving) collect(dot);

            // Erase the base dot at the rest position of every displaced dot
            // first, then paint the moved dots on top. `clearRect` is only ever
            // the size of a single dot.
            const clearPad = radius + 1;
            for (const dot of restSpots) {
                ctx.clearRect(dot.cx - clearPad, dot.cy - clearPad, radius * 2 + 2, radius * 2 + 2);
            }

            let lastColor = "";
            for (const item of pending) {
                if (item.color !== lastColor) {
                    ctx.fillStyle = item.color;
                    lastColor = item.color;
                }
                ctx.beginPath();
                ctx.arc(item.x, item.y, radius, 0, TAU);
                ctx.fill();
            }

            if (minX !== Infinity) {
                prevRect = { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
            }

            const keepRunning = moving.size > 0 || pointer.dirty;
            pointer.dirty = false;
            if (keepRunning) {
                rafId = requestAnimationFrame(frame);
            } else {
                // Nothing is moving and the pointer is idle: no more frames.
                lastTs = 0;
            }
        };

        const requestRun = () => {
            if (!interactive || rafId !== null || !baseCanvas) return;
            rafId = requestAnimationFrame(frame);
        };

        const kick = (dot, dx, dy, now) => {
            // Initial velocity chosen so the spring peaks near the requested
            // displacement, then settles back to zero within returnDuration.
            dot.vx = clamp(dx, -MAX_PUSH, MAX_PUSH) * omega * 1.6;
            dot.vy = clamp(dy, -MAX_PUSH, MAX_PUSH) * omega * 1.6;
            dot._pushedAt = now;
            moving.add(dot);
        };

        const cellsInRange = (cx, cy, range) => {
            const c0 = Math.max(0, Math.floor((cx - range - geom.startX) / geom.cell));
            const c1 = Math.min(geom.cols - 1, Math.ceil((cx + range - geom.startX) / geom.cell));
            const r0 = Math.max(0, Math.floor((cy - range - geom.startY) / geom.cell));
            const r1 = Math.min(geom.rows - 1, Math.ceil((cy + range - geom.startY) / geom.cell));
            return { c0, c1, r0, r1 };
        };

        const onPointerMove = (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
            const now = performance.now();

            if (!pointer.lastTime) {
                pointer.lastTime = now;
                pointer.lastX = event.clientX;
                pointer.lastY = event.clientY;
                pointer.x = x;
                pointer.y = y;
                pointer.inside = inside;
                pointer.dirty = true;
                requestRun();
                return;
            }

            const elapsed = Math.max(1, now - pointer.lastTime);
            let vx = ((event.clientX - pointer.lastX) / elapsed) * 1000;
            let vy = ((event.clientY - pointer.lastY) / elapsed) * 1000;
            let speed = Math.hypot(vx, vy);
            if (speed > maxSpeed) {
                const scale = maxSpeed / speed;
                vx *= scale;
                vy *= scale;
                speed = maxSpeed;
            }

            pointer.lastTime = now;
            pointer.lastX = event.clientX;
            pointer.lastY = event.clientY;
            pointer.x = x;
            pointer.y = y;
            pointer.inside = inside;
            pointer.dirty = true;

            if (inside && speed > speedTrigger && geom.cols > 0) {
                const { c0, c1, r0, r1 } = cellsInRange(x, y, proximity);
                for (let row = r0; row <= r1; row++) {
                    const rowStart = row * geom.cols;
                    for (let col = c0; col <= c1; col++) {
                        const dot = dots[rowStart + col];
                        const dist = Math.hypot(dot.cx - x, dot.cy - y);
                        if (dist >= proximity) continue;
                        if (now - dot._pushedAt < pushCooldown) continue;
                        kick(dot, dot.cx - x + vx * 0.005, dot.cy - y + vy * 0.005, now);
                    }
                }
            }

            requestRun();
        };

        const onClick = (event) => {
            const rect = canvas.getBoundingClientRect();
            const cx = event.clientX - rect.left;
            const cy = event.clientY - rect.top;
            if (cx < 0 || cy < 0 || cx > rect.width || cy > rect.height) return;
            if (geom.cols === 0) return;

            const now = performance.now();
            const { c0, c1, r0, r1 } = cellsInRange(cx, cy, shockRadius);
            for (let row = r0; row <= r1; row++) {
                const rowStart = row * geom.cols;
                for (let col = c0; col <= c1; col++) {
                    const dot = dots[rowStart + col];
                    const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
                    if (dist >= shockRadius) continue;
                    if (now - dot._pushedAt < pushCooldown) continue;
                    const strength = shockStrength * (1 - dist / shockRadius);
                    kick(dot, (dot.cx - cx) * strength, (dot.cy - cy) * strength, now);
                }
            }

            requestRun();
        };

        const onVisibilityChange = () => {
            if (document.hidden) {
                if (rafId !== null) {
                    cancelAnimationFrame(rafId);
                    rafId = null;
                }
                lastTs = 0;
                return;
            }
            if (moving.size > 0 || pointer.dirty) requestRun();
        };

        const scheduleRebuild = () => {
            if (resizeTimer !== null) window.clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(() => {
                resizeTimer = null;
                const rect = wrap.getBoundingClientRect();
                const width = Math.round(rect.width);
                const height = Math.round(rect.height);
                if (width < 2 || height < 2) return;
                // ResizeObserver also reports the initial observation; skip work
                // when nothing about the surface actually changed.
                if (
                    width === geom.width &&
                    height === geom.height &&
                    Math.abs(resolveDpr(width, height) - geom.dpr) < 0.01
                ) {
                    return;
                }
                if (rafId !== null) {
                    cancelAnimationFrame(rafId);
                    rafId = null;
                }
                buildGrid();
                if (interactive && pointer.inside) {
                    pointer.dirty = true;
                    requestRun();
                }
            }, 120);
        };

        buildGrid();

        let resizeObserver = null;
        if ("ResizeObserver" in window) {
            resizeObserver = new ResizeObserver(scheduleRebuild);
            resizeObserver.observe(wrap);
        } else {
            window.addEventListener("resize", scheduleRebuild);
        }

        if (interactive) {
            window.addEventListener("mousemove", onPointerMove, { passive: true });
            window.addEventListener("click", onClick);
            document.addEventListener("visibilitychange", onVisibilityChange);
        }

        return () => {
            if (rafId !== null) cancelAnimationFrame(rafId);
            if (resizeTimer !== null) window.clearTimeout(resizeTimer);
            if (resizeObserver) resizeObserver.disconnect();
            else window.removeEventListener("resize", scheduleRebuild);
            window.removeEventListener("mousemove", onPointerMove);
            window.removeEventListener("click", onClick);
            document.removeEventListener("visibilitychange", onVisibilityChange);
            moving.clear();
            dots = [];
            baseCanvas = null;
            prevRect = null;
        };
    }, [
        mounted,
        dotSize,
        gap,
        baseColor,
        activeColor,
        baseRgb,
        activeRgb,
        proximity,
        speedTrigger,
        shockRadius,
        shockStrength,
        maxSpeed,
        resistance,
        returnDuration,
    ]);

    return (
        <section className={`flex items-center justify-center h-full w-full relative ${className}`} style={style}>
            <div ref={wrapperRef} className="w-full h-full relative">
                {mounted ? (
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        style={{ opacity }}
                    />
                ) : null}
            </div>
        </section>
    );
};

export default DotGrid;
