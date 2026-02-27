"use client";

import { useEffect, useMemo, useState } from "react";
import { Eye, FileText, Plus, Search, Trash2 } from "lucide-react";
import { useModals } from "@/lib/modals";
import checkAuth from "@/lib/auth";
import { apiUrl } from "@/lib/api-client";
import Checkbox from "@/components/checkbox";

type AssignmentType = "ASSIGNMENT" | "TEST" | "QUIZ" | "NOTES";

interface UploadFilter {
  name: string;
  type: AssignmentType | "";
  answersOnly: boolean;
  freeOnly: boolean;
  teacher: string;
  subject: string;
  hour: string;
  sortBy: "newest" | "oldest";
}

interface Upload {
  id: string;
  name: string;
  type: AssignmentType;
  answers: boolean;
  free: boolean;
  teacher: string;
  subject: string;
  hour: string;
  comments: string;
  createdAt: string;
  deletable: boolean;
  moderationStatus: "PENDING" | "APPROVED" | "REJECTED" | "FLAGGED";
}

function asModerationStatus(value: unknown): "PENDING" | "APPROVED" | "REJECTED" | "FLAGGED" {
  if (value === "PENDING" || value === "APPROVED" || value === "REJECTED" || value === "FLAGGED") {
    return value;
  }
  return "PENDING";
}

function getUploadList(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === "object") {
    const maybe = payload as { uploads?: unknown; items?: unknown };
    if (Array.isArray(maybe.uploads)) return maybe.uploads;
    if (Array.isArray(maybe.items)) return maybe.items;
  }
  return [];
}

function asBoolean(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return normalized === "t" || normalized === "true" || normalized === "1" || normalized === "yes";
  }
  return false;
}

function normalizeUpload(raw: unknown): Upload | null {
  if (!raw || typeof raw !== "object") return null;
  const item = raw as Record<string, unknown>;

  const id = typeof item.id === "string" ? item.id : "";
  if (!id) return null;

  const typeValue = typeof item.type === "string" ? item.type : "ASSIGNMENT";
  const type: AssignmentType =
    typeValue === "TEST" || typeValue === "QUIZ" || typeValue === "ASSIGNMENT" || typeValue === "NOTES" ? typeValue : "ASSIGNMENT";

  return {
    id,
    name: typeof item.name === "string" && item.name.trim() ? item.name : "Untitled upload",
    type,
    answers: asBoolean(item.answers),
    free: asBoolean(item.free),
    teacher: typeof item.teacher === "string" ? item.teacher : "",
    subject: typeof item.subject === "string" ? item.subject : "",
    hour: typeof item.hour === "string" ? item.hour : "",
    comments: typeof item.comments === "string" ? item.comments : "",
    createdAt: typeof item.createdAt === "string" ? item.createdAt : new Date().toISOString(),
    deletable: asBoolean(item.deletable),
    moderationStatus: asModerationStatus(item.moderationStatus),
  };
}

