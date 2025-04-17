import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import React from 'react';
import ReactMarkdown from 'react-markdown';

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'src/app/writing/posts');
  const filenames = fs.readdirSync(postsDirectory);
  return filenames
    .filter((name) => name.endsWith('.md'))
    .map((name) => ({ slug: name.replace(/\.md$/, '') }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postPath = path.join(process.cwd(), 'src/app/writing/posts', `${slug}.md`);
  if (!fs.existsSync(postPath)) {
    notFound();
  }
  const fileContents = fs.readFileSync(postPath, 'utf8');
  const { content, data } = matter(fileContents);
  let dateString = '';
  if (data.date instanceof Date) {
    dateString = data.date.toISOString().slice(0, 10);
  } else if (typeof data.date === 'string') {
    dateString = data.date;
  } else if (data.date) {
    dateString = String(data.date);
  }
  return (
    <div className="mx-auto w-full max-w-2xl lg:w-1/2 p-6 bg-white rounded shadow-sm">
      <h1 className="text-4xl font-bold mb-2 text-center leading-tight">{data.title}</h1>
      <p className="text-gray-500 text-sm mb-8 text-center">{dateString}</p>
      <article className="prose prose-lg mx-auto text-justify">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </div>
  );
}
