import path from "node:path";
import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    turbopack: {
        // Pin the workspace root to this project. Without it Turbopack walks up
        // and picks a stray lockfile in the user's home directory.
        root: path.join(__dirname),
    },
    images: {
        formats: ["image/avif", "image/webp"],
    },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
