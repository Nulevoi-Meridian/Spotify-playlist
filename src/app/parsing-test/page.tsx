import { FileUploader } from "@/components/FileUploader";

export default function TestPage() {
  return (
    <main>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        Audio Parsing Test
      </h1>
      <FileUploader />
    </main>
  );
}
