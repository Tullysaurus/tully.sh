import TimelineElement from "@/components/timeline-element";
import { Code, Database, Gem, Github, GitPullRequestArrow, Laptop, MessageSquareText, Sword } from "lucide-react";

export default function Home() {
  return (
    <div
      className="flex flex-col h-100vh w-100vh items-center pt-[10vh] gap-8"
    >
      <h1 className="text-5xl italic font-light">tully.sh/</h1>
      <p className="text-l text-center w-3/8 font-semibold">
        Self-taught developer programming as a hobby since the age of eight.
      </p>
      <div className="w-[60vw] h-fit mt-4 flex flex-row">
        <div className="w-[60%] h-fit flex flex-col gap-6">
          <h2 className="text-3xl font-bold mt-4 text-[#FFC17B]">Tully C.</h2>
          <p className="font-semibold text-lg">Full-Stack Developer</p>
          <p className="h-fit wrap-normal">
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
        <div className="relative w-[40%] min-h-[10vh] h-fit flex flex-col gap-4 after:border-white after:bg-white after:w-[1px] after:h-[39vh] after:rounded-full after:absolute after:top-1 after:left-[50%] after:z-[-1]">
            <TimelineElement side="l" text="2017" hover="My first laptop" icon={<Laptop className="w-4 h-4 text-white"/>}/>
            <TimelineElement side="r" text="2018" hover="Joined Code ninjas" icon={<Sword className="w-4 h-4 text-white"/>}/>
            <TimelineElement side="l" text="2018 - 2022" hover="Misc. languages" icon={<Code className="w-4 h-4 text-white"/>}/>
            <TimelineElement side="r" text="2023" hover="Joiend Github" icon={<Github className="w-4 h-4 text-white"/>}/>
            <TimelineElement side="l" text="2023" hover="Next.JS" icon={<Gem className="w-4 h-4 text-white"/>}/>
            <TimelineElement side="r" text="2024" hover="First repository" icon={<GitPullRequestArrow className="w-4 h-4 text-white"/>}/>
            <TimelineElement side="l" text="2024" hover="Scratch Clone" icon={<MessageSquareText className="w-4 h-4 text-white"/>}/>
            <TimelineElement side="r" text="2025" hover="AWS" icon={<Database className="w-4 h-4 text-white"/>}/>
        </div>
      </div>

       
    </div>
  );
}
