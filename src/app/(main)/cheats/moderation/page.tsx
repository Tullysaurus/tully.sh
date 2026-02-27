"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, Download, Eye, Flag, Loader2, ShieldAlert, X } from "lucide-react";
import { useModals } from "@/lib/modals";
import { apiUrl } from "@/lib/api-client";

type AssignmentType = "ASSIGNMENT" | "TEST" | "QUIZ" | "NOTES";
type ModerationStatus = "PENDING" | "APPROVED" | "REJECTED" | "FLAGGED";

type ModerationUpload = {
  id: string;
  name: string;
  type: AssignmentType;
  answers: boolean;
  free: boolean;
  teacher: string;
  subject: string;
  hour: string;
  createdAt: string;
  moderationStatus: ModerationStatus;
  moderationReason: string;
};

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

function asModerationStatus(value: unknown): ModerationStatus {
  if (value === "PENDING" || value === "APPROVED" || value === "REJECTED" || value === "FLAGGED") return value;
  return "PENDING";
}

function normalizeModerationUpload(raw: unknown): ModerationUpload | null {
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
    createdAt: typeof item.createdAt === "string" ? item.createdAt : new Date().toISOString(),
    moderationStatus: asModerationStatus(item.moderationStatus),
    moderationReason: typeof item.moderationReason === "string" ? item.moderationReason : "",
  };
}

function moderationBadge(status: ModerationStatus) {
  if (status === "APPROVED") return "bg-green-500/10 text-green-200";
  if (status === "FLAGGED") return "bg-amber-500/10 text-amber-200";
  if (status === "REJECTED") return "bg-red-500/10 text-red-200";
  return "bg-neutral-700/30 text-neutral-300";
}

