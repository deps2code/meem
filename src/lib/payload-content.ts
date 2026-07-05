import {
  fallbackSiteContent,
  type AboutContent,
  type ContactContent,
  type HeroContent,
  type MusicContent,
  type ProjectContent,
  type SiteContent,
  type SiteIdentity,
  type SocialLinks,
  type WorkContent,
} from "@/lib/site-content";

const DEFAULT_REVALIDATE_SECONDS = 300;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function text(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

function number(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function textArray(value: unknown, fallback: string[]): string[] {
  if (!Array.isArray(value)) return fallback;
  const values = value.filter(
    (item): item is string => typeof item === "string" && item.trim().length > 0,
  );
  return values.length > 0 ? values : fallback;
}

function record(value: unknown): Record<string, unknown> {
  return isRecord(value) ? value : {};
}

function normalizeSocialLinks(value: unknown, fallback: SocialLinks): SocialLinks {
  const source = record(value);

  return {
    github: text(source.github, fallback.github),
    twitter: text(source.twitter, fallback.twitter),
    linkedin: text(source.linkedin, fallback.linkedin),
  };
}

function normalizeSiteIdentity(value: unknown, fallback: SiteIdentity): SiteIdentity {
  const source = record(value);

  return {
    name: text(source.name, fallback.name),
    email: text(source.email, fallback.email),
    social: normalizeSocialLinks(source.social, fallback.social),
  };
}

function normalizeHero(value: unknown, fallback: HeroContent): HeroContent {
  const source = record(value);

  return {
    title: text(source.title, fallback.title),
    instruction: text(source.instruction, fallback.instruction),
  };
}

function normalizeAbout(value: unknown, fallback: AboutContent): AboutContent {
  const source = record(value);

  return {
    eyebrow: text(source.eyebrow, fallback.eyebrow),
    heading: text(source.heading, fallback.heading),
    paragraphs: textArray(source.paragraphs, fallback.paragraphs),
  };
}

function normalizeMusic(value: unknown, fallback: MusicContent): MusicContent {
  const source = record(value);

  return {
    eyebrow: text(source.eyebrow, fallback.eyebrow),
    quote: text(source.quote, fallback.quote),
    byline: text(source.byline, fallback.byline),
    ctaLabel: text(source.ctaLabel, fallback.ctaLabel),
    ctaHref: text(source.ctaHref, fallback.ctaHref),
    trackTitle: text(source.trackTitle, fallback.trackTitle),
    artist: text(source.artist, fallback.artist),
    album: text(source.album, fallback.album),
    spotifyHref: text(source.spotifyHref, fallback.spotifyHref),
    elapsed: text(source.elapsed, fallback.elapsed),
    duration: text(source.duration, fallback.duration),
    progressPercent: Math.max(
      0,
      Math.min(100, number(source.progressPercent, fallback.progressPercent)),
    ),
    playlistTitleLines: textArray(
      source.playlistTitleLines,
      fallback.playlistTitleLines,
    ),
    previewLabel: text(source.previewLabel, fallback.previewLabel),
    saveLabel: text(source.saveLabel, fallback.saveLabel),
  };
}

function normalizeProjects(value: unknown, fallback: ProjectContent[]): ProjectContent[] {
  if (!Array.isArray(value)) return fallback;

  const projects = value
    .filter(isRecord)
    .map((project, index): ProjectContent => {
      const fallbackProject = fallback[index] ?? {
        name: "Untitled",
        description: "",
        tags: [],
        href: "#",
      };

      return {
        name: text(project.name, fallbackProject.name),
        description: text(project.description, fallbackProject.description),
        tags: textArray(project.tags, fallbackProject.tags),
        href: text(project.href, fallbackProject.href),
      };
    });

  return projects.length > 0 ? projects : fallback;
}

function normalizeWork(value: unknown, fallback: WorkContent): WorkContent {
  const source = record(value);

  return {
    eyebrow: text(source.eyebrow, fallback.eyebrow),
    heading: text(source.heading, fallback.heading),
    description: text(source.description, fallback.description),
    projects: normalizeProjects(source.projects, fallback.projects),
  };
}

function normalizeContact(value: unknown, fallback: ContactContent): ContactContent {
  const source = record(value);

  return {
    eyebrow: text(source.eyebrow, fallback.eyebrow),
    heading: text(source.heading, fallback.heading),
    description: text(source.description, fallback.description),
    footer: text(source.footer, fallback.footer),
  };
}

function normalizeSiteContent(value: unknown): SiteContent {
  const source = record(value);

  return {
    site: normalizeSiteIdentity(source.site, fallbackSiteContent.site),
    hero: normalizeHero(source.hero, fallbackSiteContent.hero),
    about: normalizeAbout(source.about, fallbackSiteContent.about),
    music: normalizeMusic(source.music, fallbackSiteContent.music),
    work: normalizeWork(source.work, fallbackSiteContent.work),
    contact: normalizeContact(source.contact, fallbackSiteContent.contact),
  };
}

function getPayloadUrl(): string | null {
  const url = process.env.PAYLOAD_CMS_URL?.trim();
  return url ? url.replace(/\/$/, "") : null;
}

function getPayloadRevalidateSeconds(): number {
  const configured = Number(process.env.PAYLOAD_CMS_REVALIDATE_SECONDS);
  return Number.isFinite(configured) && configured >= 0
    ? configured
    : DEFAULT_REVALIDATE_SECONDS;
}

export async function getSiteContent(): Promise<SiteContent> {
  const payloadUrl = getPayloadUrl();

  if (!payloadUrl) {
    return fallbackSiteContent;
  }

  const headers = new Headers({ Accept: "application/json" });
  const token = process.env.PAYLOAD_CMS_TOKEN?.trim();

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  try {
    const response = await fetch(`${payloadUrl}/api/globals/site-content`, {
      headers,
      next: {
        revalidate: getPayloadRevalidateSeconds(),
        tags: ["site-content"],
      },
    });

    if (!response.ok) {
      return fallbackSiteContent;
    }

    return normalizeSiteContent(await response.json());
  } catch {
    return fallbackSiteContent;
  }
}
