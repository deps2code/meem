"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  Briefcase,
  House,
  Mail,
  Music,
  User,
  type LucideIcon,
} from "lucide-react";
import { useNavDocked } from "@/lib/use-nav-docked";

export type SectionNavItem = {
  id: string;
  label: string;
};

type SectionNavProps = {
  items: SectionNavItem[];
};

// Below md the labels collapse to icons so the docked nav fits beside the top-right buttons.
const NAV_ICONS: Partial<Record<string, LucideIcon>> = {
  home: House,
  about: User,
  music: Music,
  work: Briefcase,
  contact: Mail,
};

// Scroll duration grows with distance so multi-section jumps stay readable.
const SCROLL_BASE_MS = 550;
const SCROLL_MS_PER_VIEWPORT = 220;
const SCROLL_MAX_MS = 1600;

// Fraction of the viewport height a section's top must pass to become active.
const ACTIVE_LINE = 0.5;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function getScrollTarget(section: HTMLElement) {
  const scrollPadding =
    parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const top = section.getBoundingClientRect().top + window.scrollY - scrollPadding;

  return Math.min(Math.max(top, 0), maxScroll);
}

export function SectionNav({ items }: SectionNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const docked = useNavDocked();
  // Section being scrolled to by a nav click; pins the active pill until arrival.
  const targetIdRef = useRef<string | null>(null);
  const cancelScrollRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    let frame = 0;

    const update = () => {
      frame = 0;
      if (targetIdRef.current || sections.length === 0) return;

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      // The last section may be too short to ever reach the active line.
      if (atBottom) {
        setActiveId(sections[sections.length - 1].id);
        return;
      }

      const line = window.innerHeight * ACTIVE_LINE;
      let current = sections[0];

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) {
          current = section;
        }
      }

      setActiveId(current.id);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  useEffect(() => () => cancelScrollRef.current?.(), []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;

    cancelScrollRef.current?.();
    targetIdRef.current = id;
    setActiveId(id);
    history.pushState(null, "", `#${id}`);

    const start = window.scrollY;
    const distance = Math.abs(getScrollTarget(section) - start);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || distance < 1) {
      window.scrollTo({ top: getScrollTarget(section), behavior: "instant" });
      targetIdRef.current = null;
      return;
    }

    const duration = Math.min(
      SCROLL_BASE_MS +
        (distance / window.innerHeight) * SCROLL_MS_PER_VIEWPORT,
      SCROLL_MAX_MS,
    );
    let startTime: number | null = null;
    let frame = 0;

    const stop = () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
      targetIdRef.current = null;
      cancelScrollRef.current = null;
      // Let the scroll-position tracker take over from wherever we stopped.
      window.dispatchEvent(new Event("scroll"));
    };

    const step = (now: number) => {
      startTime ??= now;
      const progress = Math.min((now - startTime) / duration, 1);
      // Re-measure every frame so late layout shifts don't throw off the landing.
      const target = getScrollTarget(section);

      window.scrollTo({
        top: start + (target - start) * easeInOutCubic(progress),
        behavior: "instant",
      });

      if (progress < 1) {
        frame = requestAnimationFrame(step);
      } else {
        stop();
      }
    };

    // Any manual scroll input hands control back to the user.
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);
    cancelScrollRef.current = stop;
    frame = requestAnimationFrame(step);
  };

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    scrollToSection(id);
  };

  return (
    <nav
      aria-label="Sections"
      data-docked={docked}
      className={`glass nav-dock fixed left-1/2 top-0 z-50 max-w-[calc(100vw-1.5rem)] -translate-x-1/2 rounded-full p-1.5 ${
        docked
          ? "translate-y-[9px] md:translate-y-[17px]"
          : "translate-y-[calc(100dvh-100%-1rem)] sm:translate-y-[calc(100dvh-100%-1.5rem)]"
      }`}
    >
      <ul className="flex items-center gap-0.5 md:gap-1">
        {items.map(({ id, label }) => {
          const isActive = id === activeId;
          const Icon = NAV_ICONS[id];

          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(event) => handleClick(event, id)}
                aria-current={isActive ? "location" : undefined}
                title={label}
                className={`flex h-9 items-center justify-center whitespace-nowrap rounded-full text-[0.68rem] font-semibold uppercase tracking-[0.08em] transition-[background-color,color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] md:w-auto md:px-4 md:text-xs md:tracking-[0.14em] ${
                  Icon ? "w-9" : "px-2.5"
                } ${
                  isActive
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {Icon ? <Icon aria-hidden className="size-4 md:hidden" /> : null}
                <span className={Icon ? "max-md:sr-only" : undefined}>
                  {label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
