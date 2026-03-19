import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function authorize(req: NextRequest) {
  return req.headers.get("x-admin-key") === process.env.ADMIN_KEY;
}

export async function GET(req: NextRequest) {
  if (!authorize(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const slug = req.nextUrl.searchParams.get("slug");

  if (slug) {
    const post = await prisma.post.findUnique({ where: { slug } });
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(post);
  }

  const posts = await prisma.post.findMany({
    select: { slug: true, title: true, date: true },
    orderBy: { date: "desc" },
  });
  return NextResponse.json(
    posts.map((p) => ({ ...p, date: p.date.toISOString().slice(0, 10) }))
  );
}

export async function POST(req: NextRequest) {
  if (!authorize(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug, title, description, date, content } = await req.json();

  if (!slug || !title || !content) {
    return NextResponse.json({ error: "slug, title, and content required" }, { status: 400 });
  }

  await prisma.post.create({
    data: {
      slug,
      title,
      description: description || "",
      date: new Date(date || new Date()),
      content,
    },
  });
  return NextResponse.json({ ok: true });
}

export async function PUT(req: NextRequest) {
  if (!authorize(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug, title, description, date, content } = await req.json();

  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  await prisma.post.update({
    where: { slug },
    data: {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(date !== undefined && { date: new Date(date) }),
      ...(content !== undefined && { content }),
    },
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!authorize(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await req.json();

  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  await prisma.post.delete({ where: { slug } });
  return NextResponse.json({ ok: true });
}
