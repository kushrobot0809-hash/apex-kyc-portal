import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface SolutionsData {
  whiteLabel: boolean;
  exchange: boolean;
  casinoGames: boolean;
  customGame: boolean;
  paymentGateway: boolean;
  fraudDetection: boolean;
  exchangeApi: boolean;
  mobileApps: boolean;
  liveDealer: boolean;
  regulatory: boolean;
  customPayment: boolean;
  devTeam: boolean;
}

interface SolutionsStepProps {
  solutions: SolutionsData;
  onChange: (field: string, value: boolean) => void;
}

const solutionCategories = [
  {
    title: "Platform Solutions",
    items: [
      { key: "whiteLabel", label: "White-Label Casino Platform", desc: "Fully-branded, turnkey platform" },
      { key: "exchange", label: "Exchange Solutions", desc: "Sports betting with live odds" },
    ],
  },
  {
    title: "Game Solutions",
    items: [
      { key: "casinoGames", label: "Casino Games (1,000+ titles)", desc: "Slots, table games, live dealers" },
      { key: "customGame", label: "Custom Game Development", desc: "Tailored games for your brand" },
    ],
  },
  {
    title: "Payment & Security",
    items: [
      { key: "paymentGateway", label: "Payment Gateway Integration", desc: "Multi-currency, fiat & crypto" },
      { key: "fraudDetection", label: "AI-Powered Fraud Detection", desc: "Real-time fraud prevention" },
    ],
  },
  {
    title: "Premium Add-Ons",
    items: [
      { key: "exchangeApi", label: "Exchange API", desc: "Automated odds & dashboard" },
      { key: "mobileApps", label: "White-Label Mobile Apps", desc: "Custom Android & iOS apps" },
      { key: "liveDealer", label: "Live Dealer Studio Setup", desc: "Complete studio setup" },
    ],
  },
  {
    title: "Regulatory & Development",
    items: [
      { key: "regulatory", label: "Regulatory Consultation", desc: "Licensing & compliance guidance" },
      { key: "customPayment", label: "Custom Payment Integration", desc: "Local payment methods" },
      { key: "devTeam", label: "Dedicated Development Team", desc: "Full-time dev & QA team" },
    ],
  },
];

const SolutionsStep = ({ solutions, onChange }: SolutionsStepProps) => {
  return (
    <div className="space-y-3 flex-1 overflow-y-auto">
      <h2 className="text-base font-semibold text-foreground">Solutions & Add-Ons</h2>
      <p className="text-xs text-muted-foreground">Select the solutions you want for your client</p>

      <div className="space-y-3">
        {solutionCategories.map((category) => (
          <div key={category.title} className="space-y-1.5">
            <h3 className="text-xs font-medium text-primary">{category.title}</h3>
            <div className="space-y-1">
              {category.items.map((item) => (
                <div
                  key={item.key}
                  className="flex items-start gap-2 p-2 rounded-lg border border-border hover:border-primary/50 transition-colors bg-background/50"
                >
                  <Checkbox
                    id={item.key}
                    checked={solutions[item.key as keyof SolutionsData]}
                    onCheckedChange={(checked) => onChange(item.key, checked as boolean)}
                    className="mt-0.5"
                  />
                  <Label htmlFor={item.key} className="flex-1 cursor-pointer">
                    <span className="text-xs font-medium text-foreground block">{item.label}</span>
                    <span className="text-[10px] text-muted-foreground">{item.desc}</span>
                  </Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolutionsStep;
