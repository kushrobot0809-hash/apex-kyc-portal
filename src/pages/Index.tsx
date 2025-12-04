import { Shield, Sparkles } from "lucide-react";
import KYCForm from "@/components/kyc/KYCForm";

const Index = () => {
  return (
    <div className="h-screen overflow-hidden flex flex-col py-2 px-3">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      </div>

      <div className="relative flex-1 flex flex-col max-w-lg mx-auto w-full min-h-0">
        {/* Header */}
        <header className="text-center mb-2 animate-slide-up flex-shrink-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-1.5">
            <Shield className="w-3 h-3" />
            <span>Secure KYC Verification</span>
            <Sparkles className="w-3 h-3" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold">
            <span className="text-gradient">CrickFeed</span>
            <span className="text-foreground"> KYC</span>
          </h1>
        </header>

        {/* Form */}
        <main className="flex-1 min-h-0">
          <KYCForm />
        </main>

        {/* Footer */}
        <footer className="text-center py-1 text-[10px] text-muted-foreground animate-fade-in flex-shrink-0">
          <p className="flex items-center justify-center gap-1">
            <Shield className="w-2.5 h-2.5 text-success" />
            Your data is protected with 256-bit encryption
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
