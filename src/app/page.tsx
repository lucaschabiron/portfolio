import lucas from "@/public/lucas.jpeg";
import m from "@/public/m.jpeg";
import kyushu from "@/public/kyushu.jpeg";
import homepageData from "@/data/homepage.json";
import {
  HeroSection,
  PhotoGallery,
  CurrentlySection,
  PastSection,
  RandomSection,
  FavoritesSection,
} from "@/components/homepage";

export default function Home() {
  const { currently, past, random } = homepageData;
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
