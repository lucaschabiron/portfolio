export default function Home() {
  const currently = [
    "learning japanese (to live in 🇯🇵)",
    "working as an intern @aprr",
    "opening my freelance business",
    "building an open-source japanese sentence translation ai quiz",
  ];

  const past = ["graduated from 🇫🇷 engineering school", "interned @sagau"];

  return (
    <div className="container mx-auto lg:w-2xl">
      <main className="flex-col">
        <section>
          <h1 className="font-bold text-xl mb-4">hi i&apos;m lucas 🇫🇷😄</h1>
          <p className="tracking-wider">
            twenty-something software engineer based in france. i&apos;m very
            passioante about building things and i love to learn. <br />
            coding, reading, and watching anime.
          </p>
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
      </main>
    </div>
  );
}
