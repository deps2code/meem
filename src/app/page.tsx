import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { HeroSphere } from "@/components/hero-sphere";
import { SectionAbout } from "@/components/section-about";
import { SectionMusic } from "@/components/section-music";
import { SectionWork } from "@/components/section-work";
import { SectionContact } from "@/components/section-contact";
import { FloatingMusicBar } from "@/components/floating-music-bar";
import { SectionNav } from "@/components/section-nav";
import { getSiteContent } from "@/lib/payload-content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();

  return {
    title: content.site.name,
    description: `Personal site of ${content.site.name}.`,
  };
}

export default async function Home() {
  const content = await getSiteContent();
  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: content.about.eyebrow },
    { id: "music", label: content.music.eyebrow },
    { id: "work", label: content.work.eyebrow },
    { id: "contact", label: content.contact.eyebrow },
  ];

  return (
    <>
      <SiteHeader />
      <FloatingMusicBar content={content.music} />
      <SectionNav items={navItems} />
      <main className="flex flex-1 flex-col pb-20">
        <HeroSphere content={content.hero} />
        <SectionAbout content={content.about} />
        <SectionMusic content={content.music} />
        <SectionWork content={content.work} />
        <SectionContact content={content.contact} site={content.site} />
      </main>
    </>
  );
}
