
import { Menu, User } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onGetStarted: (screen?: string) => void;
  renderBottomNavigation: () => JSX.Element;
}

const WelcomeScreen = ({ onGetStarted, renderBottomNavigation }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-[#1A1F2C] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <Button variant="ghost" className="text-white p-2">
          <Menu className="h-6 w-6" />
        </Button>
        <Button variant="ghost" className="text-white p-2">
          <User className="h-6 w-6" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          Welcome to Confess
        </h1>

        {/* Grid of Buttons */}
        <div className="grid grid-cols-1 gap-4">
          <Button
            onClick={() => onGetStarted()}
            className="flex flex-col items-center justify-center h-40 bg-[#2A2F3C] hover:bg-[#2A2F3C]/90 text-white p-6 rounded-xl w-full"
          >
            <img 
              src="https://cczcueogekivqbfnrtaf.supabase.co/storage/v1/object/sign/Images/hands.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvaGFuZHMuc3ZnIiwiaWF0IjoxNzM4ODIyMTM4LCJleHAiOjE3NzAzNTgxMzh9.t7n-2psDedjK1Q2zkS0e-XrGu2I_m0fZEoiO20nU2ts"
              alt="Hands icon"
              className="h-16 w-16 mb-4"
            />
            <span className="text-lg font-medium">Forgive a sin</span>
            <span className="text-sm text-gray-400 mt-1 text-center">Record and seek absolution</span>
          </Button>

          <Button
            onClick={() => onGetStarted('chat')}
            className="flex flex-col items-center justify-center h-40 bg-[#2A2F3C] hover:bg-[#2A2F3C]/90 text-white p-6 rounded-xl w-full"
          >
            <img 
              src="https://cczcueogekivqbfnrtaf.supabase.co/storage/v1/object/sign/Images/priest.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvcHJpZXN0LnN2ZyIsImlhdCI6MTczODgyMjE3OSwiZXhwIjoxNzcwMzU4MTc5fQ.Y13Z1bL4-vas2Iwi_l1DZzzYQqU2BdgmX6jFopVwXJg"
              alt="Priest icon" 
              className="h-16 w-16 mb-4"
            />
            <span className="text-lg font-medium">Chat with AI Priest</span>
            <span className="text-sm text-gray-400 mt-1 text-center">Seek guidance</span>
          </Button>
        </div>
      </div>

      {renderBottomNavigation()}
    </div>
  );
};

export default WelcomeScreen;
