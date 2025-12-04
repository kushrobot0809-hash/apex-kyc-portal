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
          "relative group rounded-lg border border-dashed p-2 transition-all duration-300 cursor-pointer",
          file && "border-success bg-success/5",
          error && !file && "border-destructive bg-destructive/5",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          !file && !error && !disabled && "border-border bg-card hover:border-primary/50 hover:bg-primary/5"
        )}
        onClick={() => !file && !disabled && setIsCameraOpen(true)}
      >
        {preview ? (
          <div className="relative flex items-center gap-2">
            <img
              src={preview}
              alt="Live Selfie"
              className="w-12 h-12 object-cover rounded flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground">Live Selfie</p>
              <div className="flex items-center gap-1 text-success">
                <Check className="w-3 h-3" />
                <span className="text-[10px]">Captured</span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFileChange(null);
              }}
              className="w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:scale-110 transition-transform flex-shrink-0"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 py-1">
            <div className="relative flex-shrink-0">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <Camera className="w-4 h-4" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-destructive flex items-center justify-center animate-pulse">
                <Video className="w-1.5 h-1.5 text-destructive-foreground" />
              </div>
            </div>
            <div className="min-w-0">
              <p className="font-medium text-foreground text-xs">Live Selfie</p>
              <p className="text-[9px] text-primary">Tap to open camera</p>
            </div>
          </div>
        )}

        {error && !file && (
          <p className="text-[9px] text-destructive mt-1 text-center">{error}</p>
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
