import Section from "@atoms/Section";
import SSegmentedControl from "@atoms/SegmentedControl";

const About = () => {
    return (
        <Section transparent>
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-center">درباره من</h2>
                <SSegmentedControl
                    fullWidth
                    color="woodsmoke"
                    classNames={{
                        root: "max-w-sm w-full mx-auto",
                    }}
                    data={[
                        {
                            label: "تجربه‌های کاری",
                            value: "work-experience",
                        },
                        {
                            label: "تحصیلات",
                            value: "education",
                        },
                    ]}
                    size="md"
                    radius="md"
                />
            </div>
        </Section>
    );
};

export default About;
