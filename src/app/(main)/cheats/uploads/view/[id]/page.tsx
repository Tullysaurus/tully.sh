"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import JSZip from "jszip";
import { ChevronLeft, ChevronRight, Download, Loader2, Maximize2, Minimize2 } from "lucide-react";
import { useModals } from "@/lib/modals";
import { apiUrl } from "@/lib/api-client";

type PreviewImage = {
  name: string;
  url: string;
};

class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized");
    this.name = "UnauthorizedError";
  }
}

function revokePreviewImages(images: PreviewImage[]) {
  images.forEach((img) => URL.revokeObjectURL(img.url));
}

async function fetchZipBlobWithCache(zipUrl: string) {
  if (typeof window === "undefined" || !("caches" in window)) {
    const response = await fetch(zipUrl, { cache: "no-store", credentials: "include" });
    if (response.status === 401) {
      throw new UnauthorizedError();
    }
    if (!response.ok) {
      throw new Error("Failed to fetch upload archive.");
    }
    return response.blob();
  }

  const cache = await caches.open("uploads-viewer-v1");
  const cacheKey = new Request(zipUrl, { method: "GET" });
  const cachedResponse = await cache.match(cacheKey);

  if (cachedResponse) {
    return cachedResponse.blob();
  }

  const response = await fetch(zipUrl, { cache: "no-store", credentials: "include" });
  if (response.status === 401) {
    throw new UnauthorizedError();
  }
  if (!response.ok) {
    throw new Error("Failed to fetch upload archive.");
  }

  await cache.put(cacheKey, response.clone());
  return response.blob();
}

