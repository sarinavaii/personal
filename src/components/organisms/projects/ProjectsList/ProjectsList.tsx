import ProjectCard from "../ProjectCard/ProjectCard";
import { PROJECTS } from "@core/data/PROJECTS";

const ProjectsList = () => {
    return (
        <div className="flex flex-col gap-4 mb-10">
            {PROJECTS.map((project) => (
                <ProjectCard key={project.title} project={project} />
            ))}
        </div>
    );
};

export default ProjectsList;
