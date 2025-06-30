interface RandomItem {
  link: string;
  text: string;
}

interface RandomSectionProps {
  items: RandomItem[];
}

export default function RandomSection({ items }: RandomSectionProps) {
  return (
    <section>
      <h2 className="font-bold text-lg mt-8 mb-4">random</h2>
      {items.map((item, i) => (
        <div key={i} className="mb-2">
          <a href={item.link} target="_blank">
            {item.text}
          </a>
        </div>
      ))}
    </section>
  );
}
