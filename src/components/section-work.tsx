const projects = [
  {
    name: "Fieldnote",
    description:
      "A minimal, offline-first note-taking app for capturing quick thoughts on the go, with local-first sync and full-text search.",
    tags: ["TypeScript", "React", "IndexedDB"],
    href: "#",
  },
  {
    name: "Driftboard",
    description:
      "A lightweight kanban board for small teams, built around keyboard-first navigation and real-time collaboration without the bloat of larger PM tools.",
    tags: ["Next.js", "WebSockets", "Postgres"],
    href: "#",
  },
  {
    name: "Palette",
    description:
      "A color-palette generator and contrast checker for designers, exporting directly to CSS variables and Tailwind config.",
    tags: ["TypeScript", "Canvas API", "Tailwind"],
    href: "#",
  },
];

export function SectionWork() {
  return (
    <section className="mx-auto w-full max-w-2xl px-6 py-24 md:py-32">
      <p className="text-sm font-medium uppercase tracking-widest text-accent">
        Work
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Selected Work
      </h2>
      <p className="mt-4 text-base leading-7 text-muted-foreground">
        A few things I&apos;ve built recently — mostly small tools I wanted
        for myself first.
      </p>
      <ul className="mt-10 divide-y divide-border border-t border-border">
        {projects.map((project) => (
          <li key={project.name} className="py-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                {project.name}
              </h3>
              <a
                href={project.href}
                className="text-sm font-medium text-accent hover:underline"
              >
                View project →
              </a>
            </div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {project.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
