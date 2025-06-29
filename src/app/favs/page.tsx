import fs from "fs";
import path from "path";
import {
  FavoriteGrid,
  FavoriteHeader,
  shuffleArray,
  type FavoriteItemType,
} from "@/components/favs";

// Server-side function to get favorite images directly
async function getFavoriteImagesServer(): Promise<string[]> {
  try {
    const favoritesPath = path.join(
      process.cwd(),
      "public",
      "favourites",
      "images"
    );

    if (!fs.existsSync(favoritesPath)) {
      return [];
    }

    const files = fs.readdirSync(favoritesPath);
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];

    const imageFiles = files.filter((file) =>
      imageExtensions.some((ext) => file.toLowerCase().endsWith(ext))
    );

    return imageFiles;
  } catch (error) {
    console.error("Error reading favorites directory:", error);
    return [];
  }
}

export default async function FavsPage() {
  const images = await getFavoriteImagesServer();

  const favoriteItems: FavoriteItemType[] = images.map((filename, index) => ({
    id: index + 1,
    src: `/favourites/images/${filename}`,
    filename,
  }));

  const shuffledItems = shuffleArray(favoriteItems);

  if (shuffledItems.length === 0) {
    return (
      <div className="container mx-auto max-w-6xl p-4">
        <FavoriteHeader
          title="favorites"
          description="No images found in the favorites directory."
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl p-4">
      <FavoriteHeader />
      <FavoriteGrid items={shuffledItems} />
    </div>
  );
}
