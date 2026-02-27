"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import JSZip from "jszip";
import { ChevronLeft, ChevronRight, Download, Loader2 } from "lucide-react";
import checkAuth from "@/lib/auth";
import { useModals } from "@/lib/modals";

type PreviewImage = {
  name: string;
  url: string;
};

type AuthStatus = "checking" | "valid" | "invalid";

function revokePreviewImages(images: PreviewImage[]) {
  images.forEach((img) => URL.revokeObjectURL(img.url));
}

async function fetchZipBlobWithCache(uploadId: string, zipUrl: string) {
  if (typeof window === "undefined" || !("caches" in window)) {
    const response = await fetch(zipUrl, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Failed to fetch upload archive.");
    }
    return response.blob();
  }

  const cache = await caches.open("uploads-viewer-v1");
  const cacheKey = new Request(`/api/uploads/${uploadId}?viewer-cache=1`, { method: "GET" });
  const cachedResponse = await cache.match(cacheKey);

  if (cachedResponse) {
    return cachedResponse.blob();
  }

  const response = await fetch(zipUrl, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Failed to fetch upload archive.");
  }

  await cache.put(cacheKey, response.clone());
  return response.blob();
}

export default function UploadViewerPage() {
  const params = useParams<{ id: string | string[] }>();
  const searchParams = useSearchParams();
  const router = useRouter();
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

  const zipUrl = useMemo(() => (uploadId ? `/api/uploads/${uploadId}` : ""), [uploadId]);

  const [authStatus, setAuthStatus] = useState<AuthStatus>("checking");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState<PreviewImage[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    return () => {
      revokePreviewImages(images);
    };
  }, [images]);

  const checkAccess = useCallback(async () => {
    const isValid = await checkAuth();
    if (isValid) {
      setAuthStatus("valid");
      return;
    }

    setAuthStatus("invalid");
    openAuthModal({
      onSuccess: () => setAuthStatus("valid"),
    });
  }, [openAuthModal]);

  useEffect(() => {
    if (!uploadId) {
      setAuthStatus("invalid");
      setError("Missing upload id.");
      return;
    }

    checkAccess();
  }, [checkAccess, uploadId]);

  useEffect(() => {
    if (authStatus !== "valid" || !uploadId || !zipUrl) return;

    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError("");
      setIndex(0);
      setImages((prev) => {
        revokePreviewImages(prev);
        return [];
      });

      try {
        const zipBlob = await fetchZipBlobWithCache(uploadId, zipUrl);
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
  }, [authStatus, uploadId, zipUrl]);

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

      {authStatus === "checking" || loading ? (
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 text-neutral-300">
          <Loader2 className="animate-spin" size={28} />
          <p>{authStatus === "checking" ? "Checking access key..." : "Loading and extracting images..."}</p>
        </div>
      ) : error ? (
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 text-center text-neutral-300">
          <p className="text-red-400">{error}</p>
          <button
            onClick={goBack}
            className="rounded bg-neutral-800 px-3 py-2 text-sm transition-colors hover:bg-neutral-700"
          >
            Back to uploads
          </button>
        </div>
      ) : authStatus === "invalid" ? (
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 text-neutral-300">
          <p>A valid key is required to view this upload.</p>
          <button
            onClick={checkAccess}
            className="rounded bg-neutral-800 px-3 py-2 text-sm transition-colors hover:bg-neutral-700"
          >
            Check access again
          </button>
        </div>
      ) : images.length > 0 ? (
        <>
          <div className="flex min-h-0 flex-1 items-center justify-center gap-3">
            <button
              onClick={showPrev}
              className="cursor-pointer rounded-full bg-black/30 p-2 text-neutral-300 transition-colors hover:text-white"
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>

            <div className="flex h-full min-w-0 flex-1 items-center justify-center overflow-auto rounded-md border border-neutral-800 bg-[#111]">
              <img
                src={images[index].url}
                alt={images[index].name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <button
              onClick={showNext}
              className="cursor-pointer rounded-full bg-black/30 p-2 text-neutral-300 transition-colors hover:text-white"
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>
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
