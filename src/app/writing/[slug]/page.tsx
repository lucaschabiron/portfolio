import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post) notFound();

  const dateString = post.date.toISOString().slice(0, 10);

  return (
    <div className="mx-auto w-full max-w-2xl lg:w-1/2 p-6 bg-white dark:bg-zinc-900 rounded shadow-sm dark:shadow-zinc-800">
      <h1 className="text-4xl font-bold mb-2 text-center leading-tight">
        {post.title}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 text-center">
        {dateString}
      </p>
      <article className="prose prose-lg dark:prose-invert mx-auto text-justify">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    </div>
  );
}
