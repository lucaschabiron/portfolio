"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FixedLogo() {
  const [scrollY, setScrollY] = useState(0);

  const maxScroll = 300;
  const f = Math.min(1, scrollY / maxScroll);

  const stablePart = "lucas";
  const fadeable = "chabiron".split("");

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const letters = fadeable.map((letter, i) => {
    const reversedIndex = fadeable.length - 1 - i;
    const threshold = (reversedIndex + 1) / (fadeable.length + 1);
    let opacity = 1;
    if (f >= threshold) {
      opacity = 1 - (f - threshold) / (1 - threshold);
      opacity = Math.max(0, Math.min(1, opacity));
    }
    return (
      <span key={i} style={{ opacity, transition: "opacity 0.5s ease-out" }}>
        {letter}
      </span>
    );
  });

  return (
    <div className="hidden absolute md:block lg:fixed top-5 left-5 z-50">
      <Link href="/" className="text-2xl font-bold">
        {stablePart}
        {letters}
      </Link>
    </div>
  );
}
