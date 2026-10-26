import type { PropsWithChildren } from "react";

export default function Prose({ children }: PropsWithChildren) {
    return <div className="prose-vercel" dangerouslySetInnerHTML={{ __html: children as string }} />;
}
