import TimelineElement from "@/components/timeline-element";
import { Code, Database, Gem, Github, GitPullRequestArrow, Laptop, MessageSquareText, Sword } from "lucide-react";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 pb-10 pt-10 lg:pt-16">
      <h1 className="text-center text-4xl italic font-light sm:text-5xl">tully.sh/</h1>
      <p className="max-w-xl text-center text-base font-semibold sm:text-lg">
        Self-taught developer programming as a hobby since the age of eight.
      </p>
      <div className="mt-2 flex w-full flex-col gap-8 lg:mt-4 lg:flex-row">
        <div className="h-fit w-full lg:w-3/5 flex flex-col gap-4 lg:gap-6">
          <h2 className="mt-2 text-3xl font-bold text-[#FFC17B] lg:mt-4">Tully C.</h2>
          <p className="text-lg font-semibold">Full-Stack Developer</p>
          <p className="h-fit wrap-normal text-sm sm:text-base">
            Hi! I&apos;m Tully (also known as Tullydev/Tullsaurus), a self-taught developer with over seven 
            years of experience in programming. I first started developing when I was around eight years old,
            and I&apos;ve kept it as a hobby every since. I&apos;ve spent the last seven years familiarizing
            myself with many languages, frameworks, cloud providers, and more. I have a certain kind of love
            for free and open source software, and I&apos;ve made it a point to make all of my projects free
            and open source.<br/>
            <br/>
            My goal for my projects is to give students the tools to achieve the freedom they deserve
            in the learning environment.
          </p>
        </div>
        <div className="relative h-fit w-full min-h-[10vh] flex flex-col gap-4 lg:w-2/5 lg:after:absolute lg:after:left-1/2 lg:after:top-1 lg:after:z-[-1] lg:after:h-[39vh] lg:after:w-px lg:after:rounded-full lg:after:border-white lg:after:bg-white">
            <TimelineElement side="l" text="2017" hover="My first laptop" icon={<Laptop className="w-4 h-4 text-white"/>}/>
            <TimelineElement side="r" text="2018" hover="Joined Code ninjas" icon={<Sword className="w-4 h-4 text-white"/>}/>
            <TimelineElement side="l" text="2018 - 2022" hover="Misc. languages" icon={<Code className="w-4 h-4 text-white"/>}/>
            <TimelineElement side="r" text="2023" hover="Joined Github" icon={<Github className="w-4 h-4 text-white"/>}/>
            <TimelineElement side="l" text="2023" hover="Next.JS" icon={<Gem className="w-4 h-4 text-white"/>}/>
            <TimelineElement side="r" text="2024" hover="First repository" icon={<GitPullRequestArrow className="w-4 h-4 text-white"/>}/>
            <TimelineElement side="l" text="2024" hover="Scratch Clone" icon={<MessageSquareText className="w-4 h-4 text-white"/>}/>
            <TimelineElement side="r" text="2025" hover="Learned AWS" icon={<Database className="w-4 h-4 text-white"/>}/>
        </div>
      </div>
    </div>
  );
}
