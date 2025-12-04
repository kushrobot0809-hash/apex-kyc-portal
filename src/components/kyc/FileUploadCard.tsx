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
        "relative group rounded-lg border border-dashed p-2 transition-all duration-300 cursor-pointer",
        isDragging && "border-primary bg-primary/5 scale-[1.02]",
        file && "border-success bg-success/5",
        error && !file && "border-destructive bg-destructive/5",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        !file && !error && !isDragging && !disabled && "border-border bg-card hover:border-primary/50 hover:bg-primary/5"
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
        <div className="relative flex items-center gap-2">
          <img
            src={preview}
            alt={title}
            className="w-12 h-12 object-cover rounded flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">{title}</p>
            <div className="flex items-center gap-1 text-success">
              <Check className="w-3 h-3" />
              <span className="text-[10px]">Uploaded</span>
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
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0",
              isDragging ? "bg-primary text-primary-foreground scale-110" : "bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground"
            )}
          >
            {icon}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-foreground text-xs">{title}</p>
            <p className="text-[9px] text-muted-foreground truncate">{description}</p>
          </div>
        </div>
      )}

      {error && !file && (
        <p className="text-[9px] text-destructive mt-1 text-center">{error}</p>
      )}
    </div>
  );
};

export default FileUploadCard;
