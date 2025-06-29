import Image from "next/image";
import lucas from "@/public/lucas.jpeg";
import m from "@/public/m.jpeg";
import kyushu from "@/public/kyushu.jpeg";
import Link from "next/link";

export default function Home() {
  const currently = [
    "learning japanese (to live in 🇯🇵)",
    "working as an intern @aprr",
    "opening my freelance business",
    "building @sifter",
  ];

  const pics = [lucas, kyushu, m];

  const past = ["graduated from 🇫🇷 engineering school", "interned @sagau"];

  const random = [
    {
      link: "https://www.youtube.com/watch?v=OZ_Bu4dfeMs",
      text: "The Last Day of High School",
    },
    {
      link: "https://youtu.be/L4XTJao2iLA?si=Nt4Gatb0jBI_TNAH&t=4928",
      text: "Ghibli 25 Years Concert",
    },
    {
      link: "https://www.youtube.com/watch?v=Iwr1aLEDpe4",
      text: "Frieren: Beyond Journey's End",
    },
    {},
  ];

  return (
    <div className="container lg:mx-auto lg:w-2xl p-4">
      <main className="flex-col">
        <section>
          <h1 className="font-bold text-xl mb-4">hi i&apos;m lucas 🇫🇷😄</h1>
          <p className="tracking-wider">
            twenty-something software engineer based in france. i&apos;m very
            passionate about building things and i love to learn. <br />
            right now i&apos;m probably coding, reading, or watching anime.
          </p>
        </section>
        <section className="py-4 flex flex-row space-x-4">
          {pics.map((pic, i) => (
            <Image
              key={i}
              src={pic}
              alt="lucas"
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
              className={`rounded-lg ${i === 2 ? "hidden md:block" : ""}`}
            />
          ))}
        </section>
        <section>
          <h2 className="font-bold text-lg mt-8 mb-4">currently</h2>
          {currently.map((item, i) => (
            <div key={i} className="mb-2">
              <h3 className="font-light text-gray-500 font-mono">0{i + 1}</h3>
              <p>{item}</p>
            </div>
          ))}
        </section>
        <section>
          <h2 className="font-bold text-lg mt-8 mb-4">past</h2>
          {past.map((item, i) => (
            <div key={i} className="mb-2">
              <h3 className="font-light text-gray-500 font-mono">0{i + 1}</h3>
              <p>{item}</p>
            </div>
          ))}
        </section>
        <section>
          <h2 className="font-bold text-lg mt-8 mb-4">random</h2>
          {random.map((item, i) => (
            <div key={i} className="mb-2">
              <a href={item.link} target="_blank">
                {item.text}
              </a>
            </div>
          ))}
        </section>
        <section>
          <h2 className="font-bold text-lg mt-8 mb-4">my favorites</h2>
          <Link href="/favs">click here</Link>
        </section>
      </main>
    </div>
  );
}
