import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  status: string;
  tags: string[];
  link: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="border-b border-neutral-200 dark:border-neutral-700 pb-6 last:border-b-0">
      <div className="flex gap-4 items-center">
        <Link
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:underline mb-2 block"
        >
          {project.title}
        </Link>
        <Badge variant="default" className="text-xs mb-2">
          {project.status}
        </Badge>
      </div>
      <p className="text-neutral-600 dark:text-neutral-400 mb-3">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag, tagIndex) => (
          <Badge key={tagIndex} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
