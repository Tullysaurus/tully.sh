'use client';

import GridItem from "@/components/grid-item";

export default function Blog() {
  const loremPosts = [
    {
      id: "201",
      title: "Lorem Notes Vol. I",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
      url: "https://example.com/lorem-notes-1",
      date: 1738281600000,
    },
    {
      id: "202",
      title: "Dolor Sit Amet",
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      url: "https://example.com/dolor-sit-amet",
      date: 1738713600000,
    },
    {
      id: "203",
      title: "Consectetur Adipiscing",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      url: "https://example.com/consectetur-adipiscing",
      date: 1739145600000,
    },
    {
      id: "204",
      title: "Eiusmod Tempor",
      description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      url: "https://example.com/eiusmod-tempor",
      date: 1739577600000,
    },
    {
      id: "205",
      title: "Incididunt Labore",
      description: "Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.",
      url: "https://example.com/incididunt-labore",
      date: 1740009600000,
    },
    {
      id: "206",
      title: "Aliquip Ex Ea",
      description: "Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.",
      url: "https://example.com/aliquip-ex-ea",
      date: 1740441600000,
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 pb-10 pt-10 lg:pt-16">
      <h1 className="text-center text-4xl italic font-light sm:text-5xl">tully.sh/<span className="text-[#FFC17B]">blog</span></h1>

      <p className="max-w-xl text-center text-base font-semibold sm:text-lg">
        Lorem ipsum posts and writeups.
      </p>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loremPosts.map((item) => (
          <GridItem
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            url={item.url}
            date={item.date}
            onclick={() => Promise.resolve(true)}
          />
        ))}
      </div>
    </div>
  );
}
