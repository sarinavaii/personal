import { About, Blogs, Hero, TechStack } from "@organisms/home";

const HomeTemplate = () => {
    return (
        <>
            <Hero />
            <TechStack />
            <Blogs />
            <About />
        </>
    );
};

export default HomeTemplate;
