import { Shield, Sparkles } from "lucide-react";
import KYCForm from "@/components/kyc/KYCForm";

const Index = () => {
  return (
    <div className="h-screen overflow-hidden flex flex-col py-4 px-4">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      </div>

      <div className="relative flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Header */}
        <header className="text-center mb-4 animate-slide-up flex-shrink-0">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
            <Shield className="w-4 h-4" />
            <span>Secure KYC Verification</span>
            <Sparkles className="w-4 h-4" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-gradient">CrickFeed</span>
            <span className="text-foreground"> KYC</span>
          </h1>
          
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Complete your verification in 3 simple steps
          </p>
        </header>

        {/* Form */}
        <main className="flex-1 min-h-0">
          <KYCForm />
        </main>

        {/* Footer */}
        <footer className="text-center py-2 text-xs text-muted-foreground animate-fade-in flex-shrink-0">
          <p className="flex items-center justify-center gap-2">
            <Shield className="w-3 h-3 text-success" />
            Your data is protected with 256-bit encryption
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
