import { Hero } from "@/components/sections/Hero";
import { Router } from "@/components/sections/Router";
import { About } from "@/components/sections/About";
import { homeHero } from "@/content/hero";

export default function Home() {
  return (
    <>
      <Hero content={homeHero} />
      <Router />
      <About border={false} />
    </>
  );
}
