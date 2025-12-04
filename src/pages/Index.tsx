import { Shield, Sparkles } from "lucide-react";
import KYCForm from "@/components/kyc/KYCForm";

const Index = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            <span>Secure KYC Verification</span>
            <Sparkles className="w-4 h-4" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">CrickFeed</span>
            <span className="text-foreground"> KYC</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Complete your verification in 3 simple steps. Your data is encrypted and secure.
          </p>
        </header>

        {/* Form */}
        <main>
          <KYCForm />
        </main>

        {/* Footer */}
        <footer className="text-center mt-12 text-sm text-muted-foreground animate-fade-in">
          <p className="flex items-center justify-center gap-2">
            <Shield className="w-4 h-4 text-success" />
            Your data is protected with 256-bit encryption
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
