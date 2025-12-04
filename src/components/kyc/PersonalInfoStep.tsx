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
    <div className="space-y-3 animate-slide-up">
      <div className="text-center mb-3">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-primary text-primary-foreground mb-2 shadow-glow">
          <User className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-foreground">Personal Information</h2>
        <p className="text-muted-foreground text-xs">Please provide your personal details</p>
      </div>

      <div className="grid gap-3">
        <div className="grid md:grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label htmlFor="name" className="flex items-center gap-1 text-xs font-medium">
              <User className="w-3 h-3 text-primary" />
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => onChange("name", e.target.value)}
              className={`h-8 text-sm ${errors.name ? "border-destructive animate-shake" : ""}`}
            />
            {errors.name && (
              <p className="text-xs text-destructive animate-fade-in">{errors.name}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="email" className="flex items-center gap-1 text-xs font-medium">
              <Mail className="w-3 h-3 text-primary" />
              Email Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => onChange("email", e.target.value)}
              className={`h-8 text-sm ${errors.email ? "border-destructive animate-shake" : ""}`}
            />
            {errors.email && (
              <p className="text-xs text-destructive animate-fade-in">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="phone" className="flex items-center gap-1 text-xs font-medium">
            <Phone className="w-3 h-3 text-primary" />
            Phone Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className={`h-8 text-sm ${errors.phone ? "border-destructive animate-shake" : ""}`}
          />
          {errors.phone && (
            <p className="text-xs text-destructive animate-fade-in">{errors.phone}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="address" className="flex items-center gap-1 text-xs font-medium">
            <MapPin className="w-3 h-3 text-primary" />
            Address <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="address"
            placeholder="Enter your complete address"
            value={formData.address}
            onChange={(e) => onChange("address", e.target.value)}
            className={`min-h-[60px] resize-none text-sm ${errors.address ? "border-destructive animate-shake" : ""}`}
          />
          {errors.address && (
            <p className="text-xs text-destructive animate-fade-in">{errors.address}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
