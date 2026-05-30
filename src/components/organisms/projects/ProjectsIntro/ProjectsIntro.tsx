import XSection from "@atoms/XSection";

const ProjectsIntro = () => {
    return (
        <XSection transparent>
            <h1 className="text-3xl text-center font-bold mb-6">My Projects</h1>
            <div className="text-base text-woodsmoke-700 dark:text-woodsmoke-200">
                <p>
                    Over the years, I have had the <b>privilege</b> of contributing to a{" "}
                    <b>diverse range of projects</b> that have challenged and enriched my skills as a developer. My
                    experience spans across:
                </p>
                <ul className="list-disc pl-6 my-4 space-y-1">
                    <li>
                        <b className="text-woodsmoke-900 dark:text-woodsmoke-100">Nationwide platforms</b> supporting{" "}
                        <b>10,000+ users</b>, focusing on <b>scalability</b> and <b>robust performance</b>
                    </li>
                    <li>
                        <b className="text-woodsmoke-900 dark:text-woodsmoke-100">
                            Private Business Intelligence (BI) dashboards
                        </b>{" "}
                        for <b>governmental institutes</b>, emphasizing <b>data security</b> and{" "}
                        <b>insightful analytics</b>
                    </li>
                    <li>
                        <b className="text-woodsmoke-900 dark:text-woodsmoke-100">Public-facing customer websites</b>{" "}
                        where <b>UI/UX</b>, <b>performance</b>, and <b>accessibility</b> were top priorities
                    </li>
                </ul>
                <p>
                    <b className="text-woodsmoke-900 dark:text-woodsmoke-100">Key lessons</b> gained from these projects
                    include the importance of <span className="font-semibold">scalable design</span>,{" "}
                    <span className="font-semibold">clear communication</span>, and always prioritizing the{" "}
                    <span className="font-semibold">end-user experience</span>.
                </p>
            </div>
        </XSection>
    );
};

export default ProjectsIntro;
