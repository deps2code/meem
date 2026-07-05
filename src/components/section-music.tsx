import {
  Heart,
  Pause,
  Play,
  Repeat2,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import type { MusicContent } from "@/lib/site-content";

type SectionMusicProps = {
  content: MusicContent;
};

export function SectionMusic({ content }: SectionMusicProps) {
  return (
    <section className="relative mx-auto w-full max-w-2xl overflow-hidden px-6 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,color-mix(in_oklch,var(--accent)_16%,transparent),transparent_48%)]" />
      <div className="relative">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            {content.eyebrow}
          </p>
          <h2 className="mt-8 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            &ldquo;{content.quote}&rdquo;
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            {content.byline}
          </p>
          <div className="mt-10">
            <a
              href={content.ctaHref}
              className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-7 text-sm font-semibold text-background shadow-sm transition hover:opacity-85"
            >
              {content.ctaLabel}
            </a>
          </div>
        </div>

        <div className="mt-14 rounded-[2rem] border border-border bg-background/72 p-5 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-8">
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-3xl bg-gradient-to-br from-muted via-background to-muted shadow-inner sm:size-24">
              <div className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background/85 sm:size-11" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground sm:tracking-[0.35em]">
                Now Playing
              </p>
              <h3 className="mt-3 truncate text-2xl font-bold text-foreground sm:text-3xl">
                {content.trackTitle}
              </h3>
              <p className="mt-1 text-base text-muted-foreground sm:text-lg">
                {content.artist} · {content.album}
              </p>
            </div>
            <button
              type="button"
              aria-label="Favorite track"
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:bg-muted hover:text-foreground sm:size-12"
            >
              <Heart className="size-5" />
            </button>
          </div>

          <a
            href={content.spotifyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto mt-8 flex h-11 w-fit items-center justify-center rounded-full border border-border bg-background/80 px-7 text-xs font-bold uppercase tracking-[0.28em] text-foreground shadow-sm transition hover:bg-muted"
          >
            Open in Spotify
          </a>

          <div className="mt-12">
            <div className="flex justify-between text-sm font-medium text-muted-foreground">
              <span>{content.elapsed}</span>
              <span>{content.duration}</span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-foreground"
                style={{ width: `${content.progressPercent}%` }}
              />
            </div>
          </div>

          <div className="mt-10 grid grid-cols-3 justify-items-center gap-3 sm:flex sm:items-center sm:justify-between">
            {[
              { label: "Shuffle", icon: Shuffle },
              { label: "Previous", icon: SkipBack },
              { label: "Pause", icon: Pause, primary: true },
              { label: "Next", icon: SkipForward },
              { label: "Repeat", icon: Repeat2 },
              { label: "Volume", icon: Volume2 },
            ].map(({ label, icon: Icon, primary }) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                className={
                  primary
                    ? "flex size-14 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition hover:opacity-85 sm:size-16"
                    : "flex size-11 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:bg-muted hover:text-foreground sm:size-12"
                }
              >
                <Icon className={primary ? "size-6" : "size-5"} />
              </button>
            ))}
          </div>

          <div className="mt-10 rounded-[1.5rem] bg-[#0c6590] p-4 text-white shadow-xl sm:p-5">
            <div className="flex gap-4 sm:gap-5">
              <div className="flex size-24 shrink-0 items-center justify-center rounded-xl bg-[#3a9bcc] text-center text-xs font-black uppercase leading-4 tracking-wide sm:size-28 sm:text-sm">
                {content.playlistTitleLines.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="truncate text-base font-bold sm:text-lg">
                      {content.trackTitle}
                    </p>
                    <p className="mt-2 text-sm text-white/70">
                      {content.previewLabel}
                    </p>
                  </div>
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-[#0c6590]">
                    <Play className="ml-0.5 size-5 fill-current" />
                  </div>
                </div>
                <p className="mt-7 text-sm font-semibold text-white/85">
                  {content.saveLabel}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