export default function ModerationPage() {
  const { openAuthModal } = useModals();
  const [uploads, setUploads] = useState<ModerationUpload[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [take, setTake] = useState(50);
  const [statusFilter, setStatusFilter] = useState<ModerationStatus[]>(["PENDING", "FLAGGED"]);

  const fetchQueue = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      params.set("status", statusFilter.join(","));
      params.set("take", String(Math.min(Math.max(take, 1), 100)));

      const res = await fetch(apiUrl(`/moderation/uploads?${params.toString()}`), {
        credentials: "include",
        cache: "no-store",
        signal,
      });

      if (res.status === 401 || res.status === 403) {
        setError("Moderator access required.");
        openAuthModal();
        setUploads([]);
        return;
      }

      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(payload?.error ?? `Failed to fetch moderation queue (${res.status}).`);
        setUploads([]);
        return;
      }

      const data = (await res.json()) as unknown;
      const list = getUploadList(data);
      setUploads(list.map(normalizeModerationUpload).filter((u): u is ModerationUpload => Boolean(u)));
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError("Failed to fetch moderation queue.");
    } finally {
      setLoading(false);
    }
  }, [openAuthModal, statusFilter, take]);

  useEffect(() => {
    const controller = new AbortController();
    fetchQueue(controller.signal);
    return () => controller.abort();
  }, [fetchQueue]);

  const openViewer = (upload: ModerationUpload) => {
    const params = new URLSearchParams({
      name: upload.name,
      free: upload.free ? "1" : "0",
      source: "moderation",
    });
    window.open(`/cheats/uploads/view/${encodeURIComponent(upload.id)}?${params.toString()}`, "_blank", "noopener,noreferrer");
  };

  const moderate = async (uploadId: string, action: "approve" | "flag" | "reject", reason?: string) => {
    setError("");
    const res = await fetch(apiUrl(`/moderation/uploads/${encodeURIComponent(uploadId)}`), {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        action === "approve"
          ? { action }
          : { action, reason: (reason ?? "").trim() },
      ),
    });

    if (res.status === 401 || res.status === 403) {
      setError("Moderator access required.");
      openAuthModal();
      return;
    }

    if (!res.ok) {
      const payload = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(payload?.error ?? `Moderation failed (${res.status}).`);
      return;
    }

    setUploads((prev) => prev.filter((u) => u.id !== uploadId));
  };

  const statusLabel = useMemo(() => statusFilter.join(", "), [statusFilter]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-8 px-4 pb-10 pt-10 lg:pt-16">
      <div className="flex w-full max-w-6xl flex-col gap-6">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="text-3xl italic font-light sm:text-4xl">
            tully.sh/cheats/<span className="text-[#FFC17B]">moderation</span>
          </h1>
          <div className="flex items-center gap-2">
            <span className="rounded bg-neutral-800 px-2 py-1 text-xs text-neutral-300">{statusLabel}</span>
            <button
              onClick={() => fetchQueue()}
              className="flex cursor-pointer items-center gap-2 rounded bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-200 transition-colors hover:bg-neutral-700"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : <ShieldAlert size={16} />}
              Refresh
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 rounded-lg border border-neutral-800 bg-[#1f1f1f] p-4 md:grid-cols-2 lg:grid-cols-6">
          <div className="flex flex-col gap-2 lg:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Statuses</label>
            <div className="flex flex-wrap gap-2">
              {(["PENDING", "FLAGGED", "REJECTED", "APPROVED"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() =>
                    setStatusFilter((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))
                  }
                  className={
                    "rounded px-2 py-1 text-xs font-semibold transition-colors " +
                    (statusFilter.includes(s) ? "bg-[#f5b041] text-black" : "bg-neutral-900 text-neutral-300 hover:bg-neutral-800")
                  }
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 lg:col-span-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Take</label>
            <input
              type="number"
              value={take}
              min={1}
              max={100}
              onChange={(e) => setTake(Number(e.target.value || "50"))}
              className="rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white outline-none focus:border-[#f5b041]"
            />
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {loading ? (
          <div className="py-10 text-center text-neutral-500">Loading moderation queue...</div>
        ) : uploads.length === 0 ? (
          <div className="rounded-lg border border-neutral-800 bg-[#1f1f1f] py-10 text-center text-neutral-500">
            No uploads in this queue.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {uploads.map((upload) => (
              <div key={upload.id} className="flex flex-col gap-3 rounded-lg border border-neutral-800 bg-[#1f1f1f] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white" title={upload.name}>
                      {upload.name}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">
                      {upload.teacher} {upload.subject ? `• ${upload.subject}` : ""} {upload.hour ? `• Hour ${upload.hour}` : ""}
                    </p>
                  </div>
                  <span className={`rounded px-2 py-1 font-mono text-xs ${moderationBadge(upload.moderationStatus)}`}>
                    {upload.moderationStatus}
                  </span>
                </div>

                {upload.moderationReason && (
                  <p className="rounded bg-neutral-900 p-2 text-xs text-neutral-300">
                    Reason: {upload.moderationReason}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded bg-neutral-900 px-2 py-1 font-mono text-neutral-300">{upload.type}</span>
                  {upload.answers && <span className="rounded bg-green-500/10 px-2 py-1 font-mono text-green-200">Answers</span>}
                  <span className={`rounded px-2 py-1 font-mono ${upload.free ? "bg-blue-500/10 text-blue-200" : "bg-amber-500/10 text-amber-200"}`}>
                    {upload.free ? "Free" : "Private"}
                  </span>
                </div>

                <div className="mt-1 flex w-full gap-2">
                  <button
                    onClick={() => openViewer(upload)}
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded bg-neutral-800 py-2 text-sm font-medium text-neutral-200 transition-colors hover:bg-[#f5b041] hover:text-black"
                  >
                    <Eye size={16} />
                    View
                  </button>
                  <a
                    href={apiUrl(`/moderation/uploads/${encodeURIComponent(upload.id)}`)}
                    className="flex cursor-pointer items-center justify-center rounded bg-neutral-800 px-3 py-2 text-neutral-300 transition-colors hover:bg-neutral-700"
                    title="Download ZIP"
                  >
                    <Download size={16} />
                  </a>
                </div>

                <div className="flex w-full gap-2">
                  <button
                    onClick={() => moderate(upload.id, "approve")}
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded bg-green-500/10 py-2 text-sm font-semibold text-green-200 transition-colors hover:bg-green-500/20"
                  >
                    <Check size={16} />
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      const reason = prompt("Flag reason:");
                      if (!reason?.trim()) return;
                      moderate(upload.id, "flag", reason);
                    }}
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded bg-amber-500/10 py-2 text-sm font-semibold text-amber-200 transition-colors hover:bg-amber-500/20"
                  >
                    <Flag size={16} />
                    Flag
                  </button>
                  <button
                    onClick={() => {
                      const reason = prompt("Reject reason (required):");
                      if (!reason?.trim()) return;
                      moderate(upload.id, "reject", reason);
                    }}
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded bg-red-500/10 py-2 text-sm font-semibold text-red-200 transition-colors hover:bg-red-500/20"
                  >
                    <X size={16} />
                    Reject
                  </button>
                </div>

                <p className="text-[10px] text-neutral-600">
                  {new Date(upload.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
