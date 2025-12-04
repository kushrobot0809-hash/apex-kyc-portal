import { FileCheck, User, Camera, Image, Check } from "lucide-react";
import { useState } from "react";
import FileUploadCard from "./FileUploadCard";
import LiveSelfieCard from "./LiveSelfieCard";

interface KYCDocumentsStepProps {
  files: {
    passportPhoto: File | null;
    liveSelfie: File | null;
    galleryPhoto: File | null;
  };
  previews: {
    passportPhoto: string | null;
    liveSelfie: string | null;
    galleryPhoto: string | null;
  };
  errors: Record<string, string>;
  onFileChange: (field: string, file: File | null) => void;
}

type PhotoType = "selfie" | "gallery" | null;

const KYCDocumentsStep = ({ files, previews, errors, onFileChange }: KYCDocumentsStepProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoType>(
    files.liveSelfie ? "selfie" : files.galleryPhoto ? "gallery" : null
  );

  const handlePhotoSelect = (type: PhotoType) => {
    setSelectedPhoto(type);
    if (type === "selfie" && files.galleryPhoto) {
      onFileChange("galleryPhoto", null);
    } else if (type === "gallery" && files.liveSelfie) {
      onFileChange("liveSelfie", null);
    }
  };

  return (
    <div className="flex flex-col h-full animate-slide-up">
      {/* Header */}
      <div className="text-center mb-2 flex-shrink-0">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-primary text-primary-foreground mb-1 shadow-glow">
          <FileCheck className="w-5 h-5" />
        </div>
        <h2 className="text-base font-bold text-foreground">KYC Documents</h2>
        <p className="text-muted-foreground text-[10px]">Upload your verification documents</p>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-3 overflow-hidden">
        {/* Passport Photo Section */}
        <div className="space-y-1.5">
          <p className="text-[11px] font-medium text-foreground flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-primary/20 text-primary text-[9px] flex items-center justify-center font-bold">1</span>
            Upload Passport Photo
          </p>
          
          <FileUploadCard
            title="Passport Photo"
            description="Upload passport size photo"
            icon={<User className="w-4 h-4" />}
            accept="image/*"
            file={files.passportPhoto}
            preview={previews.passportPhoto}
            onFileChange={(file) => onFileChange("passportPhoto", file)}
            error={errors.passportPhoto}
          />
        </div>

        {/* Photo Section */}
        <div className="space-y-1.5">
          <p className="text-[11px] font-medium text-foreground flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-primary/20 text-primary text-[9px] flex items-center justify-center font-bold">2</span>
            Upload Photo (Live Selfie OR Gallery Photo)
          </p>

          {!selectedPhoto ? (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handlePhotoSelect("selfie")}
                className="group p-2 rounded-lg border border-dashed border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                <div className="flex flex-col items-center text-center gap-1">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Camera className="w-4 h-4" />
                    </div>
                    <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-destructive flex items-center justify-center animate-pulse">
                      <span className="w-1 h-1 bg-destructive-foreground rounded-full" />
                    </div>
                  </div>
                  <p className="font-medium text-foreground text-xs">Live Selfie</p>
                  <p className="text-[9px] text-muted-foreground leading-tight">Take a live photo</p>
                </div>
              </button>

              <button
                onClick={() => handlePhotoSelect("gallery")}
                className="group p-2 rounded-lg border border-dashed border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                <div className="flex flex-col items-center text-center gap-1">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Image className="w-4 h-4" />
                  </div>
                  <p className="font-medium text-foreground text-xs">Photo from Gallery</p>
                  <p className="text-[9px] text-muted-foreground leading-tight">Upload any photo</p>
                </div>
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-success flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  {selectedPhoto === "selfie" ? "Live Selfie" : "Photo from Gallery"}
                </span>
                <button 
                  onClick={() => {
                    setSelectedPhoto(null);
                    onFileChange("liveSelfie", null);
                    onFileChange("galleryPhoto", null);
                  }}
                  className="text-[10px] text-primary hover:underline"
                >
                  Change
                </button>
              </div>
              
              {selectedPhoto === "selfie" ? (
                <LiveSelfieCard
                  file={files.liveSelfie}
                  preview={previews.liveSelfie}
                  onFileChange={(file) => onFileChange("liveSelfie", file)}
                  error={errors.photoDocument}
                />
              ) : (
                <FileUploadCard
                  title="Photo from Gallery"
                  description="Upload any photo"
                  icon={<Image className="w-4 h-4" />}
                  accept="image/*"
                  file={files.galleryPhoto}
                  preview={previews.galleryPhoto}
                  onFileChange={(file) => onFileChange("galleryPhoto", file)}
                  error={errors.photoDocument}
                />
              )}
            </div>
          )}

          {!selectedPhoto && errors.photoDocument && (
            <p className="text-[10px] text-destructive">{errors.photoDocument}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default KYCDocumentsStep;
