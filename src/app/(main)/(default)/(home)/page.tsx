import Timeline from "@/components/timeline";
import { Code, Database, Gem, Github, GitPullRequestArrow, Laptop, MessageSquareText, Sword } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const highlightCards = [
    {
      id: "years",
      title: "7+ Years",
      description: "Programming experience across full-stack and cloud tooling.",
      tone: "bg-[#1e2321] border-[#2f5a49]",
    },
    {
      id: "focus",
      title: "Product-Focused",
      description: "I build practical software that is fast, usable, and maintainable.",
      tone: "bg-[#23211e] border-[#5b4f34]",
    },
    {
      id: "oss",
      title: "Open Source",
      description: "Most projects are public, free to use, and built for real users.",
      tone: "bg-[#1f2026] border-[#3f4665]",
    },
    {
      id: "stack",
      title: "Web + Cloud",
      description: "Next.js, APIs, infra, and deployment workflows end to end.",
      tone: "bg-[#241f26] border-[#4f3d61]",
    },
    {
      id: "quality",
      title: "Clean Execution",
      description: "Readable code, thoughtful UX, and features that solve pain points.",
      tone: "bg-[#1f2426] border-[#3a5660]",
    },
  ];

  const scrollingCards = [...highlightCards, ...highlightCards];

  const timelineItems = [
    {
      id: "2017",
      period: "2017",
      title: "My first laptop",
      details: "Started experimenting with software and basic scripting.",
      icon: <Laptop className="h-4 w-4 text-white" />,
    },
    {
      id: "2020-cn",
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
      <h1 className="reveal-up text-center text-4xl italic font-light sm:text-5xl">tully.sh/</h1>
      <p className="reveal-up delay-1 max-w-xl text-center text-base font-semibold sm:text-lg">
        Self-taught developer programming as a hobby since the age of eight.
      </p>
      <div className="mt-2 flex w-full flex-col gap-8 lg:mt-4">
        <div className="reveal-up delay-2 h-fit w-full flex flex-col gap-4 lg:gap-6">
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
            I like building software that feels simple to use, runs fast, and actually solves a real problem
            instead of being overcomplicated. Most of what I make starts from a personal pain point, then turns
            into something I can share with other people in a useful way. I care a lot about clean design,
            practical features, and giving users more control over their own experience.<br/>
            <br/>
            Long-term, my goal is to keep creating open tools that help people learn, create, and work with
            fewer limits, while also becoming a better engineer with every project I ship.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="rounded bg-[#f5b041] px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-[#d49b3b]"
            >
              View Projects
            </Link>
            <Link
              href="/blog"
              className="rounded border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
            >
              Read Blog
            </Link>
          </div>
        </div>
        <div className="reveal-up delay-3 home-card-marquee w-full overflow-hidden">
          <div className="home-card-track flex w-max items-stretch gap-3 py-1">
            {scrollingCards.map((card, index) => (
              <article
                key={`${card.id}-${index}`}
                className={`w-[18rem] shrink-0 rounded-md border p-3 ${card.tone}`}
              >
                <p className="text-sm font-semibold text-white">{card.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-neutral-300">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="reveal-up delay-4 h-fit w-full">
            <Timeline items={timelineItems} />
        </div>
      </div>
    </div>
  );
}
