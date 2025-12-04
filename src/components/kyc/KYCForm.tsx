import { useState } from "react";
import { User, Building2, FileCheck, Package, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import StepIndicator from "./StepIndicator";
import PersonalInfoStep from "./PersonalInfoStep";
import OrganizationStep from "./OrganizationStep";
import KYCDocumentsStep from "./KYCDocumentsStep";
import SolutionsStep from "./SolutionsStep";
import SuccessModal from "./SuccessModal";

const steps = [
  { title: "Personal Info", icon: <User className="w-6 h-6" /> },
  { title: "Organization", icon: <Building2 className="w-6 h-6" /> },
  { title: "KYC Documents", icon: <FileCheck className="w-6 h-6" /> },
  { title: "Solutions", icon: <Package className="w-6 h-6" /> },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  companyName: string;
  companyWebsite: string;
  companyEmail: string;
}

interface FileData {
  passportPhoto: File | null;
}

const KYCForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    companyName: "",
    companyWebsite: "",
    companyEmail: "",
  });

  const [files, setFiles] = useState<FileData>({
    passportPhoto: null,
  });

  const [previews, setPreviews] = useState({
    passportPhoto: null as string | null,
  });

  const [solutions, setSolutions] = useState({
    whiteLabel: false,
    exchange: false,
    casinoGames: false,
    customGame: false,
    paymentGateway: false,
    fraudDetection: false,
    exchangeApi: false,
    mobileApps: false,
    liveDealer: false,
    regulatory: false,
    customPayment: false,
    devTeam: false,
  });

  const handleSolutionChange = (field: string, value: boolean) => {
    setSolutions((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFiles((prev) => ({ ...prev, [field]: file }));
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } else {
      setPreviews((prev) => ({ ...prev, [field]: null }));
    }

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ""))) {
        newErrors.phone = "Please enter a valid 10-digit phone number";
      }
      if (!formData.address.trim()) newErrors.address = "Address is required";
    }

    if (step === 1) {
      if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
      if (!formData.companyWebsite.trim()) {
        newErrors.companyWebsite = "Company website is required";
      } else if (!/^https?:\/\/.+/.test(formData.companyWebsite)) {
        newErrors.companyWebsite = "Please enter a valid URL (starting with http:// or https://)";
      }
      if (!formData.companyEmail.trim()) {
        newErrors.companyEmail = "Company email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.companyEmail)) {
        newErrors.companyEmail = "Please enter a valid email";
      }
    }

    if (step === 2) {
      // No validation - passport photo is optional
    }

    if (step === 3) {
      // At least one solution must be selected
      const hasAnySolution = Object.values(solutions).some((v) => v);
      if (!hasAnySolution) {
        newErrors.solutions = "Please select at least one solution";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
        toast.success("Step completed!", {
          description: `Moving to ${steps[currentStep + 1].title}`,
        });
      }
    } else {
      toast.error("Please fill all required fields", {
        description: "Check the form for errors",
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      setIsSubmitting(false);
      setShowSuccess(true);
      toast.success("KYC Submitted Successfully!", {
        description: "We'll review your documents shortly",
      });
    } else {
      toast.error("Please upload all required documents");
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setCurrentStep(0);
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      companyName: "",
      companyWebsite: "",
      companyEmail: "",
    });
    setFiles({
      passportPhoto: null,
    });
    setPreviews({
      passportPhoto: null,
    });
    setSolutions({
      whiteLabel: false,
      exchange: false,
      casinoGames: false,
      customGame: false,
      paymentGateway: false,
      fraudDetection: false,
      exchangeApi: false,
      mobileApps: false,
      liveDealer: false,
      regulatory: false,
      customPayment: false,
      devTeam: false,
    });
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto h-full flex flex-col">
        <StepIndicator currentStep={currentStep} steps={steps} />

        <div className="bg-card rounded-xl shadow-xl p-3 md:p-4 hover-lift flex-1 flex flex-col min-h-0">
          {currentStep === 0 && (
            <PersonalInfoStep
              formData={formData}
              errors={errors}
              onChange={handleFormChange}
            />
          )}
          {currentStep === 1 && (
            <OrganizationStep
              formData={formData}
              errors={errors}
              onChange={handleFormChange}
            />
          )}
          {currentStep === 2 && (
            <KYCDocumentsStep
              files={files}
              previews={previews}
              errors={errors}
              onFileChange={handleFileChange}
            />
          )}
          {currentStep === 3 && (
            <SolutionsStep
              solutions={solutions}
              onChange={handleSolutionChange}
            />
          )}

          <div className="flex justify-between mt-auto pt-3 border-t border-border flex-shrink-0">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="gap-1 h-7 text-xs px-3"
            >
              <ArrowLeft className="w-3 h-3" />
              Previous
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext} className="gap-1 h-7 text-xs px-3">
                Next
                <ArrowRight className="w-3 h-3" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="gap-1 h-7 text-xs px-3 bg-gradient-primary hover:opacity-90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit KYC
                    <ArrowRight className="w-3 h-3" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      <SuccessModal isOpen={showSuccess} onClose={handleSuccessClose} />
    </>
  );
};

export default KYCForm;
