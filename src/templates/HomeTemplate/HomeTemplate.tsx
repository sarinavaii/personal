import { About, Blogs, Hero, ProjectsCTA, TechStack } from "@organisms/home";

const HomeTemplate = () => {
    return (
        <>
            <Hero />
            <TechStack />
            <ProjectsCTA />
            <Blogs />
            <About />
        </>
    );
};

export default HomeTemplate;
