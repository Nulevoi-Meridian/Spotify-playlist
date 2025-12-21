"use client";

import { Navbar } from "@/components/Navbar";
import { UploadSection } from "@/components/UploadSection";

export default function Home() {
  const handleClick = async () => {
    window.location.href = "routes/auth/login";
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <UploadSection />
      {/* <FileUploader /> */}
    </main>
  );
}
