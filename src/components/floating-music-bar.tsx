"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { MusicContent } from "@/lib/site-content";
import { useNavDocked } from "@/lib/use-nav-docked";

type FloatingMusicBarProps = {
  content: MusicContent;
};

type SpotifyEmbedController = {
  togglePlay: () => void;
  addListener: (
    event: "playback_update",
    callback: (event: { data?: { isPaused?: boolean } }) => void,
  ) => void;
  destroy: () => void;
};

type SpotifyIframeApi = {
  createController: (
    element: HTMLElement,
    options: { uri: string; width?: string; height?: string },
    callback: (controller: SpotifyEmbedController) => void,
  ) => void;
};

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIframeApi) => void;
  }
}

function getSpotifyUri(value: string): string {
  try {
    const url = new URL(value);
    const parts = url.pathname.split("/").filter(Boolean);
    const embedIndex = parts[0] === "embed" ? 1 : 0;
    const type = parts[embedIndex];
    const id = parts[embedIndex + 1];

    if (type && id) {
      return `spotify:${type}:${id}`;
    }
  } catch {
    return value;
  }

  return value;
}

export function FloatingMusicBar({ content }: FloatingMusicBarProps) {
  const [isPaused, setIsPaused] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const docked = useNavDocked();
  const isExpanded = isOpen && !docked;
  const controllerEmbedRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SpotifyEmbedController | null>(null);
  const spotifyUri = useMemo(
    () => getSpotifyUri(content.spotifyEmbedHref),
    [content.spotifyEmbedHref],
  );
  const Icon = isPaused ? Play : Pause;
  const songLabel = content.trackTitle;

  useEffect(() => {
    const element = controllerEmbedRef.current;
    if (!element) return;

    let isMounted = true;

    const createController = (api: SpotifyIframeApi) => {
      if (!isMounted || controllerRef.current) return;

      api.createController(
        element,
        { uri: spotifyUri, width: "1", height: "1" },
        (controller) => {
          if (!isMounted) {
            controller.destroy();
            return;
          }

          controllerRef.current = controller;
          controller.addListener("playback_update", (event) => {
            if (typeof event.data?.isPaused === "boolean") {
              setIsPaused(event.data.isPaused);
            }
          });
        },
      );
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://open.spotify.com/embed/iframe-api/v1"]',
    );

    window.onSpotifyIframeApiReady = createController;

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://open.spotify.com/embed/iframe-api/v1";
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      isMounted = false;
      controllerRef.current?.destroy();
      controllerRef.current = null;
    };
  }, [spotifyUri]);

  const togglePlayback = () => {
    controllerRef.current?.togglePlay();
  };

  return (
    <>
      {/* Full-width container so cqw units resolve against the viewport minus the scrollbar. */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 [container-type:inline-size]">
        <aside
          onMouseLeave={() => setIsOpen(false)}
          className={`glass music-dock pointer-events-auto absolute left-0 top-0 overflow-hidden ${
            docked
              ? "w-9 translate-x-[calc(100cqw-1rem-100%)] translate-y-4 rounded-[18px] p-0 md:translate-x-[calc(100cqw-1.5rem-100%)] md:translate-y-6"
              : `translate-x-[calc(50cqw-50%)] translate-y-4 rounded-[24px] sm:translate-y-5 ${
                  isExpanded
                    ? "w-[min(520px,calc(100vw-1.5rem))] p-0 sm:w-[min(520px,calc(100vw-8rem))]"
                    : "w-[min(19rem,calc(100vw-1.5rem))] p-1.5 sm:w-80"
                }`
          }`}
        >
          <div
            className={`relative overflow-hidden transition-[height,border-radius] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              docked
                ? "h-[34px] rounded-full"
                : isExpanded
                  ? "h-[152px] rounded-[23px]"
                  : "h-10 rounded-[18px]"
            }`}
          >
            <div
              className={`absolute inset-x-0 top-0 z-30 flex items-center overflow-hidden text-xs font-semibold uppercase tracking-[0.18em] text-foreground transition-[height,padding,gap] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                docked ? "h-[34px] gap-0 px-0" : "h-10 gap-3 px-2.5"
              }`}
            >
              <button
                type="button"
                aria-label={isPaused ? "Play Spotify" : "Pause Spotify"}
                aria-pressed={!isPaused}
                onClick={togglePlayback}
                className={`flex shrink-0 items-center justify-center rounded-full transition-[width,height,background-color,color,transform,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] active:scale-[0.97] ${
                  docked
                    ? "size-[34px] bg-transparent text-foreground hover:bg-muted"
                    : "size-7 bg-foreground text-background hover:opacity-85"
                } ${isExpanded ? "pointer-events-none scale-95 opacity-0" : ""}`}
              >
                <Icon
                  className={`fill-current transition-[width,height] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    docked ? "size-4" : "size-3.5"
                  }`}
                />
              </button>
              <div
                onMouseEnter={() => setIsOpen(true)}
                onFocus={() => setIsOpen(true)}
                tabIndex={docked ? -1 : 0}
                aria-hidden={docked}
                className={`flex min-w-0 flex-1 items-center gap-3 transition-[opacity,transform] ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  docked
                    ? "pointer-events-none translate-x-3 opacity-0 duration-150"
                    : isExpanded
                      ? "pointer-events-none -translate-y-2 opacity-0 duration-200"
                      : "duration-300 delay-300"
                }`}
              >
                <p className="shrink-0 text-[0.63rem] text-muted-foreground">
                  Now playing
                </p>
                <div className="min-w-0 flex-1 overflow-hidden">
                  <div className="music-marquee flex min-w-max whitespace-nowrap">
                    <span className="pr-10">{songLabel}</span>
                    <span className="pr-10" aria-hidden="true">
                      {songLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`absolute inset-0 block h-[152px] border-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [&>iframe]:m-0 [&>iframe]:block [&>iframe]:h-[152px] [&>iframe]:w-full ${
                isExpanded
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-2 opacity-0"
              }`}
            >
              {isExpanded ? (
                <iframe
                  title={`${content.trackTitle} on Spotify`}
                  src={content.spotifyEmbedHref}
                  width="100%"
                  height="152"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="block h-[152px] w-full border-0"
                />
              ) : null}
            </div>
          </div>
        </aside>
      </div>
      <div
        ref={controllerEmbedRef}
        aria-hidden="true"
        className="pointer-events-none fixed -left-[9999px] -top-[9999px] size-px overflow-hidden opacity-0 [&>iframe]:size-px"
      />
    </>
  );
}
