import { useState } from "react";
import { Camera, X, Check, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import CameraCapture from "./CameraCapture";

interface LiveSelfieCardProps {
  file: File | null;
  preview: string | null;
  onFileChange: (file: File | null) => void;
  error?: string;
  disabled?: boolean;
}

const LiveSelfieCard = ({ file, preview, onFileChange, error, disabled = false }: LiveSelfieCardProps) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleCapture = (capturedFile: File) => {
    onFileChange(capturedFile);
  };

  return (
    <>
      <div
        className={cn(
          "relative group rounded-xl border-2 border-dashed p-4 transition-all duration-300 cursor-pointer",
          file && "border-success bg-success/5",
          error && "border-destructive bg-destructive/5",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          !file && !error && !disabled && "border-border bg-card hover:border-primary/50 hover:bg-primary/5 hover-lift"
        )}
        onClick={() => !file && !disabled && setIsCameraOpen(true)}
      >
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Live Selfie"
              className="w-full h-28 object-cover rounded-lg"
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
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="relative">
              <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground">
                <Camera className="w-5 h-5" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive flex items-center justify-center animate-pulse">
                <Video className="w-2 h-2 text-destructive-foreground" />
              </div>
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">Live Selfie</p>
              <p className="text-xs text-muted-foreground">Take a live photo</p>
            </div>
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
              <Camera className="w-3 h-3" />
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
