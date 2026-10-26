import ProjectCard from "./ProjectCard";
import { PROJECTS } from "@core/data/PROJECTS";
import { t } from "@lib/i18n";

const ProjectsList = () => {
    const translate = t("projects");

    return (
        <section aria-label="All projects">
            <div className="container-page py-14">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                        {String(PROJECTS.length).padStart(2, "0")} {translate("count-label")}
                    </p>
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                        {translate("period")}
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    {PROJECTS.map((project) => (
                        <ProjectCard key={project.title} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsList;
