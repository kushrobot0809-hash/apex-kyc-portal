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
    <div className="space-y-6 animate-slide-up">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary text-primary-foreground mb-4 shadow-glow">
          <Building2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Organization Details</h2>
        <p className="text-muted-foreground mt-2">Tell us about your organization</p>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="companyName" className="flex items-center gap-2 text-sm font-medium">
            <Building2 className="w-4 h-4 text-primary" />
            Company Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="companyName"
            placeholder="Enter company name"
            value={formData.companyName}
            onChange={(e) => onChange("companyName", e.target.value)}
            className={errors.companyName ? "border-destructive animate-shake" : ""}
          />
          {errors.companyName && (
            <p className="text-sm text-destructive animate-fade-in">{errors.companyName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyWebsite" className="flex items-center gap-2 text-sm font-medium">
            <Globe className="w-4 h-4 text-primary" />
            Company Website <span className="text-destructive">*</span>
          </Label>
          <Input
            id="companyWebsite"
            type="url"
            placeholder="https://www.example.com"
            value={formData.companyWebsite}
            onChange={(e) => onChange("companyWebsite", e.target.value)}
            className={errors.companyWebsite ? "border-destructive animate-shake" : ""}
          />
          {errors.companyWebsite && (
            <p className="text-sm text-destructive animate-fade-in">{errors.companyWebsite}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyEmail" className="flex items-center gap-2 text-sm font-medium">
            <Mail className="w-4 h-4 text-primary" />
            Company Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="companyEmail"
            type="email"
            placeholder="contact@company.com"
            value={formData.companyEmail}
            onChange={(e) => onChange("companyEmail", e.target.value)}
            className={errors.companyEmail ? "border-destructive animate-shake" : ""}
          />
          {errors.companyEmail && (
            <p className="text-sm text-destructive animate-fade-in">{errors.companyEmail}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationStep;
