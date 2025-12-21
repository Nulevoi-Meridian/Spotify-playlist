"use client";

import { Navbar } from "@/components/Navbar";
import { UploadSection } from "@/components/UploadSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <UploadSection />
      {/* <FileUploader /> */}
    </main>
  );
}
