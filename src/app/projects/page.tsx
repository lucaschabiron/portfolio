import { ProjectsList, ProjectsHeader } from "@/components/projects";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="container lg:mx-auto lg:w-2xl p-4">
      <ProjectsHeader />
      <ProjectsList projects={projects} />
    </div>
  );
}
