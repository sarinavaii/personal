import XSection from "@atoms/XSection";
import { cn } from "@core/utils";
import { useTranslations } from "next-intl";
import { TECH_STACK_ICONS } from "./techStack.icons";

type TechStackItem = {
    id: string;
    label: string;
};

type TechStackCategory = {
    id: string;
    title: string;
    items: TechStackItem[];
};

const TechStackItemCard = ({ id, label }: TechStackItem) => {
    const config = TECH_STACK_ICONS[id];

    return (
        <li
            className={cn(
                "flex flex-col items-center justify-center gap-2 rounded-xl border border-woodsmoke-200 dark:border-woodsmoke-900",
                "bg-woodsmoke-50 dark:bg-woodsmoke-950 p-3 min-h-[88px]",
                "transition-all duration-300 hover:scale-[1.03] hover:shadow-lg",
                "hover:shadow-woodsmoke-300/30 dark:hover:shadow-woodsmoke-900/40",
            )}
        >
            {config ? (
                <config.Icon
                    size={28}
                    stroke={1.5}
                    className={cn("shrink-0", config.className)}
                    style={config.color ? { color: config.color } : undefined}
                    aria-hidden
                />
            ) : null}
            <span className="text-xs text-center leading-snug text-woodsmoke-700 dark:text-woodsmoke-300">{label}</span>
        </li>
    );
};

const TechStack = () => {
    const t = useTranslations("home.techStack");
    const categories = t.raw("categories") as TechStackCategory[];

    return (
        <XSection transparent withPadding={false}>
            <h2 className="text-2xl font-bold text-center mb-6">{t("title")}</h2>
            <div className="flex flex-col gap-8">
                {categories.map((category) => (
                    <section key={category.id} aria-labelledby={`tech-stack-${category.id}`}>
                        <h3
                            id={`tech-stack-${category.id}`}
                            className="text-sm font-semibold uppercase tracking-wide text-woodsmoke-500 dark:text-woodsmoke-400 mb-3"
                        >
                            {category.title}
                        </h3>
                        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {category.items.map((item) => (
                                <TechStackItemCard key={item.id} {...item} />
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </XSection>
    );
};

export default TechStack;
