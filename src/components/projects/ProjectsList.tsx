import ProjectCard from "./ProjectCard";

interface Project {
  title: string;
  description: string;
  status: string;
  tags: string[];
  link: string;
}

interface ProjectsListProps {
  projects: Project[];
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <div className="space-y-8">
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
}
