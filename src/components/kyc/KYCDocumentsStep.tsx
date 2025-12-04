import { FileCheck, User } from "lucide-react";
import FileUploadCard from "./FileUploadCard";

interface KYCDocumentsStepProps {
  files: {
    passportPhoto: File | null;
  };
  previews: {
    passportPhoto: string | null;
  };
  errors: Record<string, string>;
  onFileChange: (field: string, file: File | null) => void;
}

const KYCDocumentsStep = ({ files, previews, onFileChange }: KYCDocumentsStepProps) => {
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
            Upload Passport Photo <span className="text-muted-foreground">(Optional)</span>
          </p>
          
          <FileUploadCard
            title="Passport Photo"
            description="Upload passport size photo"
            icon={<User className="w-4 h-4" />}
            accept="image/*"
            file={files.passportPhoto}
            preview={previews.passportPhoto}
            onFileChange={(file) => onFileChange("passportPhoto", file)}
          />
        </div>
      </div>
    </div>
  );
};

export default KYCDocumentsStep;