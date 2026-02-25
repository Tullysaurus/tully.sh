"use client";

import UploadModal from "@/components/upload-modal";
import { useState, useEffect, useCallback } from "react";
import { Search, Plus, FileText, Download } from "lucide-react";

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
}

export default function Uploads() {
  const [modalOpen, setModalOpen] = useState(false);
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

  return (
    <div className="flex flex-col min-h-screen w-full items-center pt-[10vh] gap-8 px-4 pb-10">
      <div className="w-full max-w-6xl flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl italic font-light">Uploads Browser</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#f5b041] hover:bg-[#d49b3b] text-black font-bold py-2 px-4 rounded flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Plus size={20} />
            Upload New
          </button>
        </div>

        <div className="bg-[#1f1f1f] p-4 rounded-lg border border-neutral-800 flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex items-center bg-neutral-900 border border-neutral-700 rounded px-3">
            <Search size={18} className="text-neutral-500 mr-2" />
            <input
              type="text"
              name="name"
              placeholder="Search by name..."
              value={filters.name}
              onChange={handleFilterChange}
              className="bg-transparent border-none outline-none text-white text-sm py-2 w-full placeholder:text-neutral-600"
            />
          </div>
          
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-white text-sm outline-none focus:border-[#f5b041]"
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
            className="bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-white text-sm outline-none focus:border-[#f5b041] w-full md:w-32"
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={filters.subject}
            onChange={handleFilterChange}
            className="bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-white text-sm outline-none focus:border-[#f5b041] w-full md:w-32"
          />

           <select
            name="hour"
            value={filters.hour}
            onChange={handleFilterChange}
            className="bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-white text-sm outline-none focus:border-[#f5b041]"
          >
            <option value="">All Hours</option>
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <option key={num} value={num.toString()}>{num}</option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          {loading ? (
            <div className="text-center py-10 text-neutral-500">Loading uploads...</div>
          ) : uploads.length === 0 ? (
            <div className="text-center py-10 text-neutral-500 bg-[#1f1f1f] rounded-lg border border-neutral-800">
              No uploads found matching your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploads.map((upload) => (
                <div key={upload.id} className="bg-[#1f1f1f] p-4 rounded-lg border border-neutral-800 hover:border-[#f5b041]/50 transition-colors group flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-2 bg-neutral-800 rounded text-[#f5b041]">
                      <FileText size={24} />
                    </div>
                    <span className="text-xs font-mono text-neutral-600 bg-neutral-900 px-2 py-1 rounded">
                      {upload.type}
                    </span>
                  </div>
                  <h3 className="text-white font-medium truncate mb-1" title={upload.name}>{upload.name}</h3>
                  <div className="text-xs text-neutral-500 flex flex-col gap-1 mb-4">
                    <p className="truncate">{upload.teacher} • {upload.subject}</p>
                    <p>Hour: {upload.hour}</p>
                    <p className="text-[10px] text-neutral-600 mt-1">{new Date(upload.createdAt).toLocaleDateString()}</p>
                  </div>
                  <a 
                    href={`https://r2.tully.sh/uploads/${upload.id}`}
                    className="mt-auto flex items-center justify-center gap-2 w-full bg-neutral-800 hover:bg-[#f5b041] hover:text-black text-neutral-300 py-2 rounded text-sm font-medium transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download size={16} />
                    Download
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <UploadModal 
        visible={modalOpen}
        onClose={() => setModalOpen(false)} 
        onSuccess={() => {
          setModalOpen(false);
          fetchUploads();
        }} 
      />
    </div>
  );
}