export default function UploadViewerPage() {
  const params = useParams<{ id: string | string[] }>();
  const searchParams = useSearchParams();
  const { openAuthModal } = useModals();

  const uploadId = useMemo(() => {
    const id = params?.id;
    if (Array.isArray(id)) return id[0] || "";
    return id || "";
  }, [params]);

  const displayName = useMemo(() => {
    const raw = searchParams.get("name");
    return raw?.trim() || "upload";
  }, [searchParams]);

  const zipUrl = useMemo(() => (uploadId ? apiUrl(`/uploads/${uploadId}`) : ""), [uploadId]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [needsAuth, setNeedsAuth] = useState(false);
  const [images, setImages] = useState<PreviewImage[]>([]);
  const [index, setIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const imagePaneRef = useRef<HTMLDivElement | null>(null);
  const authPromptShownRef = useRef(false);

  useEffect(() => {
    return () => {
      revokePreviewImages(images);
    };
  }, [images]);

  useEffect(() => {
    if (!uploadId || !zipUrl) {
      setError("Missing upload id.");
      return;
    }

    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError("");
      setNeedsAuth(false);
      setIndex(0);
      setImages((prev) => {
        revokePreviewImages(prev);
        return [];
      });

      try {
        const zipBlob = await fetchZipBlobWithCache(zipUrl);
        const zip = await JSZip.loadAsync(zipBlob);
        const imageEntries = Object.values(zip.files).filter(
          (file) =>
            !file.dir &&
            (file.name.toLowerCase().endsWith(".jpg") || file.name.toLowerCase().endsWith(".jpeg")),
        );

        if (imageEntries.length === 0) {
          throw new Error("No JPG files were found in this archive.");
        }

        const extractedImages = await Promise.all(
          imageEntries.map(async (file) => {
            const blob = await file.async("blob");
            return {
              name: file.name.split("/").pop() || file.name,
              url: URL.createObjectURL(blob),
            };
          }),
        );

        if (!cancelled) {
          setImages(extractedImages);
        } else {
          revokePreviewImages(extractedImages);
        }
      } catch (loadError) {
        if (!cancelled) {
          if (loadError instanceof UnauthorizedError) {
            setNeedsAuth(true);
            setError("A valid key is required to view this upload.");
            if (!authPromptShownRef.current) {
              authPromptShownRef.current = true;
              openAuthModal({
                onSuccess: () => window.location.reload(),
              });
            }
            return;
          }
          setError(loadError instanceof Error ? loadError.message : "Failed to open upload preview.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [uploadId, zipUrl, openAuthModal]);

  const showPrev = () => {
    setIndex((prev) => {
      if (images.length === 0) return 0;
      return (prev - 1 + images.length) % images.length;
    });
  };

  const showNext = () => {
    setIndex((prev) => {
      if (images.length === 0) return 0;
      return (prev + 1) % images.length;
    });
  };

  const goBack = () => {
    window.close();
  };

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-[#171717] p-4 lg:h-screen">
      <div className="mb-4 flex items-center justify-between gap-3">
        <button
          onClick={goBack}
          className="cursor-pointer rounded bg-neutral-800 px-3 py-2 text-sm text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-white"
        >
          Back
        </button>

        <a
          href={zipUrl}
          download={`${displayName}.zip`}
          className="flex items-center gap-1 rounded bg-neutral-800 px-3 py-2 text-sm text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-white"
        >
          <Download size={14} />
          Download ZIP
        </a>
      </div>

      {loading ? (
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 text-neutral-300">
          <Loader2 className="animate-spin" size={28} />
          <p>Loading and extracting images...</p>
        </div>
      ) : error ? (
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 text-center text-neutral-300">
          <p className="text-red-400">{error}</p>
          {needsAuth && (
            <button
              onClick={() =>
                openAuthModal({
                  onSuccess: () => window.location.reload(),
                })
              }
              className="rounded bg-neutral-800 px-3 py-2 text-sm transition-colors hover:bg-neutral-700"
            >
              Authenticate and Retry
            </button>
          )}
          <button
            onClick={goBack}
            className="rounded bg-neutral-800 px-3 py-2 text-sm transition-colors hover:bg-neutral-700"
          >
            Back to uploads
          </button>
        </div>
      ) : images.length > 0 ? (
        <>
          <div
            className={
              isExpanded
                ? "fixed inset-0 z-50 flex items-center justify-center gap-2 bg-[#171717] p-2"
                : "flex min-h-0 flex-1 items-center justify-center gap-3"
            }
          >
            {!isExpanded && (
              <button
                onClick={showPrev}
                className="cursor-pointer rounded-full bg-black/30 p-2 text-neutral-300 transition-colors hover:text-white"
                aria-label="Previous image"
              >
                <ChevronLeft size={22} />
              </button>
            )}

            <div
              ref={imagePaneRef}
              className={`relative flex h-full min-w-0 flex-1 items-center justify-center bg-[#111] ${
                isExpanded ? "overflow-hidden rounded-none border-0 p-2" : "overflow-auto rounded-md border border-neutral-800"
              }`}
            >
              {isExpanded && (
                <button
                  onClick={showPrev}
                  className="absolute left-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-black/50 p-2 text-neutral-300 transition-colors hover:text-white"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={22} />
                </button>
              )}
              <button
                onClick={toggleExpanded}
                className="absolute right-2 top-2 z-10 cursor-pointer rounded bg-black/50 p-2 text-neutral-300 transition-colors hover:text-white"
                aria-label={isExpanded ? "Exit expanded view" : "Enter expanded view"}
              >
                {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
              {isExpanded && (
                <button
                  onClick={showNext}
                  className="absolute right-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-black/50 p-2 text-neutral-300 transition-colors hover:text-white"
                  aria-label="Next image"
                >
                  <ChevronRight size={22} />
                </button>
              )}
              <img
                src={images[index].url}
                alt={images[index].name}
                className={
                  isExpanded
                    ? "h-[calc(100%-0.5rem)] w-[calc(100%-0.5rem)] object-contain"
                    : "max-h-full max-w-full object-contain"
                }
              />
            </div>

            {!isExpanded && (
              <button
                onClick={showNext}
                className="cursor-pointer rounded-full bg-black/30 p-2 text-neutral-300 transition-colors hover:text-white"
                aria-label="Next image"
              >
                <ChevronRight size={22} />
              </button>
            )}
          </div>

          <div className="pt-3 text-center text-sm text-neutral-300">
            {index + 1} / {images.length}
          </div>
        </>
      ) : (
        <div className="flex min-h-0 flex-1 items-center justify-center text-neutral-300">
          No preview images found.
        </div>
      )}
    </div>
  );
}
