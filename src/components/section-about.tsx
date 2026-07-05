import type { AboutContent } from "@/lib/site-content";

type SectionAboutProps = {
  content: AboutContent;
};

export function SectionAbout({ content }: SectionAboutProps) {
  return (
    <section className="mx-auto w-full max-w-2xl px-6 py-24 md:py-32">
      <p className="text-sm font-medium uppercase tracking-widest text-accent">
        {content.eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {content.heading}
      </h2>
      <div className="mt-6 space-y-5 text-base leading-7 text-muted-foreground">
        {content.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
