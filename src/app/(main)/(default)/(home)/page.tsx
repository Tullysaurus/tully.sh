import Timeline from "@/components/timeline";
import { Code, Database, Gem, Github, GitPullRequestArrow, Laptop, MessageSquareText, Sword } from "lucide-react";

export default function Home() {
  const timelineItems = [
    {
      id: "2017",
      period: "2017",
      title: "My first laptop",
      details: "Started experimenting with software and basic scripting.",
      icon: <Laptop className="h-4 w-4 text-white" />,
    },
    {
      id: "2018-cn",
      period: "2018",
      title: "Joined Code Ninjas",
      details: "Built confidence by shipping small projects consistently.",
      icon: <Sword className="h-4 w-4 text-white" />,
    },
    {
      id: "2018-2022",
      period: "2018-2022",
      title: "Explored many languages",
      details: "Worked across multiple stacks and learned fundamentals deeply.",
      icon: <Code className="h-4 w-4 text-white" />,
    },
    {
      id: "2023-gh",
      period: "2023",
      title: "Joined GitHub",
      details: "Started publishing code publicly and collaborating in the open.",
      icon: <Github className="h-4 w-4 text-white" />,
    },
    {
      id: "2023-next",
      period: "2023",
      title: "Built with Next.js",
      details: "Moved into full-stack web apps and better deployment workflows.",
      icon: <Gem className="h-4 w-4 text-white" />,
    },
    {
      id: "2024-repo",
      period: "2024",
      title: "First repository launch",
      details: "Started releasing polished, reusable project code.",
      icon: <GitPullRequestArrow className="h-4 w-4 text-white" />,
    },
    {
      id: "2024-scratch",
      period: "2024",
      title: "Scratch clone project",
      details: "Shipped a larger product-style app with real user workflows.",
      icon: <MessageSquareText className="h-4 w-4 text-white" />,
    },
    {
      id: "2025-aws",
      period: "2025",
      title: "Learned AWS",
      details: "Expanded into cloud infra and production deployment patterns.",
      icon: <Database className="h-4 w-4 text-white" />,
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 pb-10 pt-10 lg:pt-16">
      <h1 className="text-center text-4xl italic font-light sm:text-5xl">tully.sh/</h1>
      <p className="max-w-xl text-center text-base font-semibold sm:text-lg">
        Self-taught developer programming as a hobby since the age of eight.
      </p>
      <div className="mt-2 flex w-full flex-col gap-8 lg:mt-4">
        <div className="h-fit w-full flex flex-col gap-4 lg:gap-6">
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
        <div className="h-fit w-full">
            <Timeline items={timelineItems} />
        </div>
      </div>
    </div>
  );
}
