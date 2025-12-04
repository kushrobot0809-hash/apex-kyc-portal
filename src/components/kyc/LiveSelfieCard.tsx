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
          error && "border-destructive bg-destructive/5",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          !file && !error && !disabled && "border-border bg-card hover:border-primary/50 hover:bg-primary/5"
        )}
        onClick={() => !file && !disabled && setIsCameraOpen(true)}
      >
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Live Selfie"
              className="w-full h-20 object-cover rounded"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFileChange(null);
              }}
              className="absolute top-1 right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="absolute bottom-1 left-1 bg-success text-success-foreground px-2 py-0.5 rounded-full text-[9px] font-medium flex items-center gap-0.5">
              <Check className="w-2 h-2" /> Captured
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3 py-1">
            <div className="relative">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 text-primary">
                <Camera className="w-4 h-4" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-destructive flex items-center justify-center animate-pulse">
                <Video className="w-1.5 h-1.5 text-destructive-foreground" />
              </div>
            </div>
            <div className="text-left">
              <p className="font-medium text-foreground text-xs">Live Selfie</p>
              <button className="text-[9px] text-primary hover:underline flex items-center gap-0.5">
                <Camera className="w-2.5 h-2.5" /> Tap to open camera
              </button>
            </div>
          </div>
        )}

        {error && (
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
