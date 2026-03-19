import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function authorize(req: NextRequest) {
  return req.headers.get("x-admin-key") === process.env.ADMIN_KEY;
}

export async function GET(req: NextRequest) {
  if (!authorize(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const items = await prisma.homepageItem.findMany({ orderBy: { sortOrder: "asc" } });

  const toSection = (section: string) =>
    items
      .filter((i) => i.section === section)
      .map((i) => ({
        id: i.id,
        text: i.text,
        link: i.link,
        linkKey: i.linkKey,
        linkUrl: i.linkUrl,
      }));

  return NextResponse.json({
    currently: toSection("currently"),
    past: toSection("past"),
    random: toSection("random"),
  });
}

export async function PUT(req: NextRequest) {
  if (!authorize(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  await prisma.$transaction(async (tx) => {
    await tx.homepageItem.deleteMany();

    const items: {
      section: string;
      text: string;
      link?: string | null;
      linkKey?: string | null;
      linkUrl?: string | null;
      sortOrder: number;
    }[] = [];

    for (const section of ["currently", "past"] as const) {
      (body[section] || []).forEach(
        (item: { text: string; linkKey?: string; linkUrl?: string }, i: number) => {
          items.push({
            section,
            text: item.text,
            linkKey: item.linkKey || null,
            linkUrl: item.linkUrl || null,
            sortOrder: i,
          });
        }
      );
    }

    (body.random || []).forEach(
      (item: { text: string; link: string }, i: number) => {
        items.push({
          section: "random",
          text: item.text,
          link: item.link,
          sortOrder: i,
        });
      }
    );

    await tx.homepageItem.createMany({ data: items });
  });

  return NextResponse.json({ ok: true });
}
