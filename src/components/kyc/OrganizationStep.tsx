import { Building2, Globe, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface OrganizationStepProps {
  formData: {
    companyName: string;
    companyWebsite: string;
    companyEmail: string;
  };
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

const OrganizationStep = ({ formData, errors, onChange }: OrganizationStepProps) => {
  return (
    <div className="space-y-3 animate-slide-up">
      <div className="text-center mb-3">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-primary text-primary-foreground mb-2 shadow-glow">
          <Building2 className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-foreground">Organization Details</h2>
        <p className="text-muted-foreground text-xs">Tell us about your organization</p>
      </div>

      <div className="grid gap-3">
        <div className="space-y-1">
          <Label htmlFor="companyName" className="flex items-center gap-1 text-xs font-medium">
            <Building2 className="w-3 h-3 text-primary" />
            Company Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="companyName"
            placeholder="Enter company name"
            value={formData.companyName}
            onChange={(e) => onChange("companyName", e.target.value)}
            className={`h-8 text-sm ${errors.companyName ? "border-destructive animate-shake" : ""}`}
          />
          {errors.companyName && (
            <p className="text-xs text-destructive animate-fade-in">{errors.companyName}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="companyWebsite" className="flex items-center gap-1 text-xs font-medium">
            <Globe className="w-3 h-3 text-primary" />
            Company Website <span className="text-destructive">*</span>
          </Label>
          <Input
            id="companyWebsite"
            type="url"
            placeholder="https://www.example.com"
            value={formData.companyWebsite}
            onChange={(e) => onChange("companyWebsite", e.target.value)}
            className={`h-8 text-sm ${errors.companyWebsite ? "border-destructive animate-shake" : ""}`}
          />
          {errors.companyWebsite && (
            <p className="text-xs text-destructive animate-fade-in">{errors.companyWebsite}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="companyEmail" className="flex items-center gap-1 text-xs font-medium">
            <Mail className="w-3 h-3 text-primary" />
            Company Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="companyEmail"
            type="email"
            placeholder="contact@company.com"
            value={formData.companyEmail}
            onChange={(e) => onChange("companyEmail", e.target.value)}
            className={`h-8 text-sm ${errors.companyEmail ? "border-destructive animate-shake" : ""}`}
          />
          {errors.companyEmail && (
            <p className="text-xs text-destructive animate-fade-in">{errors.companyEmail}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationStep;
