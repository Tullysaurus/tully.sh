"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import JSZip from "jszip";
import { ChevronLeft, ChevronRight, Download, Eye, FileText, Loader2, Plus, Search, Trash2, X } from "lucide-react";
import checkAuth from "@/lib/auth";
import { useModals } from "@/lib/modals";

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
  answers: boolean;
  teacher: string;
  subject: string;
  hour: string;
  comments: string;
  createdAt: string;
  deletable: boolean;
}

interface UploadFromApi extends Omit<Upload, "answers"> {
  answer?: boolean | string | number | null;
  answers?: boolean | string | number | null;
}

type PreviewImage = {
  name: string;
  url: string;
};

function revokePreviewImages(images: PreviewImage[]) {
  images.forEach((img) => URL.revokeObjectURL(img.url));
}

export default function Uploads() {
  const [filters, setFilters] = useState<UploadFilter>({
    name: "",
    type: "",
    teacher: "",
    subject: "",
    hour: "",
  });
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState("");
  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([]);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [previewZipUrl, setPreviewZipUrl] = useState("");
  const [previewZipName, setPreviewZipName] = useState("upload.zip");
  const { openAuthModal, openUploadModal } = useModals();

  useEffect(() => {
    return () => {
      revokePreviewImages(previewImages);
    };
  }, [previewImages]);

  const fetchUploads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      const res = await fetch(`/api/uploads?${params.toString()}`);
      if (res.ok) {
        const data = (await res.json()) as UploadFromApi[];
        setUploads(
          data.map((upload) => ({
            ...upload,
            answers:
              upload.answer === true ||
              upload.answer === "true" ||
              upload.answer === 1 ||
              upload.answer === "1" ||
              upload.answers === true ||
              upload.answers === "true" ||
              upload.answers === 1 ||
              upload.answers === "1",
          })),
        );
      } else {
        console.error("Failed to fetch uploads");
      }
    } catch (error) {
      console.error("Error fetching uploads:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUploads();
  }, [fetchUploads]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const closePreview = () => {
    setPreviewOpen(false);
    setPreviewLoading(false);
    setPreviewError("");
    setPreviewIndex(0);
    setPreviewZipUrl("");
    setPreviewZipName("upload.zip");
    setPreviewImages((prev) => {
      revokePreviewImages(prev);
      return [];
    });
  };

  const handlePreview = async (upload: Upload) => {
    const isAuth = await checkAuth();
    if (!isAuth) {
      openAuthModal();
      return;
    }

    const zipUrl = `/api/uploads/${upload.id}`;
    setPreviewOpen(true);
    setPreviewLoading(true);
    setPreviewError("");
    setPreviewIndex(0);
    setPreviewZipUrl(zipUrl);
    setPreviewZipName(`${upload.name || "upload"}.zip`);
    setPreviewImages((prev) => {
      revokePreviewImages(prev);
      return [];
    });

    try {
      const res = await fetch(zipUrl);
      if (!res.ok) {
        throw new Error("Failed to fetch upload archive.");
      }
      const zipBlob = await res.blob();
      const zip = await JSZip.loadAsync(zipBlob);
      const imageEntries = Object.values(zip.files).filter(
        (file) =>
          !file.dir &&
          (file.name.toLowerCase().endsWith(".jpg") || file.name.toLowerCase().endsWith(".jpeg")),
      );

      if (imageEntries.length === 0) {
        throw new Error("No JPG files were found in this archive.");
      }

      const images = await Promise.all(
        imageEntries.map(async (file) => {
          const blob = await file.async("blob");
          return {
            name: file.name.split("/").pop() || file.name,
            url: URL.createObjectURL(blob),
          };
        }),
      );

      setPreviewImages(images);
    } catch (error) {
      setPreviewError(error instanceof Error ? error.message : "Failed to open upload preview.");
    } finally {
      setPreviewLoading(false);
    }
  };

  const showPrev = () => {
    setPreviewIndex((prev) => {
      if (previewImages.length === 0) return 0;
      return (prev - 1 + previewImages.length) % previewImages.length;
    });
  };

  const showNext = () => {
    setPreviewIndex((prev) => {
      if (previewImages.length === 0) return 0;
      return (prev + 1) % previewImages.length;
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this upload?")) return;

    try {
      const res = await fetch(`/api/uploads?id=${id}`, { method: "DELETE" });
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

  const filteredUploads = useMemo(
    () => {
      const nameFilter = filters.name.trim().toLowerCase();
      const teacherFilter = filters.teacher.trim().toLowerCase();
      const subjectFilter = filters.subject.trim().toLowerCase();

      return uploads.filter((upload) => {
        const matchesName = !nameFilter || upload.name.toLowerCase().includes(nameFilter);
        const matchesType = !filters.type || upload.type === filters.type;
        const matchesTeacher = !teacherFilter || upload.teacher.toLowerCase().includes(teacherFilter);
        const matchesSubject = !subjectFilter || upload.subject.toLowerCase().includes(subjectFilter);
        const matchesHour = !filters.hour || upload.hour === filters.hour;

        return matchesName && matchesType && matchesTeacher && matchesSubject && matchesHour;
      });
    },
    [uploads, filters],
  );

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

        <div className="grid grid-cols-1 gap-4 rounded-lg border border-neutral-800 bg-[#1f1f1f] p-4 md:grid-cols-2 lg:grid-cols-5">
          <div className="flex items-center rounded border border-neutral-700 bg-neutral-900 px-3 lg:col-span-2">
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
          ) : filteredUploads.length === 0 ? (
            <div className="rounded-lg border border-neutral-800 bg-[#1f1f1f] py-10 text-center text-neutral-500">
              No uploads found matching your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredUploads.map((upload) => (
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

      {previewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative flex h-[90vh] w-full max-w-5xl flex-col rounded-lg border border-neutral-700 bg-[#171717] p-4">
            <button
              onClick={closePreview}
              className="absolute right-3 top-3 z-20 rounded bg-black/30 p-1 text-neutral-300 transition-colors hover:text-white cursor-pointer"
              aria-label="Close preview"
            >
              <X size={18} />
            </button>

            <a
              href={previewZipUrl}
              download={previewZipName}
              className="absolute left-3 top-3 z-20 flex items-center gap-1 rounded bg-black/30 px-2 py-1 text-xs text-neutral-300 transition-colors hover:text-white"
            >
              <Download size={14} />
              ZIP
            </a>

            {previewLoading ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-neutral-300">
                <Loader2 className="animate-spin" size={28} />
                <p>Loading and extracting images...</p>
              </div>
            ) : previewError ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center text-neutral-300">
                <p className="text-red-400">{previewError}</p>
                <button
                  onClick={closePreview}
                  className="rounded bg-neutral-800 px-3 py-2 text-sm transition-colors hover:bg-neutral-700"
                >
                  Close
                </button>
              </div>
            ) : previewImages.length > 0 ? (
              <>
                <div className="flex h-full items-center justify-center gap-3 pt-6">
                  <button
                    onClick={showPrev}
                    className="rounded-full bg-black/30 p-2 text-neutral-300 transition-colors hover:text-white cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={22} />
                  </button>

                  <div className="flex h-[68vh] w-full max-w-4xl items-center justify-center overflow-hidden rounded-md border border-neutral-800 bg-[#111]">
                    <img
                      src={previewImages[previewIndex].url}
                      alt={previewImages[previewIndex].name}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <button
                    onClick={showNext}
                    className="rounded-full bg-black/30 p-2 text-neutral-300 transition-colors hover:text-white cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight size={22} />
                  </button>
                </div>
                <div className="pt-3 text-center text-sm text-neutral-300">
                  {previewIndex + 1} / {previewImages.length}
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
