import { Hero } from "@/components/sections/Hero";
import { sections } from "@/config/sections";

export default function Home() {
  return (
    <>
      <Hero />
      {sections.map(({ id, Component }) => (
        <Component key={id} />
      ))}
    </>
  );
}
