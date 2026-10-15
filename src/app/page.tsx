import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { WorkPreview } from "@/components/sections/work-preview";
import { Disciplines } from "@/components/sections/disciplines";
import { StreetPrelude } from "@/components/sections/street-prelude";
import { About } from "@/components/sections/about";
import { Process } from "@/components/sections/process";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return <>
    <Hero />
    <Manifesto />
    <WorkPreview />
    <Disciplines />
    <StreetPrelude />
    <About />
    <Process />
    <FinalCta />
  </>;
}
