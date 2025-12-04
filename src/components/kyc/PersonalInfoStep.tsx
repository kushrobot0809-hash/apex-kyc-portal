import { User, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface PersonalInfoStepProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

const PersonalInfoStep = ({ formData, errors, onChange }: PersonalInfoStepProps) => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary text-primary-foreground mb-4 shadow-glow">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Personal Information</h2>
        <p className="text-muted-foreground mt-2">Please provide your personal details</p>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
            <User className="w-4 h-4 text-primary" />
            Full Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => onChange("name", e.target.value)}
            className={errors.name ? "border-destructive animate-shake" : ""}
          />
          {errors.name && (
            <p className="text-sm text-destructive animate-fade-in">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
            <Mail className="w-4 h-4 text-primary" />
            Email Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
            className={errors.email ? "border-destructive animate-shake" : ""}
          />
          {errors.email && (
            <p className="text-sm text-destructive animate-fade-in">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium">
            <Phone className="w-4 h-4 text-primary" />
            Phone Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className={errors.phone ? "border-destructive animate-shake" : ""}
          />
          {errors.phone && (
            <p className="text-sm text-destructive animate-fade-in">{errors.phone}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="flex items-center gap-2 text-sm font-medium">
            <MapPin className="w-4 h-4 text-primary" />
            Address <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="address"
            placeholder="Enter your complete address"
            value={formData.address}
            onChange={(e) => onChange("address", e.target.value)}
            className={`min-h-[100px] resize-none ${errors.address ? "border-destructive animate-shake" : ""}`}
          />
          {errors.address && (
            <p className="text-sm text-destructive animate-fade-in">{errors.address}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
