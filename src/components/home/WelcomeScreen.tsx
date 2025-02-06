
import { Menu, User } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onGetStarted: (screen?: string) => void;
  renderBottomNavigation: () => JSX.Element;
}

const WelcomeScreen = ({ onGetStarted, renderBottomNavigation }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-[#D3E7FF] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <Button variant="ghost" className="text-[#6C5DE7] p-2">
          <Menu className="h-6 w-6" />
        </Button>
        <Button variant="ghost" className="text-[#6C5DE7] p-2">
          <User className="h-6 w-6" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-8">
        <h1 className="text-4xl font-bold text-[#6C5DE7] mb-8">
          Welcome to Confess
        </h1>

        {/* Grid of Buttons */}
        <div className="grid grid-cols-1 gap-4">
          <Button
            onClick={() => onGetStarted()}
            className="flex items-center h-40 bg-[#6C5DE7] hover:bg-[#6C5DE7]/90 text-white p-6 rounded-xl w-full"
          >
            <img 
              src="https://cczcueogekivqbfnrtaf.supabase.co/storage/v1/object/sign/Images/hands.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvaGFuZHMuc3ZnIiwiaWF0IjoxNzM4ODIyMTM4LCJleHAiOjE3NzAzNTgxMzh9.t7n-2psDedjK1Q2zkS0e-XrGu2I_m0fZEoiO20nU2ts"
              alt="Hands icon"
              className="h-20 w-20 mr-6 flex-shrink-0 [filter:brightness(0)_saturate(100%)_invert(89%)_sepia(14%)_saturate(523%)_hue-rotate(181deg)_brightness(102%)_contrast(98%)]"
            />
            <div className="text-left">
              <span className="text-lg font-medium block text-[#C0DDFF]">Forgive a sin</span>
              <span className="text-sm block text-[#E4E4E4]">Record and seek absolution</span>
            </div>
          </Button>

          <Button
            onClick={() => onGetStarted('chat')}
            className="flex items-center h-40 bg-[#F7F7F7] hover:bg-[#F7F7F7]/90 p-6 rounded-xl w-full"
          >
            <img 
              src="https://cczcueogekivqbfnrtaf.supabase.co/storage/v1/object/sign/Images/priest.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvcHJpZXN0LnN2ZyIsImlhdCI6MTczODgyMjE3OSwiZXhwIjoxNzcwMzU4MTc5fQ.Y13Z1bL4-vas2Iwi_l1DZzzYQqU2BdgmX6jFopVwXJg"
              alt="Priest icon" 
              className="h-20 w-20 mr-6 flex-shrink-0 [filter:brightness(0)_saturate(100%)_invert(12%)_sepia(98%)_saturate(3795%)_hue-rotate(239deg)_brightness(106%)_contrast(109%)]"
            />
            <div className="text-left">
              <span className="text-lg font-medium block text-[#6C5DE7]">Chat with AI Priest</span>
              <span className="text-sm block text-[#5A5A5A]">Seek guidance</span>
            </div>
          </Button>
        </div>
      </div>

      {renderBottomNavigation()}
    </div>
  );
};

export default WelcomeScreen;
