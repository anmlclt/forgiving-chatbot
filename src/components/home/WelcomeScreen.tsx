
import { Church } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onGetStarted: () => void;
  renderBottomNavigation: () => JSX.Element;
}

const WelcomeScreen = ({ onGetStarted, renderBottomNavigation }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-[#1A1F2C] flex flex-col items-center justify-between p-6">
      <div className="w-full max-w-md flex-1 flex flex-col items-center justify-center text-white space-y-6">
        <div className="w-48 h-48 rounded-full bg-[#9b87f5] flex items-center justify-center mb-8">
          <Church className="w-24 h-24 text-white" />
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-2">
          Ask for Forgiveness
        </h1>
        
        <p className="text-center text-gray-300 max-w-xs">
          Connect with divine guidance through our virtual confession booth. Find peace and forgiveness, available 24/7.
        </p>

        <div className="flex gap-2 justify-center mt-4">
          {[0, 1, 2, 3].map((dot) => (
            <div
              key={dot}
              className={`h-2 rounded-full ${dot === 1 ? 'w-8 bg-[#F97316]' : 'w-2 bg-gray-600'}`}
            />
          ))}
        </div>

        <Button
          onClick={onGetStarted}
          className="w-full max-w-xs mt-8 bg-[#F97316] hover:bg-[#F97316]/90 text-white"
        >
          GET STARTED
        </Button>
      </div>
      {renderBottomNavigation()}
    </div>
  );
};

export default WelcomeScreen;
