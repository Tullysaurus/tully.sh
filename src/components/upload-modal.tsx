"use client";

import { useState } from "react";
import { X, Loader2, CheckCircle, AlertCircle, Upload as UploadIcon } from "lucide-react";
import JSZip from "jszip";

interface UploadModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export default function UploadModal({ onClose, onSuccess }: UploadModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    type: "ASSIGNMENT", // Default value
    teacher: "",
    subject: "",
    hour: "",
    comments: "",
  });
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prevFiles => {
        const existingFiles = new Set(prevFiles.map(f => `${f.name}-${f.size}`));
        const uniqueNewFiles = newFiles.filter(f => !existingFiles.has(`${f.name}-${f.size}`));
        return [...prevFiles, ...uniqueNewFiles];
      });
      // Reset the input value to allow selecting the same file again after removing it
      e.target.value = '';
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) {
      setError("Please select at least one file.");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const zip = new JSZip();
      files.forEach(file => {
        zip.file(file.name, file);
      });

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const zipFile = new File([zipBlob], "upload.zip", { type: "application/zip" });

      const data = new FormData();
      data.append("file", zipFile);
      data.append("name", "upload.zip");
      data.append("type", formData.type.toUpperCase());
      if (formData.teacher) data.append("teacher", formData.teacher);
      if (formData.subject) data.append("subject", formData.subject);
      if (formData.hour) data.append("hour", formData.hour);
      if (formData.comments) data.append("comments", formData.comments);
      data.append("key", Object.fromEntries(document.cookie.split("; ").map((c) => c.split("=")))['auth'] || "")

      const response = await fetch("https://api.tully.sh/uploads", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json() as { error?: string };
        throw new Error(errorData.error || "Upload failed");
      }

      setStatus("success");
      if (onSuccess) onSuccess();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg bg-[#1f1f1f] rounded-lg border border-neutral-800 p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <h2 className="text-xl font-bold text-[#f5b041]">Upload Assignment</h2>
          <button onClick={onClose} className="text-neutral-400 hover:text-white transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>

        {status === "success" ? (
          <div className="flex flex-col items-center justify-center py-8 gap-4 text-center">
            <CheckCircle className="text-green-500 w-16 h-16" />
            <div>
              <p className="text-white text-lg font-medium">Upload Complete!</p>
              <p className="text-neutral-400 text-sm mt-1">Your file has been processed and saved.</p>
            </div>
            <button 
              onClick={onClose}
              className="mt-4 px-6 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-md transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
            
            {/* File Input */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">File(s)</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                multiple
              />
              {files.length === 0 ? (
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer transition-colors border-neutral-700 hover:border-neutral-500 bg-neutral-900"
                >
                  <UploadIcon size={20} className="text-neutral-500" />
                  <span className="text-sm text-neutral-400 mt-2">Select or drag files</span>
                </label>
              ) : (
                <div className="bg-neutral-900 border border-neutral-700 rounded-lg">
                  <ul className="p-2 flex flex-col gap-2 max-h-48 overflow-y-auto">
                    {files.map((file, index) => (
                      <li key={`${file.name}-${index}`} className="flex items-center justify-between bg-neutral-800 p-2 rounded text-sm">
                        <span className="text-neutral-300 truncate pr-2">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(index)}
                          className="text-neutral-500 hover:text-red-500 transition-colors flex-shrink-0"
                        >
                          <X size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="p-2 border-t border-neutral-800 text-center">
                    <label htmlFor="file-upload" className="text-sm text-[#f5b041] hover:underline cursor-pointer font-medium">
                      + Add more files
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Grid for Small Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="bg-neutral-900 border border-neutral-700 rounded p-2.5 text-white text-sm focus:border-[#f5b041] outline-none"
                >
                  <option value="ASSIGNMENT">Assignment</option>
                  <option value="TEST">Test</option>
                  <option value="QUIZ">Quiz</option>
                  <option value="NOTES">Notes</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Hour/Period</label>
                <select
                  name="hour"
                  value={formData.hour}
                  onChange={handleInputChange}
                  className="bg-neutral-900 border border-neutral-700 rounded p-2.5 text-white text-sm focus:border-[#f5b041] outline-none"
                >
                  <option value="" disabled>Select Hour</option>
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <option key={num} value={num.toString()}>{num}</option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* General Fields */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Teacher & Subject</label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="teacher"
                  placeholder="Teacher Name"
                  onChange={handleInputChange}
                  className="bg-neutral-900 border border-neutral-700 rounded p-2.5 text-white text-sm focus:border-[#f5b041] outline-none"
                />
                <input
                  name="subject"
                  placeholder="Subject"
                  onChange={handleInputChange}
                  className="bg-neutral-900 border border-neutral-700 rounded p-2.5 text-white text-sm focus:border-[#f5b041] outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Comments</label>
              <textarea
                name="comments"
                rows={2}
                placeholder="Optional notes..."
                onChange={handleInputChange}
                className="bg-neutral-900 border border-neutral-700 rounded p-2.5 text-white text-sm focus:border-[#f5b041] outline-none resize-none"
              />
            </div>

            {status === "error" && (
              <div className="flex items-center gap-2 text-red-500 text-sm px-1 bg-red-500/10 p-2 rounded">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#f5b041] hover:bg-[#d49b3b] disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-3 rounded mt-2 transition-transform active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Uploading...
                </>
              ) : (
                "Upload Content"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}