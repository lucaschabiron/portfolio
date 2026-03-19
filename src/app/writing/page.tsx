import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function WritingPage() {
  const posts = await prisma.post.findMany({
    select: { slug: true, title: true, date: true },
    orderBy: { date: "desc" },
  });

  return (
    <div className="container lg:mx-auto lg:w-2xl p-4">
      <h1 className="text-3xl font-bold mb-6">writing</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="mb-4">
            <Link
              href={`/writing/${post.slug}`}
              className="text-xl font-semibold text-blue-600 hover:underline"
            >
              {post.title}
            </Link>
            <span className="block text-gray-500 text-xs">
              {post.date.toISOString().slice(0, 10)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