export default function Uploads() {
  const [filters, setFilters] = useState<UploadFilter>({
    name: "",
    type: "",
    answersOnly: false,
    freeOnly: false,
    teacher: "",
    subject: "",
    hour: "",
    sortBy: "newest",
  });
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { openUploadModal, openAuthModal } = useModals();

  const fetchUploads = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(apiUrl("/uploads"), {
        credentials: "include",
        cache: "no-store",
      });
      if (res.ok) {
        const data = (await res.json()) as unknown;
        const list = getUploadList(data);
        const normalized = list
          .map(normalizeUpload)
          .filter((u): u is Upload => Boolean(u))
          .filter((u) => u.moderationStatus === "APPROVED");
        setUploads(normalized);
      } else {
        const payload = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(payload?.error ?? `Failed to fetch uploads (${res.status}).`);
      }
    } catch (error) {
      console.error("Error fetching uploads:", error);
      setError("Error fetching uploads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUploads();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const openViewer = (upload: Upload) => {
    const name = upload.name?.trim() || "upload";
    const viewerParams = new URLSearchParams({
      name,
      free: upload.free ? "1" : "0",
    });
    const viewerUrl = `/cheats/uploads/view/${encodeURIComponent(upload.id)}?${viewerParams.toString()}`;
    window.open(viewerUrl, "_blank", "noopener,noreferrer");
  };

  const handlePreview = async (upload: Upload) => {
    if (upload.free) {
      openViewer(upload);
      return;
    }

    const isValid = await checkAuth();
    if (isValid) {
      openViewer(upload);
      return;
    }

    openAuthModal({
      onSuccess: () => openViewer(upload),
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this upload?")) return;

    try {
      const res = await fetch(apiUrl(`/uploads/${encodeURIComponent(id)}`), {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setUploads((prev) => prev.filter((u) => u.id !== id));
      } else if (res.status === 401 || res.status === 403) {
        openAuthModal();
      } else {
        alert("Failed to delete upload");
      }
    } catch (error) {
      console.error("Error deleting upload:", error);
      alert("Error deleting upload");
    }
  };

  const visibleUploads = useMemo(() => {
    const nameFilter = filters.name.trim().toLowerCase();
    const teacherFilter = filters.teacher.trim().toLowerCase();
    const subjectFilter = filters.subject.trim().toLowerCase();

    const filtered = uploads.filter((upload) => {
      const matchesName = !nameFilter || upload.name.toLowerCase().includes(nameFilter);
      const matchesType = !filters.type || upload.type === filters.type;
      const matchesAnswers = !filters.answersOnly || upload.answers;
      const matchesFree = !filters.freeOnly || upload.free;
      const matchesTeacher = !teacherFilter || upload.teacher.toLowerCase().includes(teacherFilter);
      const matchesSubject = !subjectFilter || upload.subject.toLowerCase().includes(subjectFilter);
      const matchesHour = !filters.hour || upload.hour === filters.hour;
      return matchesName && matchesType && matchesAnswers && matchesFree && matchesTeacher && matchesSubject && matchesHour;
    });

    const sorted = [...filtered];
    sorted.sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        const safeTimeA = Number.isNaN(timeA) ? 0 : timeA;
        const safeTimeB = Number.isNaN(timeB) ? 0 : timeB;

        return filters.sortBy === "oldest" ? safeTimeA - safeTimeB : safeTimeB - safeTimeA;
    });
    return sorted;
  }, [uploads, filters]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-8 px-4 pb-10 pt-10 lg:pt-16">
      <div className="flex w-full max-w-6xl flex-col gap-6">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="text-3xl italic font-light sm:text-4xl">
            tully.sh/cheats/<span className="text-[#FFC17B]">uploads</span>
          </h1>
          <button
            onClick={() =>
              openUploadModal({
                onSuccess: () => {
                  fetchUploads();
                },
              })
            }
            className="flex cursor-pointer items-center gap-2 rounded bg-[#f5b041] px-4 py-2 font-bold text-black transition-colors hover:bg-[#d49b3b]"
          >
            <Plus size={20} />
            Upload New
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 rounded-lg border border-neutral-800 bg-[#1f1f1f] p-4 md:grid-cols-2 lg:grid-cols-6">
          <div className="flex items-center rounded border border-neutral-700 bg-neutral-900 px-3 lg:col-span-3">
            <Search size={18} className="mr-2 text-neutral-500" />
            <input
              type="text"
              name="name"
              placeholder="Search uploads by name..."
              value={filters.name}
              onChange={handleFilterChange}
              className="w-full border-none bg-transparent py-2 text-sm text-white placeholder:text-neutral-600 outline-none"
            />
          </div>

          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white outline-none focus:border-[#f5b041]"
          >
            <option value="">All Types</option>
            <option value="ASSIGNMENT">Assignment</option>
            <option value="TEST">Test</option>
            <option value="QUIZ">Quiz</option>
            <option value="NOTES">Notes</option>
          </select>

          <Checkbox
            id="free-only"
            name="freeOnly"
            checked={filters.freeOnly}
            onChange={(checked) => setFilters((prev) => ({ ...prev, freeOnly: checked }))}
            label="Free Only"
            containerClassName="flex cursor-pointer items-center gap-2 rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white"
            labelClassName="cursor-pointer"
          />

          <Checkbox
            id="answers-only"
            name="answersOnly"
            checked={filters.answersOnly}
            onChange={(checked) => setFilters((prev) => ({ ...prev, answersOnly: checked }))}
            label="Only Answers"
            containerClassName="flex cursor-pointer items-center gap-2 rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white"
            labelClassName="cursor-pointer"
          />

          <select
            name="hour"
            value={filters.hour}
            onChange={handleFilterChange}
            className="rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white outline-none focus:border-[#f5b041]"
          >
            <option value="">All Hours</option>
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <option key={num} value={num.toString()}>
                {num}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>

          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleFilterChange}
            className="rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white outline-none focus:border-[#f5b041]"
          >
            <option value="newest">Most Recent</option>
            <option value="oldest">Oldest</option>
          </select>

          <input
            type="text"
            name="teacher"
            placeholder="Teacher"
            value={filters.teacher}
            onChange={handleFilterChange}
            className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white outline-none focus:border-[#f5b041]"
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={filters.subject}
            onChange={handleFilterChange}
            className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white outline-none focus:border-[#f5b041]"
          />
        </div>

        <div className="flex flex-col gap-2">
          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              {error}
            </div>
          )}
          {loading ? (
            <div className="py-10 text-center text-neutral-500">Loading uploads...</div>
          ) : visibleUploads.length === 0 ? (
            <div className="rounded-lg border border-neutral-800 bg-[#1f1f1f] py-10 text-center text-neutral-500">
              No uploads found matching your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {visibleUploads.map((upload) => (
                <div
                  key={upload.id}
                  className="group flex flex-col rounded-lg border border-neutral-800 bg-[#1f1f1f] p-4 transition-colors hover:border-[#f5b041]/50"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div className="rounded bg-neutral-800 p-2 text-[#f5b041]">
                      <FileText size={24} />
                    </div>
                    <div className="flex items-center gap-2">
                      {upload.answers && (
                        <span className="rounded bg-green-500/10 px-2 py-1 font-mono text-xs text-green-200">
                          Answers
                        </span>
                      )}
                      <span
                        className={`rounded px-2 py-1 font-mono text-xs ${
                          upload.free
                            ? "bg-blue-500/10 text-blue-200"
                            : "bg-amber-500/10 text-amber-200"
                        }`}
                      >
                        {upload.free ? "Free" : "Paid"}
                      </span>
                      <span className="rounded bg-neutral-900 px-2 py-1 font-mono text-xs text-neutral-600">{upload.type}</span>
                    </div>
                  </div>
                  <h3 className="mb-1 truncate font-medium text-white" title={upload.name}>
                    {upload.name}
                  </h3>
                  <div className="mb-4 flex flex-col gap-1 text-xs text-neutral-500">
                    <p className="truncate">
                      {upload.teacher} - {upload.subject}
                    </p>
                    <p>Hour: {upload.hour}</p>
                    <p className="mt-1 text-[10px] text-neutral-600">{new Date(upload.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="mt-auto flex w-full gap-2">
                    <button
                      onClick={() => handlePreview(upload)}
                      className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded bg-neutral-800 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-[#f5b041] hover:text-black"
                    >
                      <Eye size={16} />
                      View
                    </button>
                    {upload.deletable && (
                      <button
                        onClick={() => handleDelete(upload.id)}
                        className="flex cursor-pointer items-center justify-center rounded bg-neutral-800 px-3 py-2 text-neutral-400 transition-colors hover:bg-red-500/20 hover:text-red-500"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
