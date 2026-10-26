import en from "../../messages/en.json";

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const messages = en as unknown as Record<string, Json>;

function lookup(path: string): Json | undefined {
    return path.split(".").reduce<Json | undefined>((acc, part) => {
        if (acc && typeof acc === "object" && !Array.isArray(acc)) {
            return (acc as Record<string, Json>)[part];
        }
        return undefined;
    }, messages);
}

export type Translator = {
    (key: string): string;
    raw<T = unknown>(key: string): T;
};

/** Drop-in replacement for next-intl's `useTranslations` / `getTranslations`. */
export function t(namespace?: string): Translator {
    const resolve = (key: string) => lookup(namespace ? `${namespace}.${key}` : key);

    const translate = ((key: string) => {
        const value = resolve(key);
        if (typeof value !== "string") {
            throw new Error(`Missing message: ${namespace ? `${namespace}.` : ""}${key}`);
        }
        return value;
    }) as Translator;

    translate.raw = <T,>(key: string) => resolve(key) as T;

    return translate;
}

/** Drop-in replacement for next-intl's `getFormatter().dateTime(...)`. */
export function formatDate(value: string | Date, options: Intl.DateTimeFormatOptions) {
    return new Intl.DateTimeFormat("en-US", options).format(new Date(value));
}
