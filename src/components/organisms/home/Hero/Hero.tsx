import XSection from "@atoms/XSection";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Hero = () => {
    const t = useTranslations();
    return (
        <XSection transparent className="mt-8">
            <div className="flex justify-center items-center gap-4">
                <Image
                    className="rounded-full sm:w-24 w-20"
                    src="/images/profile.jpg"
                    alt={t("common.site-name")}
                    width={192}
                    height={192}
                    sizes="(min-width: 640px) 96px, 80px"
                    priority
                />
                <h2 className="sm:text-2xl text-lg">
                    <span className="text-woodsmoke-500 font-bold">{t("home.hero.tagline-1")}</span>
                    <br /> {t("home.hero.tagline-2")}
                </h2>
            </div>
            <p className="text-center max-w-xl mx-auto mt-6">{t("home.hero.description")}</p>
        </XSection>
    );
};

export default Hero;
