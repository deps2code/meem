export type SocialLinks = {
  github: string;
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
  spotifyEmbedHref: string;
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
    email: "depscode@gmail.com",
    social: {
      github: "https://github.com/deps2code",
      linkedin: "https://linkedin.com/in/dpathak9",
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
      "I'm a software developer who likes building small, focused tools and interfaces that feel good to use. Most of my time goes into web applications and various backends behind them, but I'm happiest when I'm tinkering with something just outside my day job: a weekend generative art sketch, a video clip edit, fun to play games or a simple little gradient and glass morphism experiment like the one at the top of this page",
      "When I'm not at the keyboard I am usually at another one which is my Yamaha P125 keyboard. Otherwise I'm usually reading, hiking, or letting the moments tick away a dull day",
      "This site is a running log of what I'm building and a good place to reach me if you want to talk shop",
    ],
  },
  music: {
    eyebrow: "Music",
    quote: "Music is life itself.",
    byline: "Louis Armstrong",
    ctaLabel: "Start listening",
    ctaHref: "#contact",
    trackTitle: "Wish You Were Here",
    artist: "Pink Floyd",
    album: "Wish You Were Here",
    spotifyHref: "https://open.spotify.com/track/6mFkJmJqdDVQ1REhVfGgd1",
    spotifyEmbedHref:
      "https://open.spotify.com/embed/track/6mFkJmJqdDVQ1REhVfGgd1?utm_source=generator",
    elapsed: "01:12",
    duration: "6:40",
    progressPercent: 34,
    playlistTitleLines: ["Best of", "Pink", "Floyd"],
    previewLabel: "Preview - Pink Floyd",
    saveLabel: "Save on Spotify",
  },
  work: {
    eyebrow: "Work",
    heading: "Selected projects",
    description:
      "A few things I've built or done recently",
    projects: [
      {
        name: "Altchess",
        description:
          "An honest variant of chess with superpowers that may or may not help you get good at chess",
        tags: ["TypeScript", "React", "Go"],
        href: "https://www.altchess.net",
      }
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
