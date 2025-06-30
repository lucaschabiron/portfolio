import Link from "next/link";

export default function FavoritesSection() {
  return (
    <section>
      <h2 className="font-bold text-lg mt-8 mb-4">my favorites</h2>
      <Link href="/favs">click here</Link>
    </section>
  );
}
