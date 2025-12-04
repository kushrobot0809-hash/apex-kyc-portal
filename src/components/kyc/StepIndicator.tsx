import { Check, User, Building2, FileCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  steps: { title: string; icon: React.ReactNode }[];
}

const StepIndicator = ({ currentStep, steps }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-2 md:gap-4 mb-8">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-500 relative",
                  isCompleted && "bg-gradient-primary text-primary-foreground shadow-glow",
                  isActive && "bg-gradient-primary text-primary-foreground shadow-glow animate-pulse-slow",
                  !isCompleted && !isActive && "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="w-6 h-6 animate-bounce-in" />
                ) : (
                  <span className="text-current">{step.icon}</span>
                )}
                {isActive && (
                  <span className="absolute -inset-1 rounded-full bg-gradient-primary opacity-30 animate-ping" />
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs md:text-sm font-medium transition-colors duration-300 text-center max-w-[80px]",
                  (isCompleted || isActive) ? "text-primary" : "text-muted-foreground"
                )}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-8 md:w-16 h-1 mx-2 rounded-full transition-all duration-500",
                  index < currentStep ? "bg-gradient-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
