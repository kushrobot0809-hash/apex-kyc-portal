import { useState } from "react";
import { Camera, X, Check, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import CameraCapture from "./CameraCapture";

interface LiveSelfieCardProps {
  file: File | null;
  preview: string | null;
  onFileChange: (file: File | null) => void;
  error?: string;
}

const LiveSelfieCard = ({ file, preview, onFileChange, error }: LiveSelfieCardProps) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleCapture = (capturedFile: File) => {
    onFileChange(capturedFile);
  };

  return (
    <>
      <div
        className={cn(
          "relative group rounded-xl border-2 border-dashed p-6 transition-all duration-300 hover-lift cursor-pointer",
          file && "border-success bg-success/5",
          error && "border-destructive bg-destructive/5",
          !file && !error && "border-border bg-card hover:border-primary/50 hover:bg-primary/5"
        )}
        onClick={() => !file && setIsCameraOpen(true)}
      >
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Live Selfie"
              className="w-full h-40 object-cover rounded-lg"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFileChange(null);
              }}
              className="absolute top-2 right-2 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2 left-2 bg-success text-success-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Check className="w-3 h-3" /> Live Selfie Captured
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="relative">
              <div className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground">
                <Camera className="w-6 h-6" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive flex items-center justify-center animate-pulse">
                <Video className="w-3 h-3 text-destructive-foreground" />
              </div>
            </div>
            <div>
              <p className="font-semibold text-foreground">Live Selfie</p>
              <p className="text-sm text-muted-foreground">Take a live photo for verification</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Camera className="w-4 h-4" />
              <span>Open Camera</span>
            </div>
          </div>
        )}

        {error && (
          <p className="text-sm text-destructive mt-2 text-center animate-fade-in">{error}</p>
        )}
      </div>

      <CameraCapture
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCapture}
      />
    </>
  );
};

export default LiveSelfieCard;
