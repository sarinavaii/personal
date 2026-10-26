import path from "node:path";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
    poweredByHeader: false,
    turbopack: {
        // Pin the workspace root to this project. Without it Turbopack walks up
        // and picks a stray lockfile in the user's home directory.
        root: path.join(__dirname),
    },
    images: {
        formats: ["image/avif", "image/webp"],
        minimumCacheTTL: 2678400, // 31 days
    },
    async redirects() {
        // The site used to be bilingual (/ and /fa, plus /en aliases).
        // Keep the old URLs working instead of 404ing indexed pages.
        return [
            { source: "/en", destination: "/", permanent: true },
            { source: "/en/:path*", destination: "/:path*", permanent: true },
            { source: "/fa", destination: "/", permanent: true },
            { source: "/fa/:path*", destination: "/:path*", permanent: true },
        ];
    },
};

export default nextConfig;
