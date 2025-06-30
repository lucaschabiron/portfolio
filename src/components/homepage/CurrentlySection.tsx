import LinkedText from "@/components/global/LinkedText";

interface CurrentlyItem {
  text: string;
  links?: Record<string, string>;
}

interface CurrentlySectionProps {
  items: CurrentlyItem[];
}

export default function CurrentlySection({ items }: CurrentlySectionProps) {
  return (
    <section>
      <h2 className="font-bold text-lg mt-8 mb-4">currently</h2>
      {items.map((item, i) => (
        <div key={i} className="mb-2">
          <h3 className="font-light text-gray-500 font-mono">0{i + 1}</h3>
          <LinkedText text={item.text} links={item.links} />
        </div>
      ))}
    </section>
  );
}
