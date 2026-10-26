import XSection from "@atoms/XSection";
import { t } from "@lib/i18n";
import Image from "next/image";

const Hero = () => {
    const translate = t();
    return (
        <XSection transparent className="mt-8">
            <div className="flex justify-center items-center gap-4">
                <Image
                    className="rounded-full sm:w-24 w-20"
                    src="/images/profile.jpg"
                    alt={translate("common.site-name")}
                    width={192}
                    height={192}
                    sizes="(min-width: 640px) 96px, 80px"
                    priority
                />
                <h1 className="sm:text-2xl text-lg">
                    <span className="text-woodsmoke-500 font-bold">{translate("home.hero.tagline-1")}</span>
                    <br /> {translate("home.hero.tagline-2")}
                </h1>
            </div>
            <p className="text-center max-w-xl mx-auto mt-6">{translate("home.hero.description")}</p>
        </XSection>
    );
};

export default Hero;
