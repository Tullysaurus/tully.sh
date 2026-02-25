'use client';

import GridItem from "@/components/grid-item";

export default function Projects() {
  const rowDelayClass = (index: number) => {
    const row = Math.floor(index / 3);
    if (row <= 0) return "";
    if (row === 1) return "delay-1";
    if (row === 2) return "delay-2";
    if (row === 3) return "delay-3";
    return "delay-4";
  };

  const loremProjects = [
    {
      id: "101",
      title: "Lorem Ipsum Dolor",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
      url: "https://example.com/lorem-ipsum-dolor",
      date: 1735689600000,
    },
    {
      id: "102",
      title: "Amet Consectetur",
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
      url: "https://example.com/amet-consectetur",
      date: 1736121600000,
    },
    {
      id: "103",
      title: "Tempor Incididunt",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      url: "https://example.com/tempor-incididunt",
      date: 1736553600000,
    },
    {
      id: "104",
      title: "Labore Et Dolore",
      description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est.",
      url: "https://example.com/labore-et-dolore",
      date: 1736985600000,
    },
    {
      id: "105",
      title: "Magna Aliqua",
      description: "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra.",
      url: "https://example.com/magna-aliqua",
      date: 1737417600000,
    },
    {
      id: "106",
      title: "Nostrud Exercitation",
      description: "Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula donec lobortis.",
      url: "https://example.com/nostrud-exercitation",
      date: 1737849600000,
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 pb-10 pt-10 lg:pt-16">
      <h1 className="text-center text-4xl italic font-light sm:text-5xl">tully.sh/<span className="text-[#FFC17B]">projects</span></h1>
      <p className="max-w-xl text-center text-base font-semibold sm:text-lg">
        Lorem ipsum projects and experiments.
      </p>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loremProjects.map((item, index) => (
          <div key={item.id} className={`reveal-up ${rowDelayClass(index)}`}>
            <GridItem
              id={item.id}
              title={item.title}
              description={item.description}
              url={item.url}
              date={item.date}
              onclick={() => Promise.resolve(true)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
