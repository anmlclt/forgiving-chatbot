
import { MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface KeepPrayingScreenProps {
  onChatClick: () => void;
  onReturn: () => void;
  analysis?: string;
}

const KeepPrayingScreen = ({ onChatClick, onReturn, analysis }: KeepPrayingScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] p-6 animate-fade-in">
      <div className="w-24 h-24 mb-8">
        <img 
          src="https://cczcueogekivqbfnrtaf.supabase.co/storage/v1/object/sign/Images/024-rosary.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvMDI0LXJvc2FyeS5zdmciLCJpYXQiOjE3Mzg4MDg1NjAsImV4cCI6MTc3MDM0NDU2MH0.DgP5mqzr83ZBNp3Y3APECGGdbb-850uxaClZZ7q4_OU"
          alt="Rosary icon"
          className="w-full h-full [filter:brightness(0)_saturate(100%)_invert(45%)_sepia(44%)_saturate(6048%)_hue-rotate(232deg)_brightness(92%)_contrast(93%)]"
        />
      </div>
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        Continue Your Journey
      </h2>
      {analysis && (
        <p className="text-gray-300 text-center mb-4 max-w-md italic">
          "{analysis}"
        </p>
      )}
      <p className="text-gray-300 text-center mb-8 max-w-md">
        True forgiveness requires sincere regret. Take time to reflect on your actions and their impact. Keep praying and examining your conscience.
      </p>
      <div className="space-y-4">
        <Button 
          onClick={onChatClick}
          className="bg-[#6b5de6] hover:bg-[#6b5de6]/90 text-white w-full flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          Chat with AI Priest
        </Button>
        <Button 
          onClick={onReturn}
          variant="outline"
          className="w-full bg-white text-black hover:bg-gray-100"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default KeepPrayingScreen;
