import { About, ContactCTA, FeaturedWork, Hero, LatestPosts, TechStack } from "@sections/home";

const HomeTemplate = () => {
    return (
        <>
            <Hero />
            <FeaturedWork />
            <TechStack />
            <LatestPosts />
            <About />
            <ContactCTA />
        </>
    );
};

export default HomeTemplate;
