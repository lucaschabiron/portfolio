import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

interface PostMeta {
  slug: string;
  title: string;
  date: string;
}

async function getPosts(): Promise<PostMeta[]> {
  const postsDirectory = path.join(process.cwd(), 'src/app/writing/posts');
  const filenames = fs.readdirSync(postsDirectory);
  return filenames
    .filter((name) => name.endsWith('.md'))
    .map((name) => {
      const filePath = path.join(postsDirectory, name);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      let dateString = '';
      if (data.date instanceof Date) {
        dateString = data.date.toISOString().slice(0, 10);
      } else if (typeof data.date === 'string') {
        dateString = data.date;
      } else if (data.date) {
        dateString = String(data.date);
      }
      return {
        slug: name.replace(/\.md$/, ''),
        title: data.title || name,
        date: dateString,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export default async function WritingPage() {
  const posts = await getPosts();
  return (
    <div className="container lg:mx-auto lg:w-2xl p-4">
      <h1 className="text-3xl font-bold mb-6">writing</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="mb-4">
            <Link href={`/writing/${post.slug}`} className="text-xl font-semibold text-blue-600 hover:underline">
              {post.title}
            </Link>
            <span className="block text-gray-500 text-xs">{post.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
