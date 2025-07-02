export default function ProjectsHeader() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2">projects</h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
        Here are some of my projects. You can find more on{" "}
        <a
          href="https://www.github.com/lucaschabiron"
          target="_blank"
          rel="noopener noreferrer"
          className=" underline"
        >
          @github/lucaschabiron
        </a>
        .
      </p>
    </>
  );
}
