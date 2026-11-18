import { getSiteContent } from "@/lib/cms/store";
import { SiteOpening } from "@/components/layout/site-opening";
import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { WorkPreview } from "@/components/sections/work-preview";
import { Disciplines } from "@/components/sections/disciplines";
import { StreetPrelude } from "@/components/sections/street-prelude";
import { About } from "@/components/sections/about";
import { Process } from "@/components/sections/process";
import { FinalCta } from "@/components/sections/final-cta";

export default async function Home() {
  const content = await getSiteContent();
  return <>
    <SiteOpening />
    <Hero content={content} />
    <Manifesto content={content} />
    <WorkPreview content={content} />
    <Disciplines content={content} />
    <StreetPrelude content={content} />
    <About content={content} />
    <Process content={content} />
    <FinalCta content={content} />
  </>;
}
