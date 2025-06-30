import Image, { StaticImageData } from "next/image";

interface PhotoGalleryProps {
  images: StaticImageData[];
}

export default function PhotoGallery({ images }: PhotoGalleryProps) {
  return (
    <section className="py-4 flex flex-row space-x-4">
      {images.map((pic, i) => (
        <Image
          key={i}
          src={pic}
          alt="lucas"
          style={{ width: "200px", height: "200px", objectFit: "cover" }}
          className={`rounded-lg ${i === 2 ? "hidden md:block" : ""}`}
        />
      ))}
    </section>
  );
}
