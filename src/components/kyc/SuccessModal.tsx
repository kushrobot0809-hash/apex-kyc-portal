import { CheckCircle2, PartyPopper, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal = ({ isOpen, onClose }: SuccessModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="relative bg-card rounded-2xl p-8 max-w-md w-full shadow-2xl animate-bounce-in">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
              <CheckCircle2 className="w-12 h-12 text-primary-foreground" />
            </div>
            <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-warning animate-pulse" />
            <PartyPopper className="absolute -bottom-2 -left-2 w-8 h-8 text-accent animate-bounce" />
          </div>
        </div>

        <div className="text-center mt-12">
          <h2 className="text-3xl font-bold text-gradient mb-4">
            KYC Submitted Successfully!
          </h2>
          <p className="text-muted-foreground mb-8">
            Thank you for completing your KYC verification. Our team will review your documents and get back to you within 24-48 hours.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span>Application Reference: CRK-{Date.now().toString(36).toUpperCase()}</span>
            </div>
            
            <Button onClick={onClose} size="lg" className="w-full">
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
