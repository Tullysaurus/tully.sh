"use client";

import { useCallback, useEffect, useState } from "react";
import { Download, FileText, Plus, Search, Trash2 } from "lucide-react";
import AuthModal from "@/components/auth-modal";
import UploadModal from "@/components/upload-modal";
import checkAuth from "@/lib/auth";

type AssignmentType = "ASSIGNMENT" | "TEST" | "QUIZ" | "NOTES";

interface UploadFilter {
  name: string;
  type: AssignmentType | "";
  teacher: string;
  subject: string;
  hour: string;
}

interface Upload {
  id: string;
  name: string;
  type: AssignmentType;
  teacher: string;
  subject: string;
  hour: string;
  comments: string;
  createdAt: string;
  deletable: boolean;
}

export default function Uploads() {
  const [modalOpen, setModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [filters, setFilters] = useState<UploadFilter>({
    name: "",
    type: "",
    teacher: "",
    subject: "",
    hour: "",
  });
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUploads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.name) params.append("name", filters.name);
      if (filters.type) params.append("type", filters.type);
      if (filters.teacher) params.append("teacher", filters.teacher);
      if (filters.subject) params.append("subject", filters.subject);
      if (filters.hour) params.append("hour", filters.hour);
      params.append("key", Object.fromEntries(document.cookie.split("; ").map((c) => c.split("=")))["auth"] || "");

      const res = await fetch(`https://api.tully.sh/uploads?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setUploads(data as Upload[]);
      } else {
        console.error("Failed to fetch uploads");
      }
    } catch (error) {
      console.error("Error fetching uploads:", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUploads();
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchUploads]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleDownload = async (id: string) => {
    const key = Object.fromEntries(document.cookie.split("; ").map((c) => c.split("=")))["auth"] || "";
    const isAuth = await checkAuth(key);
    if (isAuth) {
      window.open(`https://r2.tully.sh/uploads/${id}.zip`, "_blank");
    } else {
      setAuthModalOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this upload?")) return;
    const key = Object.fromEntries(document.cookie.split("; ").map((c) => c.split("=")))["auth"] || "";

    try {
      const res = await fetch(`https://api.tully.sh/uploads?id=${id}&key=${key}`, { method: "DELETE" });
      if (res.ok) {
        setUploads((prev) => prev.filter((u) => u.id !== id));
      } else {
        alert("Failed to delete upload");
      }
    } catch (error) {
      console.error("Error deleting upload:", error);
      alert("Error deleting upload");
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-8 px-4 pb-10 pt-10 lg:pt-16">
      <div className="flex w-full max-w-6xl flex-col gap-6">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="text-3xl italic font-light sm:text-4xl">
            tully.sh/cheats/<span className="text-[#FFC17B]">uploads</span>
          </h1>
          <button
            onClick={() => setModalOpen(true)}
            className="flex cursor-pointer items-center gap-2 rounded bg-[#f5b041] px-4 py-2 font-bold text-black transition-colors hover:bg-[#d49b3b]"
          >
            <Plus size={20} />
            Upload New
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 rounded-lg border border-neutral-800 bg-[#1f1f1f] p-4 md:grid-cols-2 lg:grid-cols-5">
          <div className="flex items-center rounded border border-neutral-700 bg-neutral-900 px-3 lg:col-span-2">
            <Search size={18} className="mr-2 text-neutral-500" />
            <input
              type="text"
              name="name"
              placeholder="Search by name..."
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
        </div>

        <div className="flex flex-col gap-2">
          {loading ? (
            <div className="py-10 text-center text-neutral-500">Loading uploads...</div>
          ) : uploads.length === 0 ? (
            <div className="rounded-lg border border-neutral-800 bg-[#1f1f1f] py-10 text-center text-neutral-500">
              No uploads found matching your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {uploads.map((upload) => (
                <div
                  key={upload.id}
                  className="group flex flex-col rounded-lg border border-neutral-800 bg-[#1f1f1f] p-4 transition-colors hover:border-[#f5b041]/50"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div className="rounded bg-neutral-800 p-2 text-[#f5b041]">
                      <FileText size={24} />
                    </div>
                    <span className="rounded bg-neutral-900 px-2 py-1 font-mono text-xs text-neutral-600">{upload.type}</span>
                  </div>
                  <h3 className="mb-1 truncate font-medium text-white" title={upload.name}>
                    {upload.name}
                  </h3>
                  <div className="mb-4 flex flex-col gap-1 text-xs text-neutral-500">
                    <p className="truncate">
                      {upload.teacher} • {upload.subject}
                    </p>
                    <p>Hour: {upload.hour}</p>
                    <p className="mt-1 text-[10px] text-neutral-600">{new Date(upload.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="mt-auto flex w-full gap-2">
                    <button
                      onClick={() => handleDownload(upload.id)}
                      className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded bg-neutral-800 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-[#f5b041] hover:text-black"
                    >
                      <Download size={16} />
                      Download
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

      <UploadModal
        visible={modalOpen}
        onClose={() => {
          setModalOpen(false);
          window.location.reload();
        }}
        onSuccess={() => {
          setModalOpen(false);
          window.location.reload();
        }}
      />
      {authModalOpen && <AuthModal onClose={() => setAuthModalOpen(false)} />}
    </div>
  );
}
