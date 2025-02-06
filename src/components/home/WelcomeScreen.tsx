
import { Menu, User } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onGetStarted: (screen?: string) => void;
  renderBottomNavigation: () => JSX.Element;
}

const WelcomeScreen = ({ onGetStarted, renderBottomNavigation }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D3E4FD] to-[#E7F0FD] flex flex-col px-6">
      {/* Main Content */}
      <div className="flex-1 pt-12">
        <h1 className="text-4xl font-bold text-[#4646F9] mb-8">
          Welcome back, Alex
        </h1>

        {/* Grid of Buttons */}
        <div className="grid grid-cols-1 gap-6 max-w-md mx-auto w-full">
          <Button
            onClick={() => onGetStarted()}
            className="relative flex flex-col items-start justify-center h-[160px] bg-[#4646F9] hover:bg-[#4646F9]/90 text-white p-6 rounded-2xl w-full text-left overflow-hidden"
          >
            <div className="relative z-10 max-w-[55%]">
              <span className="text-2xl font-semibold mb-2 block">Forgive a sin</span>
              <p className="text-sm text-white/80 break-words">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
            </div>
            {/* Prayer hands icon */}
            <svg 
              className="absolute right-2 top-1/2 -translate-y-1/2 h-32 w-32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 6C7.5 6 7.5 3 7.5 3C7.5 3 7.5 0 12 0C16.5 0 16.5 3 16.5 3C16.5 3 16.5 6 12 6Z" fill="currentColor"/>
              <path d="M12 6V24M7.5 12L12 9M16.5 12L12 9" stroke="currentColor"/>
            </svg>
          </Button>

          <Button
            onClick={() => onGetStarted('chat')}
            className="relative flex items-start h-[160px] bg-white hover:bg-white/90 text-[#4646F9] p-6 rounded-2xl w-full text-left"
          >
            {/* Priest icon */}
            <svg 
              className="h-32 w-32 mr-4 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="7" r="4" stroke="currentColor"/>
              <path d="M12 11V20M8 16H16" stroke="currentColor"/>
              <rect x="10" y="14" width="4" height="4" stroke="currentColor"/>
            </svg>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-2xl font-semibold mb-2">Chat with AI Priest</span>
              <p className="text-sm text-[#4646F9]/80 break-words pr-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
            </div>
          </Button>
        </div>
      </div>

      {renderBottomNavigation()}
    </div>
  );
};

export default WelcomeScreen;
