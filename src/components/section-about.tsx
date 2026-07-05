export function SectionAbout() {
  return (
    <section className="mx-auto w-full max-w-2xl px-6 py-24 md:py-32">
      <p className="text-sm font-medium uppercase tracking-widest text-accent">
        About
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Hi, I&apos;m depster
      </h2>
      <div className="mt-6 space-y-5 text-base leading-7 text-muted-foreground">
        <p>
          I&apos;m a software developer who likes building small, focused
          tools and interfaces that feel good to use. Most of my time goes
          into web applications — React and TypeScript on the frontend, Node
          and various backends behind them — but I&apos;m happiest when
          I&apos;m tinkering with something just outside my day job: a
          weekend generative-art sketch, a CLI tool that automates some
          annoyance, or a weird little canvas experiment like the one at the
          top of this page.
        </p>
        <p>
          I care about craft: clean type, calm color, and interfaces that
          don&apos;t get in their own way. When I&apos;m not at the keyboard
          I&apos;m usually reading, hiking, or trying to get a synthesizer to
          make a sound I actually like.
        </p>
        <p>
          This site is a running log of what I&apos;m building and a good
          place to reach me if you want to talk shop.
        </p>
      </div>
    </section>
  );
}
