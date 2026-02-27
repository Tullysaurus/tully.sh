import ScriptsGrid from "@/components/scripts-grid";

// Type definition for your R2 data
interface Scripts {
  [key: string]: {
    title: string | null;
    description: string | null;
    id: string | null;
    url: string | null;
    date: number | null;
  };
}

export default async function ScriptsPage() {
  const scripts: Scripts | null = await fetch("https://r2.tully.sh/scripts/scripts.json", {
    next: { revalidate: 60 } // Cache for 1 minute
  })
    .then((res) => res.json()).then((json) => json as Scripts)
    .catch(() => (null));

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center gap-8 pb-10 pt-10 lg:pt-16">
      <h1 className="px-4 text-center text-4xl italic font-light sm:text-5xl">tully.sh/cheats/<span className="text-[#FFC17B]">scripts</span></h1>
      {
        scripts && (
          <ScriptsGrid scripts={scripts} />
        )
      }
    </div>
  );
}
