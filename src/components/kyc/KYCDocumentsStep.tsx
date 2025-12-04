import { useState } from "react";
import { FileCheck, CreditCard, Image, User, Camera, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import FileUploadCard from "./FileUploadCard";
import LiveSelfieCard from "./LiveSelfieCard";

interface KYCDocumentsStepProps {
  files: {
    passportPhoto: File | null;
    aadharCard: File | null;
    liveSelfie: File | null;
    galleryPhoto: File | null;
  };
  previews: {
    passportPhoto: string | null;
    aadharCard: string | null;
    liveSelfie: string | null;
    galleryPhoto: string | null;
  };
  errors: Record<string, string>;
  onFileChange: (field: string, file: File | null) => void;
}

type IdProofType = "passport" | "aadhar" | null;
type PhotoType = "selfie" | "gallery" | null;

const KYCDocumentsStep = ({ files, previews, errors, onFileChange }: KYCDocumentsStepProps) => {
  const [selectedIdProof, setSelectedIdProof] = useState<IdProofType>(
    files.passportPhoto ? "passport" : files.aadharCard ? "aadhar" : null
  );
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoType>(
    files.liveSelfie ? "selfie" : files.galleryPhoto ? "gallery" : null
  );

  const hasIdDocument = files.passportPhoto || files.aadharCard;
  const hasPhotoDocument = files.liveSelfie || files.galleryPhoto;

  const handleIdProofSelect = (type: IdProofType) => {
    setSelectedIdProof(type);
    // Clear the other option if switching
    if (type === "passport" && files.aadharCard) {
      onFileChange("aadharCard", null);
    } else if (type === "aadhar" && files.passportPhoto) {
      onFileChange("passportPhoto", null);
    }
  };

  const handlePhotoSelect = (type: PhotoType) => {
    setSelectedPhoto(type);
    // Clear the other option if switching
    if (type === "selfie" && files.galleryPhoto) {
      onFileChange("galleryPhoto", null);
    } else if (type === "gallery" && files.liveSelfie) {
      onFileChange("liveSelfie", null);
    }
  };

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Header */}
      <div className="text-center mb-3">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary text-primary-foreground mb-2 shadow-glow">
          <FileCheck className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-foreground">KYC Documents</h2>
        <p className="text-muted-foreground text-xs">Upload your verification documents</p>
      </div>

      {/* ID Proof Section */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-foreground flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] flex items-center justify-center font-bold">1</span>
          Upload ID Proof (Passport Photo OR Aadhar Card)
        </p>
        
        {/* Selection Options */}
        {!selectedIdProof ? (
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleIdProofSelect("passport")}
              className="group p-3 rounded-xl border-2 border-dashed border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Passport Photo</p>
                  <p className="text-[10px] text-muted-foreground">Upload passport size photo</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleIdProofSelect("aadhar")}
              className="group p-3 rounded-xl border-2 border-dashed border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Aadhar Card</p>
                  <p className="text-[10px] text-muted-foreground">Upload front side of Aadhar</p>
                </div>
              </div>
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Check className="w-3 h-3 text-success" />
                Selected: {selectedIdProof === "passport" ? "Passport Photo" : "Aadhar Card"}
              </span>
              <button 
                onClick={() => {
                  setSelectedIdProof(null);
                  onFileChange("passportPhoto", null);
                  onFileChange("aadharCard", null);
                }}
                className="text-xs text-primary hover:underline"
              >
                Change
              </button>
            </div>
            
            {selectedIdProof === "passport" ? (
              <FileUploadCard
                title="Passport Photo"
                description="Upload passport size photo"
                icon={<User className="w-5 h-5" />}
                accept="image/*"
                file={files.passportPhoto}
                preview={previews.passportPhoto}
                onFileChange={(file) => onFileChange("passportPhoto", file)}
                error={errors.idDocument}
              />
            ) : (
              <FileUploadCard
                title="Aadhar Card"
                description="Upload front side of Aadhar"
                icon={<CreditCard className="w-5 h-5" />}
                accept="image/*,.pdf"
                file={files.aadharCard}
                preview={previews.aadharCard}
                onFileChange={(file) => onFileChange("aadharCard", file)}
                error={errors.idDocument}
              />
            )}
          </div>
        )}
        
        {!selectedIdProof && errors.idDocument && (
          <p className="text-xs text-destructive animate-fade-in">{errors.idDocument}</p>
        )}
      </div>

      {/* Photo Section */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-foreground flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] flex items-center justify-center font-bold">2</span>
          Upload Photo (Live Selfie OR Gallery Photo)
        </p>

        {/* Selection Options */}
        {!selectedPhoto ? (
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handlePhotoSelect("selfie")}
              className="group p-3 rounded-xl border-2 border-dashed border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive flex items-center justify-center animate-pulse">
                    <span className="w-1.5 h-1.5 bg-destructive-foreground rounded-full" />
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Live Selfie</p>
                  <p className="text-[10px] text-muted-foreground">Take a live photo</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => handlePhotoSelect("gallery")}
              className="group p-3 rounded-xl border-2 border-dashed border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <Image className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Photo from Gallery</p>
                  <p className="text-[10px] text-muted-foreground">Upload any photo from gallery</p>
                </div>
              </div>
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Check className="w-3 h-3 text-success" />
                Selected: {selectedPhoto === "selfie" ? "Live Selfie" : "Photo from Gallery"}
              </span>
              <button 
                onClick={() => {
                  setSelectedPhoto(null);
                  onFileChange("liveSelfie", null);
                  onFileChange("galleryPhoto", null);
                }}
                className="text-xs text-primary hover:underline"
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
                description="Upload any photo from gallery"
                icon={<Image className="w-5 h-5" />}
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
          <p className="text-xs text-destructive animate-fade-in">{errors.photoDocument}</p>
        )}
      </div>
    </div>
  );
};

export default KYCDocumentsStep;
