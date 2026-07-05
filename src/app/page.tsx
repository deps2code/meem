import { SiteHeader } from "@/components/site-header";
import { HeroSphere } from "@/components/hero-sphere";
import { SectionAbout } from "@/components/section-about";
import { SectionWork } from "@/components/section-work";
import { SectionContact } from "@/components/section-contact";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <HeroSphere />
        <SectionAbout />
        <SectionWork />
        <SectionContact />
      </main>
    </>
  );
}
