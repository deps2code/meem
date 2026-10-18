"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { useNavDocked } from "@/lib/use-nav-docked";

export function SiteHeader() {
  const docked = useNavDocked();

  // Docked music button takes this corner; drop one button height plus a gap below it.
  return (
    <header
      className={`theme-dock fixed top-4 right-4 z-50 md:top-6 md:right-6 ${
        docked ? "translate-y-11" : ""
      }`}
    >
      <ThemeToggle />
    </header>
  );
}
