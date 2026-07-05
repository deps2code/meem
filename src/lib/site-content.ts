export type SocialLinks = {
  github: string;
  twitter: string;
  linkedin: string;
};

export type SiteIdentity = {
  name: string;
  email: string;
  social: SocialLinks;
};

export type HeroContent = {
  title: string;
  instruction: string;
};

export type AboutContent = {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
};

export type MusicContent = {
  eyebrow: string;
  quote: string;
  byline: string;
  ctaLabel: string;
  ctaHref: string;
  trackTitle: string;
  artist: string;
  album: string;
  spotifyHref: string;
  elapsed: string;
  duration: string;
  progressPercent: number;
  playlistTitleLines: string[];
  previewLabel: string;
  saveLabel: string;
};

export type ProjectContent = {
  name: string;
  description: string;
  tags: string[];
  href: string;
};

export type WorkContent = {
  eyebrow: string;
  heading: string;
  description: string;
  projects: ProjectContent[];
};

export type ContactContent = {
  eyebrow: string;
  heading: string;
  description: string;
  footer: string;
};

export type SiteContent = {
  site: SiteIdentity;
  hero: HeroContent;
  about: AboutContent;
  music: MusicContent;
  work: WorkContent;
  contact: ContactContent;
};

export const fallbackSiteContent: SiteContent = {
  site: {
    name: "depster",
    email: "hello@example.com",
    social: {
      github: "https://github.com/depster",
      twitter: "https://twitter.com/depster",
      linkedin: "https://linkedin.com/in/depster",
    },
  },
  hero: {
    title: "depster",
    instruction: "Click & Drag to Rotate",
  },
  about: {
    eyebrow: "About",
    heading: "Hi, I'm depster",
    paragraphs: [
      "I'm a software developer who likes building small, focused tools and interfaces that feel good to use. Most of my time goes into web applications - React and TypeScript on the frontend, Node and various backends behind them - but I'm happiest when I'm tinkering with something just outside my day job: a weekend generative-art sketch, a CLI tool that automates some annoyance, or a weird little canvas experiment like the one at the top of this page.",
      "I care about craft: clean type, calm color, and interfaces that don't get in their own way. When I'm not at the keyboard I'm usually reading, hiking, or trying to get a synthesizer to make a sound I actually like.",
      "This site is a running log of what I'm building and a good place to reach me if you want to talk shop.",
    ],
  },
  music: {
    eyebrow: "Music",
    quote: "Music is life itself.",
    byline: "Louis Armstrong",
    ctaLabel: "Start listening",
    ctaHref: "#contact",
    trackTitle: "Helaf El Amar",
    artist: "George Wassouf",
    album: "El Hawa Sultan",
    spotifyHref: "https://open.spotify.com/",
    elapsed: "01:12",
    duration: "6:40",
    progressPercent: 34,
    playlistTitleLines: ["Best of", "George", "Wassouf"],
    previewLabel: "Preview - George Wassouf",
    saveLabel: "+ Save on Spotify",
  },
  work: {
    eyebrow: "Work",
    heading: "Selected Work",
    description:
      "A few things I've built recently - mostly small tools I wanted for myself first.",
    projects: [
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
    ],
  },
  contact: {
    eyebrow: "Contact",
    heading: "Let's talk",
    description:
      "Have a project, a question, or just want to say hi? My inbox is always open.",
    footer: "Built with Next.js, Tailwind CSS, and Payload CMS.",
  },
};
