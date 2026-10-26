import React, { PropsWithChildren } from "react";

const ContentFormatter = ({ children }: PropsWithChildren) => {
    return (
        <div
            className="content-formatter"
            dangerouslySetInnerHTML={{ __html: children as string }}
        ></div>
    );
};

export default ContentFormatter;
