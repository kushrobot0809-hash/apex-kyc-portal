import { useRef, useState, useCallback, useEffect } from "react";
import { Camera, X, RotateCcw, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CameraCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (file: File) => void;
}

const CameraCapture = ({ isOpen, onClose, onCapture }: CameraCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");

  const startCamera = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Stop any existing stream
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }
      
      setIsLoading(false);
    } catch (err) {
      console.error("Camera error:", err);
      setError("Unable to access camera. Please allow camera permissions.");
      setIsLoading(false);
    }
  }, [facingMode]);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isOpen, startCamera]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Mirror the image for front camera
        if (facingMode === "user") {
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
        }
        ctx.drawImage(video, 0, 0);
        
        const imageData = canvas.toDataURL("image/jpeg", 0.9);
        setCapturedImage(imageData);
        
        // Stop the camera
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    startCamera();
  };

  const handleConfirm = () => {
    if (capturedImage && canvasRef.current) {
      canvasRef.current.toBlob(
        (blob) => {
          if (blob) {
            const file = new File([blob], `selfie-${Date.now()}.jpg`, {
              type: "image/jpeg",
            });
            onCapture(file);
            handleClose();
          }
        },
        "image/jpeg",
        0.9
      );
    }
  };

  const handleClose = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setCapturedImage(null);
    setStream(null);
    onClose();
  };

  const toggleCamera = () => {
    setFacingMode(prev => prev === "user" ? "environment" : "user");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-foreground/80 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
      />
      
      <div className="relative bg-card rounded-2xl overflow-hidden max-w-lg w-full shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Take Live Selfie</h3>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Camera View */}
        <div className="relative aspect-[4/3] bg-foreground">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-foreground">
              <div className="text-center text-primary-foreground">
                <Loader2 className="w-10 h-10 animate-spin mx-auto mb-2" />
                <p>Starting camera...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-foreground p-4">
              <div className="text-center text-primary-foreground">
                <Camera className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-destructive-foreground">{error}</p>
                <Button onClick={startCamera} variant="outline" className="mt-4">
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {capturedImage ? (
            <img
              src={capturedImage}
              alt="Captured selfie"
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={cn(
                "w-full h-full object-cover",
                facingMode === "user" && "scale-x-[-1]"
              )}
            />
          )}

          <canvas ref={canvasRef} className="hidden" />

          {/* Face Guide Overlay */}
          {!capturedImage && !isLoading && !error && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-64 border-4 border-primary/50 rounded-[50%] animate-pulse" />
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-4 flex items-center justify-center gap-4">
          {capturedImage ? (
            <>
              <Button variant="outline" onClick={handleRetake} className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Retake
              </Button>
              <Button onClick={handleConfirm} variant="success" className="gap-2">
                <Check className="w-4 h-4" />
                Use This Photo
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleCamera}
                disabled={isLoading || !!error}
                className="rounded-full"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <button
                onClick={handleCapture}
                disabled={isLoading || !!error}
                className={cn(
                  "w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-glow",
                  (isLoading || error) && "opacity-50 cursor-not-allowed"
                )}
              >
                <div className="w-12 h-12 rounded-full border-4 border-primary-foreground" />
              </button>
              <div className="w-10" /> {/* Spacer for symmetry */}
            </>
          )}
        </div>

        {/* Tip */}
        {!capturedImage && (
          <p className="text-center text-sm text-muted-foreground pb-4 px-4">
            Position your face within the oval and ensure good lighting
          </p>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;
