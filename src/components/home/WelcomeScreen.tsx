
import { Menu, User, MessageSquare, HandHeart } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onGetStarted: () => void;
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
            <HandHeart className="h-12 w-12 mb-4 text-[#9b87f5]" />
            <span className="text-lg font-medium">Forgive a sin</span>
            <span className="text-sm text-gray-400 mt-1">Record and seek absolution</span>
          </Button>

          <Button
            onClick={() => onGetStarted('chat')}
            className="flex flex-col items-center justify-center h-40 bg-[#2A2F3C] hover:bg-[#2A2F3C]/90 text-white p-6 rounded-xl w-full"
          >
            <MessageSquare className="h-12 w-12 mb-4 text-[#9b87f5]" />
            <span className="text-lg font-medium">Chat with AI Priest</span>
            <span className="text-sm text-gray-400 mt-1">Seek guidance</span>
          </Button>
        </div>
      </div>

      {renderBottomNavigation()}
    </div>
  );
};

export default WelcomeScreen;
