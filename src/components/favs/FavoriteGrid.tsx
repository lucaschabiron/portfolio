import FavoriteItem from "./FavoriteItem";

export interface FavoriteItem {
  id: number;
  src: string;
  filename: string;
}

interface FavoriteGridProps {
  items: FavoriteItem[];
}

export default function FavoriteGrid({ items }: FavoriteGridProps) {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
      {items.map((item) => (
        <FavoriteItem
          key={item.id}
          id={item.id}
          src={item.src}
        />
      ))}
    </div>
  );
}
