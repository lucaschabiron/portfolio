import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-700 py-4 mt-8 flex flex-col items-center text-sm">
      <div className="flex space-x-4 mb-2">
        <a
          href="https://github.com/lucaschabiron"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline smooth-transition"
        >
          GitHub
        </a>
        <a
          href="mailto:contact@lucaschabiron.com"
          className="hover:underline smooth-transition"
        >
          Email
        </a>
      </div>
      <div className="text-neutral-500 dark:text-neutral-400">
        © {new Date().getFullYear()} lucas chabiron
      </div>
    </footer>
  );
}
