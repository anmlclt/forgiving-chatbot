
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface SuccessScreenProps {
  customDescription: string;
  onReturn: () => void;
}

const SuccessScreen = ({ customDescription, onReturn }: SuccessScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] p-6">
      <div className="w-24 h-24 rounded-full bg-[#F97316] flex items-center justify-center mb-8 animate-scale-in">
        <Check className="w-12 h-12 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-4 animate-fade-in">Your Sin Has Been Forgiven</h2>
      <p className="text-gray-300 text-center mb-6 animate-fade-in">
        {customDescription 
          ? "Your personal reflection shows true remorse. Go forth and sin no more."
          : "Your confession has been heard. May peace be with you."}
      </p>
      <Button 
        onClick={onReturn}
        className="bg-[#F97316] hover:bg-[#F97316]/90 text-white animate-scale-in"
      >
        Return to Home
      </Button>
    </div>
  );
};

export default SuccessScreen;
