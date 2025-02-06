
import { Home, MessageSquare, HandHeart, User } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1A1F2C] border-t border-gray-700 h-16 flex items-center justify-around px-4">
      <Button
        variant="ghost"
        className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-[#F97316]' : 'text-gray-400'}`}
        onClick={() => onTabChange('home')}
      >
        <Home className="h-5 w-5" />
        <span className="text-xs">Home</span>
      </Button>
      <Button
        variant="ghost"
        className={`flex flex-col items-center gap-1 ${activeTab === 'chat' ? 'text-[#F97316]' : 'text-gray-400'}`}
        onClick={() => onTabChange('chat')}
      >
        <MessageSquare className="h-5 w-5" />
        <span className="text-xs">Chat</span>
      </Button>
      <Button
        variant="ghost"
        className={`flex flex-col items-center gap-1 ${activeTab === 'forgive' ? 'text-[#F97316]' : 'text-gray-400'}`}
        onClick={() => onTabChange('forgive')}
      >
        <HandHeart className="h-5 w-5" />
        <span className="text-xs">Forgive</span>
      </Button>
      <Button
        variant="ghost"
        className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-[#F97316]' : 'text-gray-400'}`}
        onClick={() => onTabChange('profile')}
      >
        <User className="h-5 w-5" />
        <span className="text-xs">Profile</span>
      </Button>
    </div>
  );
};

export default BottomNavigation;
