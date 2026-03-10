"use client";

import { useEffect, useState } from "react";

import GridItem from "@/components/grid-item";

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
