import { AboutHero, Recommendations } from "@sections/about";
import { About, ContactCTA } from "@sections/home";
import { t } from "@lib/i18n";

const AboutTemplate = () => {
    const translate = t("about.career");

    return (
        <>
            <AboutHero />
            <Recommendations />
            <About
                id="experience"
                eyebrow={translate("eyebrow")}
                title={translate("title")}
                description={translate("description")}
                showMoreLink={false}
            />
            <ContactCTA />
        </>
    );
};

export default AboutTemplate;
