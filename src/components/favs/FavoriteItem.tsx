import Image from "next/image";

interface FavoriteItemProps {
  id: number;
  src: string;
  filename: string;
}

export default function FavoriteItem({ id, src, filename }: FavoriteItemProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800 cursor-pointer break-inside-avoid mb-4 w-full inline-block">
      <Image
        src={src}
        alt={`Favorite ${id}`}
        width={400}
        height={300}
        className="w-full h-auto object-cover block transition-transform"
      />
    </div>
  );
}
