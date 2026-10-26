"use client";

import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { useSyncExternalStore } from "react";

type Theme = "dark" | "light";

const THEME_EVENT = "themechange";

function getSnapshot(): Theme {
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function getServerSnapshot(): Theme {
    return "dark";
}

function applyTheme(theme: Theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
}

function subscribe(onChange: () => void) {
    const onStorage = (event: StorageEvent) => {
        if (event.key !== "theme") return;

        applyTheme(event.newValue === "light" ? "light" : "dark");
        onChange();
    };

    window.addEventListener(THEME_EVENT, onChange);
    window.addEventListener("storage", onStorage);

    return () => {
        window.removeEventListener(THEME_EVENT, onChange);
        window.removeEventListener("storage", onStorage);
    };
}

export default function ThemeToggle() {
    const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    const toggleTheme = () => {
        const next: Theme = theme === "dark" ? "light" : "dark";

        applyTheme(next);

        try {
            localStorage.setItem("theme", next);
        } catch {
            // Storage can be unavailable in private mode; the theme still applies.
        }

        window.dispatchEvent(new Event(THEME_EVENT));
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            className="group grid size-9 place-items-center rounded-md border border-border text-muted transition-[color,background-color,border-color,transform] duration-200 hover:scale-105 hover:border-border-strong hover:bg-surface hover:text-foreground active:scale-95"
        >
            <span className="transition-transform duration-300 group-hover:rotate-12">
                {theme === "dark" ? <IconSun size={16} aria-hidden /> : <IconMoonStars size={16} aria-hidden />}
            </span>
        </button>
    );
}
