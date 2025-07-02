import { ProjectsList, ProjectsHeader } from "@/components/projects";
import projects from "@/data/projects.json";

export default function ProjectsPage() {
  return (
    <div className="container lg:mx-auto lg:w-2xl p-4">
      <ProjectsHeader />
      <ProjectsList projects={projects} />
    </div>
  );
}
