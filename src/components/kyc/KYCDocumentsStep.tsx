import { FileCheck, CreditCard, Image, User } from "lucide-react";
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
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary text-primary-foreground mb-4 shadow-glow">
          <FileCheck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">KYC Documents</h2>
        <p className="text-muted-foreground mt-2">Upload your verification documents</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <FileUploadCard
          title="Passport Photo"
          description="Upload a clear passport size photo"
          icon={<User className="w-6 h-6" />}
          accept="image/*"
          file={files.passportPhoto}
          preview={previews.passportPhoto}
          onFileChange={(file) => onFileChange("passportPhoto", file)}
          error={errors.passportPhoto}
        />

        <FileUploadCard
          title="Aadhar Card"
          description="Upload front side of Aadhar"
          icon={<CreditCard className="w-6 h-6" />}
          accept="image/*,.pdf"
          file={files.aadharCard}
          preview={previews.aadharCard}
          onFileChange={(file) => onFileChange("aadharCard", file)}
          error={errors.aadharCard}
        />

        <LiveSelfieCard
          file={files.liveSelfie}
          preview={previews.liveSelfie}
          onFileChange={(file) => onFileChange("liveSelfie", file)}
          error={errors.liveSelfie}
        />

        <FileUploadCard
          title="Photo from Gallery"
          description="Upload any photo from gallery"
          icon={<Image className="w-6 h-6" />}
          accept="image/*"
          file={files.galleryPhoto}
          preview={previews.galleryPhoto}
          onFileChange={(file) => onFileChange("galleryPhoto", file)}
          error={errors.galleryPhoto}
        />
      </div>
    </div>
  );
};

export default KYCDocumentsStep;
