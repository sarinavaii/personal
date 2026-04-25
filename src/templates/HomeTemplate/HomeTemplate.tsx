import { About, Blogs, Hero } from "@organisms/home";
import React from "react";

const HomeTemplate = () => {
    return (
        <>
            <Hero />
            <Blogs />
            <About />
        </>
    );
};

export default HomeTemplate;
