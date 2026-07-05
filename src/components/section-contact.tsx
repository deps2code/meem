import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons";
import type { ContactContent, SiteIdentity } from "@/lib/site-content";

type SectionContactProps = {
  content: ContactContent;
  site: SiteIdentity;
};

export function SectionContact({ content, site }: SectionContactProps) {
  const socialLinks = [
    { name: "GitHub", href: site.social.github, icon: GithubIcon },
    { name: "Twitter", href: site.social.twitter, icon: XIcon },
    { name: "LinkedIn", href: site.social.linkedin, icon: LinkedinIcon },
  ];

  return (
    <section className="mx-auto w-full max-w-2xl px-6 py-24 md:py-32">
      <p className="text-sm font-medium uppercase tracking-widest text-accent">
        {content.eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {content.heading}
      </h2>
      <p className="mt-4 text-base leading-7 text-muted-foreground">
        {content.description}
      </p>
      <a
        href={`mailto:${site.email}`}
        className="mt-6 inline-flex items-center text-lg font-medium text-accent hover:underline"
      >
        {site.email}
      </a>
      <div className="mt-8 flex gap-3">
        {socialLinks.map(({ name, href, icon: Icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
          >
            <Icon className="size-4" />
          </a>
        ))}
      </div>
      <p className="mt-20 text-sm text-muted-foreground">
        © {new Date().getFullYear()} {site.name}. {content.footer}
      </p>
    </section>
  );
}
