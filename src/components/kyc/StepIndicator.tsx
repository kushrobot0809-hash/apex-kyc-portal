import { Check, User, Building2, FileCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  steps: { title: string; icon: React.ReactNode }[];
}

const StepIndicator = ({ currentStep, steps }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-1 md:gap-2 mb-3">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-500 relative",
                  isCompleted && "bg-gradient-primary text-primary-foreground shadow-glow",
                  isActive && "bg-gradient-primary text-primary-foreground shadow-glow animate-pulse-slow",
                  !isCompleted && !isActive && "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 animate-bounce-in" />
                ) : (
                  <span className="text-current scale-75">{step.icon}</span>
                )}
                {isActive && (
                  <span className="absolute -inset-1 rounded-full bg-gradient-primary opacity-30 animate-ping" />
                )}
              </div>
              <span
                className={cn(
                  "mt-1 text-[10px] md:text-xs font-medium transition-colors duration-300 text-center max-w-[60px]",
                  (isCompleted || isActive) ? "text-primary" : "text-muted-foreground"
                )}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-6 md:w-10 h-0.5 mx-1 rounded-full transition-all duration-500",
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
