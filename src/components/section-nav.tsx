"use client";

import { useEffect, useState } from "react";
import { useNavDocked } from "@/lib/use-nav-docked";

export type SectionNavItem = {
  id: string;
  label: string;
};

type SectionNavProps = {
  items: SectionNavItem[];
};

export function SectionNav({ items }: SectionNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const docked = useNavDocked();

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    // A section is active once it crosses the middle band of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Sections"
      data-docked={docked}
      className={`glass nav-dock fixed left-1/2 top-0 z-50 max-w-[calc(100vw-1.5rem)] -translate-x-1/2 translate-y-[calc(100dvh-100%-1rem)] rounded-full p-1.5 sm:translate-y-[calc(100dvh-100%-1.5rem)] ${
        docked ? "md:translate-y-[17px]" : ""
      }`}
    >
      <ul className="flex items-center gap-0.5 sm:gap-1">
        {items.map(({ id, label }) => {
          const isActive = id === activeId;

          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "location" : undefined}
                className={`flex h-9 items-center whitespace-nowrap rounded-full px-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.08em] transition-[background-color,color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] sm:px-4 sm:text-xs sm:tracking-[0.14em] ${
                  isActive
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
