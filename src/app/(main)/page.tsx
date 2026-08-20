import { Hero } from "@/components/sections/Hero";
import { Capabilities } from "@/components/sections/Capabilities";
import { Process } from "@/components/sections/Process";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { hero } from "@/content/hero";

export default function Home() {
  return (
    <>
      <Hero content={hero} />
      <Capabilities />
      <Process />
      <Work />
      <About />
      <Contact />
    </>
  );
}
