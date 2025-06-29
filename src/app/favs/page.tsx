"use client";

import { useEffect, useState } from "react";
import {
  FavoriteGrid,
  FavoriteHeader,
  LoadingState,
  getFavoriteImages,
  shuffleArray,
  type FavoriteItemType,
} from "@/components/favs";

export default function FavsPage() {
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      try {
        const images = await getFavoriteImages();
        const items = images.map((filename, index) => ({
          id: index + 1,
          src: `/favourites/images/${filename}`,
          filename,
        }));
        
        setFavoriteItems(shuffleArray(items));
      } catch (error) {
        console.error('Failed to load favorite images:', error);
        setFavoriteItems([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadFavorites();
  }, []);

  if (isLoading) {
    return <LoadingState />;
  }

  if (favoriteItems.length === 0) {
    return (
      <div className="container mx-auto max-w-6xl p-4">
        <FavoriteHeader title="favorites" description="No images found in the favorites directory." />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl p-4">
      <FavoriteHeader />
      <FavoriteGrid items={favoriteItems} />
    </div>
  );
}
