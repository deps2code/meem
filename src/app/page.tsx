import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { HeroSphere } from "@/components/hero-sphere";
import { SectionAbout } from "@/components/section-about";
import { SectionMusic } from "@/components/section-music";
import { SectionWork } from "@/components/section-work";
import { SectionContact } from "@/components/section-contact";
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

  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <HeroSphere content={content.hero} />
        <SectionAbout content={content.about} />
        <SectionMusic content={content.music} />
        <SectionWork content={content.work} />
        <SectionContact content={content.contact} site={content.site} />
      </main>
    </>
  );
}
