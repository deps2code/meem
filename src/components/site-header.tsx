import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="fixed top-4 right-4 z-50 md:top-6 md:right-6">
      <ThemeToggle />
    </header>
  );
}
