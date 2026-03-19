import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function authorize(req: NextRequest) {
  return req.headers.get("x-admin-key") === process.env.ADMIN_KEY;
}

export async function GET(req: NextRequest) {
  if (!authorize(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const projects = await prisma.project.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  if (!authorize(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await req.json();
  const maxOrder = await prisma.project.aggregate({ _max: { sortOrder: true } });
  await prisma.project.create({
    data: { ...data, sortOrder: (maxOrder._max.sortOrder ?? -1) + 1 },
  });
  return NextResponse.json({ ok: true });
}

export async function PUT(req: NextRequest) {
  if (!authorize(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...data } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await prisma.project.update({ where: { id }, data });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!authorize(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
