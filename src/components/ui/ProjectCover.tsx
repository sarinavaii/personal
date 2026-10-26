import type { Project, ProjectId } from "@core/data/PROJECTS";

type MotifName = "rings" | "planks" | "diamond" | "blocks" | "bars" | "cross";

type CoverTheme = {
    background: string;
    accent: string;
    motif: MotifName;
    mark: string;
};

const THEMES: Record<ProjectId, CoverTheme> = {
    "empire-club": {
        background: "radial-gradient(120% 120% at 85% 0%, #4c0519 0%, #1c0a0e 46%, #080808 100%)",
        accent: "#fb7185",
        motif: "rings",
        mark: "EC",
    },
    deadinv: {
        background: "linear-gradient(135deg, #0b1220 0%, #111827 48%, #1c1917 100%)",
        accent: "#f59e0b",
        motif: "planks",
        mark: "DI",
    },
    platin: {
        background: "radial-gradient(120% 120% at 12% 0%, #1a2e05 0%, #0c1204 52%, #000000 100%)",
        accent: "#a3e635",
        motif: "diamond",
        mark: "P",
    },
    "bonyad-maskan": {
        background: "linear-gradient(135deg, #042f2e 0%, #0b1f2a 52%, #07131a 100%)",
        accent: "#22d3ee",
        motif: "blocks",
        mark: "BM",
    },
    rasad: {
        background: "radial-gradient(120% 120% at 80% 10%, #1e1b4b 0%, #11102a 56%, #05050a 100%)",
        accent: "#a78bfa",
        motif: "bars",
        mark: "R",
    },
    meymed: {
        background: "linear-gradient(135deg, #042f2e 0%, #062a3a 52%, #04141b 100%)",
        accent: "#2dd4bf",
        motif: "cross",
        mark: "M",
    },
};

function Motif({ motif, accent }: { motif: MotifName; accent: string }) {
    switch (motif) {
        case "rings":
            return (
                <svg viewBox="0 0 200 200" fill="none" className="size-full">
                    <circle cx="100" cy="100" r="86" stroke="white" strokeOpacity="0.07" />
                    <circle cx="100" cy="100" r="62" stroke="white" strokeOpacity="0.09" />
                    <circle cx="100" cy="100" r="38" stroke={accent} strokeOpacity="0.75" strokeWidth="1.5" />
                    <circle cx="100" cy="100" r="4" fill={accent} />
                </svg>
            );
        case "planks":
            return (
                <svg viewBox="0 0 200 200" fill="none" className="size-full">
                    <g transform="rotate(-18 100 100)">
                        <rect x="14" y="48" width="172" height="14" rx="3" fill="white" fillOpacity="0.05" />
                        <rect x="14" y="72" width="172" height="14" rx="3" fill="white" fillOpacity="0.09" />
                        <rect x="14" y="96" width="172" height="14" rx="3" fill={accent} fillOpacity="0.8" />
                        <rect x="14" y="120" width="172" height="14" rx="3" fill="white" fillOpacity="0.09" />
                        <rect x="14" y="144" width="172" height="14" rx="3" fill="white" fillOpacity="0.05" />
                    </g>
                </svg>
            );
        case "diamond":
            return (
                <svg viewBox="0 0 200 200" fill="none" className="size-full">
                    <rect
                        x="52"
                        y="52"
                        width="96"
                        height="96"
                        rx="16"
                        transform="rotate(45 100 100)"
                        stroke={accent}
                        strokeOpacity="0.65"
                    />
                    <rect
                        x="72"
                        y="72"
                        width="56"
                        height="56"
                        rx="10"
                        transform="rotate(45 100 100)"
                        fill={accent}
                        fillOpacity="0.12"
                        stroke="white"
                        strokeOpacity="0.1"
                    />
                    <circle cx="100" cy="100" r="4" fill={accent} />
                </svg>
            );
        case "blocks":
            return (
                <svg viewBox="0 0 200 200" fill="none" className="size-full">
                    {Array.from({ length: 9 }, (_, index) => {
                        const column = index % 3;
                        const row = Math.floor(index / 3);
                        const active = index === 4;

                        return (
                            <rect
                                key={index}
                                x={38 + column * 44}
                                y={38 + row * 44}
                                width="30"
                                height="30"
                                rx="6"
                                fill={active ? accent : "white"}
                                fillOpacity={active ? 0.8 : 0.08}
                                stroke={active ? accent : "white"}
                                strokeOpacity={active ? 0.5 : 0.08}
                            />
                        );
                    })}
                </svg>
            );
        case "bars":
            return (
                <svg viewBox="0 0 200 200" fill="none" className="size-full">
                    <rect x="38" y="112" width="18" height="48" rx="3" fill="white" fillOpacity="0.1" />
                    <rect x="68" y="88" width="18" height="72" rx="3" fill="white" fillOpacity="0.16" />
                    <rect x="98" y="60" width="18" height="100" rx="3" fill={accent} fillOpacity="0.75" />
                    <rect x="128" y="98" width="18" height="62" rx="3" fill="white" fillOpacity="0.16" />
                    <rect x="158" y="76" width="18" height="84" rx="3" fill="white" fillOpacity="0.1" />
                    <path
                        d="M47 102 77 78 107 50 137 86 167 64"
                        stroke={accent}
                        strokeOpacity="0.45"
                        strokeWidth="1.5"
                    />
                </svg>
            );
        case "cross":
            return (
                <svg viewBox="0 0 200 200" fill="none" className="size-full">
                    <path d="M86 54h28v26h26v28h-26v26H86v-26H60V80h26z" fill={accent} fillOpacity="0.75" />
                    <path d="M146 132h16v12h12v16h-12v12h-16v-12h-12v-16h12z" fill="white" fillOpacity="0.12" />
                    <circle cx="52" cy="64" r="18" stroke="white" strokeOpacity="0.12" />
                </svg>
            );
    }
}

function domainOf(url: string) {
    return new URL(url).host.replace(/^www\./, "");
}

export default function ProjectCover({ project }: { project: Project }) {
    const theme = THEMES[project.id];

    return (
        <div
            className="relative aspect-[16/10] w-full overflow-hidden border-b border-border"
            style={{ background: theme.background }}
            aria-hidden
        >
            <div className="pointer-events-none absolute inset-0">
                <div
                    className="absolute -right-16 -top-20 size-64 rounded-full opacity-25 blur-3xl"
                    style={{ backgroundColor: theme.accent }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.55),transparent_55%)]" />
                <div className="absolute -right-10 -top-10 size-64 opacity-80 transition-transform duration-500 group-hover:scale-105">
                    <Motif motif={theme.motif} accent={theme.accent} />
                </div>
            </div>

            <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-5">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/15 bg-white/5 font-mono text-[11px] font-semibold tracking-wide text-white backdrop-blur-sm">
                    {theme.mark}
                </span>
                <span className="pt-0.5 text-right font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-white/55">
                    {project.category}
                </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                <span className="truncate font-mono text-[10px] tracking-wide text-white/60">
                    {domainOf(project.website)}
                </span>
            </div>
        </div>
    );
}
