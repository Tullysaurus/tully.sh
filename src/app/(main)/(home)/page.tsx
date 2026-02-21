import TimelineElement from "@/components/timeline-element";
import { Code, Database, Gem, GitBranch, Github, GitMerge, GitPullRequest, GitPullRequestArrow, Laptop, MessageSquareText, Scroll, ScrollText, Sword } from "lucide-react";

export default function Home() {
  /*I'm a highschool student who develops as a hobby.
        I have a passion for working around rules that my school
        puts into place. I develop cheats for the different softwares
        that my school uses to monitor us, test us, and just assignments
        in general. All of these projects are made in a way that allows
        them to be hosted completely for free to allow anybody to use them
        without money being a barrier, and to minimize the ability for
        the hosting to be linked back to me.
  */
  return (
    <div
      className="flex flex-col h-100vh w-100vh items-center pt-[10vh] gap-8"
    >
      <h1 className="text-5xl font-bold">About Me</h1>
      <p className="text-l text-center w-3/8 font-semibold">
        Self-taught developer programming as a hobby since the age of eight.
      </p>
      <div className="w-[60vw] h-fit mt-4 flex flex-row">
        <div className="w-[60%] h-fit flex flex-col gap-6">
          <h2 className="text-3xl font-bold mt-4 text-[#FFC17B]">Tully C.</h2>
          <p className="font-semibold text-lg">Full-Stack Developer</p>
          <p className="h-fit wrap-normal">
            Hi! I&apos;m Tully, a self-taught developer with over seven years of experience in programming.
            I first started developing when I was around eight years old, and I&apos;ve kept it as a hobby
            every since. I&apos;ve spent the last seven years familiarizing myself with many languages,
            frameworks, cloud providers, and more. I have a certain kind of love for free and open
            source software, and I&apos;ve made it a point to make all of my projects free to use and open source.<br/>
            <br/>
            My goal for my projects is to give students the tools to achieve the freedom they deserve
            in the learning environment.
          </p>
        </div>
        <div className="relative w-[40%] min-h-[10vh] h-fit flex flex-col gap-4 after:border-white after:bg-white after:w-[1px] after:h-[39vh] after:rounded-full after:absolute after:top-1 after:left-[50%] after:z-[-1]">
            <TimelineElement side="l" text="2017" hover="My first laptop" icon={<Laptop className="w-4 h-4 text-white"/>}/>
            <TimelineElement side="r" text="2018" hover="Joined Code ninjas" icon={<Sword className="w-4 h-4 text-white"/>}/>
            <TimelineElement side="l" text="2018 - 2022" hover="Misc. languages" icon={<Code className="w-4 h-4 text-white"/>}/>
            {/* <TimelineElement side="l" text="2020" hover="Python" icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 448 512"><path fill="rgb(255, 255, 255)" d="M439.8 200.5c-7.7-30.9-22.3-54.2-53.4-54.2l-40.1 0 0 47.4c0 36.8-31.2 67.8-66.8 67.8l-106.8 0c-29.2 0-53.4 25-53.4 54.3l0 101.8c0 29 25.2 46 53.4 54.3 33.8 9.9 66.3 11.7 106.8 0 26.9-7.8 53.4-23.5 53.4-54.3l0-40.7-106.7 0 0-13.6 160.2 0c31.1 0 42.6-21.7 53.4-54.2 11.2-33.5 10.7-65.7 0-108.6zM286.2 444.7a20.4 20.4 0 1 1 0-40.7 20.4 20.4 0 1 1 0 40.7zM167.8 248.1l106.8 0c29.7 0 53.4-24.5 53.4-54.3l0-101.9c0-29-24.4-50.7-53.4-55.6-35.8-5.9-74.7-5.6-106.8 .1-45.2 8-53.4 24.7-53.4 55.6l0 40.7 106.9 0 0 13.6-147 0c-31.1 0-58.3 18.7-66.8 54.2-9.8 40.7-10.2 66.1 0 108.6 7.6 31.6 25.7 54.2 56.8 54.2l36.7 0 0-48.8c0-35.3 30.5-66.4 66.8-66.4zM161.2 64.7a20.4 20.4 0 1 1 0 40.8 20.4 20.4 0 1 1 0-40.8z"/></svg>}/>
            <TimelineElement side="r" text="2021" hover="Lua" icon={<ScrollText className="w-4 h-4 text-white"/>}/> */}
            {/* <TimelineElement side="r" text="2022" hover="HTML, CSS, JS" icon={<Code className="w-4 h-4 text-white"/>}/> */}
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
