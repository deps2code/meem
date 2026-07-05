import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

const socialLinks = [
  { name: "GitHub", href: siteConfig.social.github, icon: GithubIcon },
  { name: "Twitter", href: siteConfig.social.twitter, icon: XIcon },
  { name: "LinkedIn", href: siteConfig.social.linkedin, icon: LinkedinIcon },
];

export function SectionContact() {
  return (
    <section className="mx-auto w-full max-w-2xl px-6 py-24 md:py-32">
      <p className="text-sm font-medium uppercase tracking-widest text-accent">
        Contact
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Let&apos;s talk
      </h2>
      <p className="mt-4 text-base leading-7 text-muted-foreground">
        Have a project, a question, or just want to say hi? My inbox is
        always open.
      </p>
      <a
        href={`mailto:${siteConfig.email}`}
        className="mt-6 inline-flex items-center text-lg font-medium text-accent hover:underline"
      >
        {siteConfig.email}
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
        © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js
        and Tailwind CSS.
      </p>
    </section>
  );
}
