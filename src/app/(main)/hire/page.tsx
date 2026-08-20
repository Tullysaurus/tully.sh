import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Capabilities } from "@/components/sections/Capabilities";
import { Process } from "@/components/sections/Process";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { Contact } from "@/components/sections/Contact";
import { hireHero } from "@/content/hire-hero";

export const metadata: Metadata = {
  title: "Hire me",
};

export default function HirePage() {
  return (
    <>
      <Hero content={hireHero} compact />
      <Capabilities />
      <Process />
      <CaseStudy />
      <Contact />
    </>
  );
}
