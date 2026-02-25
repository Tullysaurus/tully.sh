"use client";

import UploadModal from "@/components/upload-modal";
import { useState } from "react";

export default function Proxy() {
  const [modalOpen, setModalOpen] = useState(true)



  return (
    <div
      className="flex flex-col h-100vh w-100vh items-center pt-[10vh] gap-8"
    >
      <h1 className="text-5xl italic font-light">tully.sh/proxy</h1>
      <p className="text-l text-center w-3/8 font-semibold">
        Still being developed...
      </p>
      <UploadModal onClose={()=>{
        console.log("modal closed")
        setModalOpen(false)
      }} onSuccess={()=>{
        console.log('modal success')
      }} visible={modalOpen}/>
    </div>
  );
}
