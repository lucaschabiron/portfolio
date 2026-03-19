import lucas from "@/public/lucas.jpeg";
import m from "@/public/m.jpeg";
import kyushu from "@/public/kyushu.jpeg";
import { prisma } from "@/lib/prisma";
import {
  HeroSection,
  PhotoGallery,
  CurrentlySection,
  PastSection,
  RandomSection,
  FavoritesSection,
} from "@/components/homepage";

export const dynamic = "force-dynamic";

export default async function Home() {
  const items = await prisma.homepageItem.findMany({ orderBy: { sortOrder: "asc" } });

  const currently = items
    .filter((i) => i.section === "currently")
    .map((i) => ({
      text: i.text,
      ...(i.linkKey && i.linkUrl ? { links: { [i.linkKey]: i.linkUrl } } : {}),
    }));

  const past = items
    .filter((i) => i.section === "past")
    .map((i) => ({
      text: i.text,
      ...(i.linkKey && i.linkUrl ? { links: { [i.linkKey]: i.linkUrl } } : {}),
    }));

  const random = items
    .filter((i) => i.section === "random")
    .map((i) => ({ text: i.text, link: i.link! }));

  const pics = [lucas, kyushu, m];

  return (
    <div className="container lg:mx-auto lg:w-2xl p-4">
      <main className="flex-col">
        <HeroSection />
        <PhotoGallery images={pics} />
        <CurrentlySection items={currently} />
        <PastSection items={past} />
        <RandomSection items={random} />
        <FavoritesSection />
      </main>
    </div>
  );
}
