import lucas from "@/public/lucas.jpeg";
import m from "@/public/m.jpeg";
import kyushu from "@/public/kyushu.jpeg";
import homepageData from "@/data/homepage.json";

type HomeItem = { text: string; links?: Record<string, string> };
type RandomItem = { link: string; text: string };
interface HomeData {
  currently: HomeItem[];
  past: HomeItem[];
  random: RandomItem[];
}
import {
  HeroSection,
  PhotoGallery,
  CurrentlySection,
  PastSection,
  RandomSection,
  FavoritesSection,
} from "@/components/homepage";

export default function Home() {
  const { currently, past, random } = homepageData as HomeData;
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
