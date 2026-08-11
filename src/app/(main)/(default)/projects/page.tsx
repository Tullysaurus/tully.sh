"use client";

import { useEffect, useState } from "react";

import GridItem from "@/components/grid-item";
import { Star } from "lucide-react";

const GITHUB_USERNAME = "Tullysaurus";

interface ProjectItem {
  id: number;
  title: string;
  description: string | null;
  url: string;
  date: number;
}

interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
}

export default function Projects() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadProjects = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=24&type=owner`,
          {
            headers: {
              Accept: "application/vnd.github+json",
            },
            cache: "no-store",
          },
        );
        if (!response.ok) {
          throw new Error("Failed to load projects.");
        }

        const repos = (await response.json()) as GithubRepo[];

        const data = repos
          .filter((repo) => !repo.fork && !repo.archived)
          .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
          .map((repo) => ({
            id: repo.id,
            title: repo.name,
            description: repo.description,
            url: repo.html_url,
            date: new Date(repo.pushed_at).getTime(),
          }));

        if (!cancelled) {
          setProjects(data);
          setError(null);
        }
      } catch {
        if (!cancelled) {
          setError("Couldn\'t load GitHub repositories right now. Please try again shortly.");
          setProjects([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  const rowDelayClass = (index: number) => {
    const row = Math.floor(index / 3);
    if (row <= 0) return "";
    if (row === 1) return "delay-1";
    if (row === 2) return "delay-2";
    if (row === 3) return "delay-3";
    return "delay-4";
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 pb-10 pt-10 lg:pt-16">
      <h1 className="text-center text-4xl italic font-light sm:text-5xl">
        tully.sh/<span className="text-[#FFC17B]">projects</span>
      </h1>
      <p className="max-w-xl text-center text-base font-semibold sm:text-lg">Live projects pulled from GitHub.</p>

      {/* Featured, standalone project that is not pulled from GitHub */}
      <div className="w-full">
        <div className="reveal-up col-span-1 sm:col-span-2 lg:col-span-3">
          <div
            onClick={() => window.open("https://wasans.tully.sh", "_blank")}
            className="mt-4 cursor-pointer overflow-hidden rounded-lg bg-gradient-to-r from-[#7c3aed] via-[#f43f5e] to-[#f59e0b] p-1 shadow-xl transition hover:scale-[1.01]"
          >
            <div className="flex w-full flex-col gap-4 rounded-md bg-[#0b0b0b] p-6 text-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold italic leading-tight">Wasans</h2>
                  <p className="mt-1 w-full text-sm text-neutral-300">Wasans is my favorite project I&apos;ve created. It serves as a competitive hub for one of my favorite video games, and is used by hundreds of players.</p>
                </div>
              </div>

              <div className="mt-2 flex items-center gap-3 text-sm font-medium text-[#f5b041]">
                Visit Wasans
                <span className="opacity-90">→</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-sm text-neutral-400">Loading projects...</p>
      ) : error ? (
        <p className="text-center text-sm text-neutral-400">{error}</p>
      ) : (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div key={project.id} className={`reveal-up ${rowDelayClass(index)}`}>
              <GridItem
                id={project.title}
                title={project.title}
                description={project.description || "No description provided."}
                url={project.url}
                date={project.date}
                showImage={false}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
