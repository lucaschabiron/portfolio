interface PastSectionProps {
  items: string[];
}

export default function PastSection({ items }: PastSectionProps) {
  return (
    <section>
      <h2 className="font-bold text-lg mt-8 mb-4">past</h2>
      {items.map((item, i) => (
        <div key={i} className="mb-2">
          <h3 className="font-light text-gray-500 font-mono">0{i + 1}</h3>
          <p>{item}</p>
        </div>
      ))}
    </section>
  );
}
