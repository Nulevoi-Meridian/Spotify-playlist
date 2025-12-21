// import { Music2, Plus, Sparkles, Upload } from "lucide-react";
import { useState } from "react";
import { DragAndDropIcon } from "./icons/DragAndDropIcon";
import { UploadTrackIcon } from "./icons/UploadTrackIcon";

// import { Button } from "@/components/ui/button";

export const UploadSection = () => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Convert to Spotify</h1>
          <p className="text-muted-foreground">
            Upload your audio files and create playlists instantly
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Processing Cost</div>
            <div className="text-2xl font-bold">
              <span className="text-muted-foreground line-through mr-2">
                $20
              </span>
              <span className="text-primary">⚡ 5</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Panel - Info */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border-color rounded-2xl p-6 h-full">
            <div className="w-16 h-16 text-text-accent rounded-xl bg-background-accent flex items-center justify-center mb-6 mx-auto">
              <UploadTrackIcon className="w-12 h-12" />
            </div>

            <h3 className="text-xl font-semibold text-center mb-3">
              Upload Tracks
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Select audio files from your device to match with Spotify's
              catalog
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-text-accent" />
                <span className="text-muted-foreground">
                  Supports MP3, FLAC, WAV, M4A
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-text-accent" />
                <span className="text-muted-foreground">
                  Up to 50 tracks per batch
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-text-accent" />
                <span className="text-muted-foreground">
                  Max 100MB per file
                </span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border-color">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Processing speed</span>
                <span className="font-medium text-primary">~30s/track</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Match accuracy</span>
                <span className="font-medium text-primary">99.2%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Upload Area */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border-color rounded-2xl p-8 h-full min-h-[500px] flex flex-col">
            <div
              className={`flex-1 border-2 border-border-color border-dashed rounded-2xl transition-all duration-300 flex flex-col items-center justify-center ${
                isDragging
                  ? "border-primary bg-primary/5 scale-[0.98]"
                  : "border-border hover:border-primary/50 hover:bg-muted/30"
              }`}
            >
              <div className="text-center px-6">
                <div className="w-20 h-20 text-text-accent rounded-xl bg-background-accent flex items-center justify-center mb-6 mx-auto">
                  <DragAndDropIcon className="w-10 h-10" />
                </div>

                <h3 className="text-xl font-semibold mb-2">
                  Drag and drop tracks
                </h3>
                <p className="text-muted-foreground mb-1">
                  WAV, 24 bit, 48KHz or any audio format
                </p>
                <p className="text-sm text-muted-foreground/60 mb-8">
                  Maximum 50 files, 100MB each
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {/* <Button variant="outline" size="lg" className="gap-2">
                    <Plus className="w-5 h-5" />
                    Import from Library
                  </Button>
                  <Button variant="default" size="lg" className="gap-2">
                    <Upload className="w-5 h-5" />
                    Upload Tracks
                  </Button> */}
                </div>
              </div>
            </div>

            {/* Bottom Info */}
            <div className="mt-6 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                {/* <Sparkles className="w-4 h-4 text-primary" /> */}
                <span>AI-powered matching • Privacy protected</span>
              </div>
              {/* <button className="text-primary hover:underline font-medium">
                Learn more →
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
