import React from "react";

interface LinkedTextProps {
  text: string;
  links?: Record<string, string>;
}

export default function LinkedText({ text, links = {} }: LinkedTextProps) {
  const parts = text.split(/(@\w+)/g);
  return (
    <p>
      {parts.map((part, i) => {
        if (part.startsWith("@") && links[part]) {
          return (
            <a key={i} href={links[part]} target="_blank" rel="noopener noreferrer">
              {part}
            </a>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </p>
  );
}
