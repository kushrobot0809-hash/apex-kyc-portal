import { FileCheck, CreditCard, Image, User, Camera } from "lucide-react";
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

const KYCDocumentsStep = ({ files, previews, errors, onFileChange }: KYCDocumentsStepProps) => {
  const hasIdDocument = files.passportPhoto || files.aadharCard;
  const hasPhotoDocument = files.liveSelfie || files.galleryPhoto;

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="text-center mb-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary text-primary-foreground mb-2 shadow-glow">
          <FileCheck className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-foreground">KYC Documents</h2>
        <p className="text-muted-foreground text-sm">Upload your verification documents</p>
      </div>

      {/* ID Document Section - Either Passport OR Aadhar */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center">1</span>
          Upload ID Proof (Passport Photo OR Aadhar Card)
        </p>
        <div className="grid md:grid-cols-2 gap-3">
          <FileUploadCard
            title="Passport Photo"
            description="Upload passport size photo"
            icon={<User className="w-5 h-5" />}
            accept="image/*"
            file={files.passportPhoto}
            preview={previews.passportPhoto}
            onFileChange={(file) => onFileChange("passportPhoto", file)}
            error={!hasIdDocument ? errors.idDocument : undefined}
            disabled={!!files.aadharCard}
          />

          <FileUploadCard
            title="Aadhar Card"
            description="Upload front side of Aadhar"
            icon={<CreditCard className="w-5 h-5" />}
            accept="image/*,.pdf"
            file={files.aadharCard}
            preview={previews.aadharCard}
            onFileChange={(file) => onFileChange("aadharCard", file)}
            error={!hasIdDocument ? errors.idDocument : undefined}
            disabled={!!files.passportPhoto}
          />
        </div>
        {hasIdDocument && (
          <p className="text-xs text-success flex items-center gap-1">
            ✓ ID document uploaded
          </p>
        )}
      </div>

      {/* Photo Section - Either Live Selfie OR Gallery Photo */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center">2</span>
          Upload Photo (Live Selfie OR Gallery Photo)
        </p>
        <div className="grid md:grid-cols-2 gap-3">
          <LiveSelfieCard
            file={files.liveSelfie}
            preview={previews.liveSelfie}
            onFileChange={(file) => onFileChange("liveSelfie", file)}
            error={!hasPhotoDocument ? errors.photoDocument : undefined}
            disabled={!!files.galleryPhoto}
          />

          <FileUploadCard
            title="Photo from Gallery"
            description="Upload any photo from gallery"
            icon={<Image className="w-5 h-5" />}
            accept="image/*"
            file={files.galleryPhoto}
            preview={previews.galleryPhoto}
            onFileChange={(file) => onFileChange("galleryPhoto", file)}
            error={!hasPhotoDocument ? errors.photoDocument : undefined}
            disabled={!!files.liveSelfie}
          />
        </div>
        {hasPhotoDocument && (
          <p className="text-xs text-success flex items-center gap-1">
            ✓ Photo uploaded
          </p>
        )}
      </div>
    </div>
  );
};

export default KYCDocumentsStep;
