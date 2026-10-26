export const SITE_URL = "https://sarinavaii.ir";

export function absoluteUrl(path: string) {
    return new URL(path, SITE_URL).toString();
}
