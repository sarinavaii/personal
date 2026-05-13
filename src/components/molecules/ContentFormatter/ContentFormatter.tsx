import React, { PropsWithChildren } from "react";

const ContentFormatter = ({ children }: PropsWithChildren) => {
    return (
        <div
            className="prose dark:prose-invert content-formatter"
            dangerouslySetInnerHTML={{ __html: children as string }}
        ></div>
    );
};

export default ContentFormatter;
