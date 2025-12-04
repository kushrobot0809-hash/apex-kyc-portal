import { Upload, X, Check, Camera, Image } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

interface FileUploadCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  accept: string;
  file: File | null;
  preview: string | null;
  onFileChange: (file: File | null) => void;
  error?: string;
  isCamera?: boolean;
  disabled?: boolean;
}

const FileUploadCard = ({
  title,
  description,
  icon,
  accept,
  file,
  preview,
  onFileChange,
  error,
  isCamera = false,
  disabled = false,
}: FileUploadCardProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      onFileChange(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={cn(
        "relative group rounded-xl border-2 border-dashed p-4 transition-all duration-300 cursor-pointer",
        isDragging && "border-primary bg-primary/5 scale-[1.02]",
        file && "border-success bg-success/5",
        error && "border-destructive bg-destructive/5",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        !file && !error && !isDragging && !disabled && "border-border bg-card hover:border-primary/50 hover:bg-primary/5 hover-lift"
      )}
      onDrop={disabled ? undefined : handleDrop}
      onDragOver={disabled ? undefined : handleDragOver}
      onDragLeave={disabled ? undefined : handleDragLeave}
      onClick={() => !disabled && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        capture={isCamera ? "user" : undefined}
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];
          if (selectedFile) {
            onFileChange(selectedFile);
          }
        }}
        className="hidden"
      />

      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt={title}
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
            <Check className="w-3 h-3" /> Uploaded
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center space-y-2">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
              isDragging ? "bg-primary text-primary-foreground scale-110" : "bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground"
            )}
          >
            {icon}
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">{title}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
      )}

      {error && (
        <p className="text-sm text-destructive mt-2 text-center animate-fade-in">{error}</p>
      )}
    </div>
  );
};

export default FileUploadCard;
