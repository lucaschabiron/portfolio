import Image from "next/image";
import fs from "fs";
import path from "path";

interface FavoriteItem {
  id: number;
  src: string;
  filename: string;
}

async function getFavoriteImages(): Promise<FavoriteItem[]> {
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

    const images = imageFiles.map((file, index) => ({
      id: index + 1,
      src: `/favourites/images/${file}`,
      filename: file,
    }));

    // Shuffle array to randomize order
    return images.sort(() => Math.random() - 0.5);
  } catch (error) {
    console.error("Error reading favorites directory:", error);
    return [];
  }
}

export default async function FavsPage() {
  const favoriteItems = await getFavoriteImages();

  if (favoriteItems.length === 0) {
    return (
      <div className="container mx-auto max-w-6xl p-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            Things I Love
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            No images found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          Things I Love
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          A random collection of moments and inspirations
        </p>
      </div>

      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
        {favoriteItems.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800 cursor-pointer break-inside-avoid mb-4 w-full inline-block"
          >
            <Image
              src={item.src}
              alt={`Favorite ${item.id}`}
              width={400}
              height={300}
              className="w-full h-auto object-cover block transition-transform"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
