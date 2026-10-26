import type { Metadata } from "next";
import HomeTemplate from "@templates/HomeTemplate";
import { pageMetadata } from "@lib/seo";

export function generateMetadata(): Metadata {
    return pageMetadata({});
}

export default function HomePage() {
    return <HomeTemplate />;
}
