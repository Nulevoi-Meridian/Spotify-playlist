"use client";

import { parseBlob } from "music-metadata";
import { useState } from "react";

interface TrackMetadata {
  filename: string;
  artist?: string;
  title?: string;
  album?: string;
  year?: number;
  duration?: number;
  format?: string;
}

export function FileUploader() {
  const [tracks, setTracks] = useState<TrackMetadata[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    setError(null);
    const parsedTracks: TrackMetadata[] = [];

    for (const file of Array.from(files)) {
      try {
        console.log(`Parsing: ${file.name}`);

        // Extract metadata from audio file
        const metadata = await parseBlob(file);

        parsedTracks.push({
          filename: file.name,
          artist: metadata.common.artist,
          title: metadata.common.title,
          album: metadata.common.album,
          year: metadata.common.year,
          duration: metadata.format.duration,
          format: metadata.format.container,
        });

        console.log("Parsed metadata:", metadata.common);
      } catch (err) {
        console.error(`Failed to parse ${file.name}:`, err);
        parsedTracks.push({
          filename: file.name,
          artist: "Error parsing file",
        });
      }
    }

    setTracks(parsedTracks);
    setIsProcessing(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Audio File Uploader (Test)</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="file"
          accept="audio/*"
          multiple
          onChange={handleFileUpload}
          disabled={isProcessing}
          style={{
            padding: "10px",
            border: "2px solid #ccc",
            borderRadius: "4px",
            cursor: isProcessing ? "not-allowed" : "pointer",
          }}
        />
      </div>

      {isProcessing && <p>Processing files...</p>}

      {error && (
        <div style={{ color: "red", marginBottom: "20px" }}>{error}</div>
      )}

      {tracks.length > 0 && (
        <div>
          <h3>Parsed Tracks ({tracks.length})</h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "10px",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f0f0f0", color: "#333" }}>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                  File
                </th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                  Artist
                </th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                  Title
                </th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                  Album
                </th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                  Year
                </th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              {tracks.map((track, index) => (
                <tr key={`${track.filename}-${index}`}>
                  <td
                    style={{
                      padding: "8px",
                      border: "1px solid #ddd",
                      fontSize: "12px",
                    }}
                  >
                    {track.filename}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {track.artist || "-"}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {track.title || "-"}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {track.album || "-"}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {track.year || "-"}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {track.duration
                      ? `${Math.floor(track.duration / 60)}:${String(Math.floor(track.duration % 60)).padStart(2, "0")}`
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
