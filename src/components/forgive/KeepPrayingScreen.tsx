
import { MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface KeepPrayingScreenProps {
  onChatClick: () => void;
  onReturn: () => void;
}

const KeepPrayingScreen = ({ onChatClick, onReturn }: KeepPrayingScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] p-6 animate-fade-in">
      <div className="w-24 h-24 mb-8">
        <img 
          src="https://cczcueogekivqbfnrtaf.supabase.co/storage/v1/object/sign/Images/024-rosary.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvMDI0LXJvc2FyeS5zdmciLCJpYXQiOjE3Mzg4MDg1NjAsImV4cCI6MTc3MDM0NDU2MH0.DgP5mqzr83ZBNp3Y3APECGGdbb-850uxaClZZ7q4_OU"
          alt="Rosary icon"
          className="w-full h-full [filter:invert(48%)_sepia(94%)_saturate(751%)_hue-rotate(346deg)_brightness(101%)_contrast(96%)]"
        />
      </div>
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        Continue Your Journey
      </h2>
      <p className="text-gray-300 text-center mb-8 max-w-md">
        True forgiveness requires sincere regret. Take time to reflect on your actions and their impact. Keep praying and examining your conscience.
      </p>
      <div className="space-y-4">
        <Button 
          onClick={onChatClick}
          className="bg-[#F97316] hover:bg-[#F97316]/90 text-white w-full flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          Chat with AI Priest
        </Button>
        <Button 
          onClick={onReturn}
          variant="outline"
          className="w-full text-white"
        >
          Return
        </Button>
      </div>
    </div>
  );
};

export default KeepPrayingScreen;
