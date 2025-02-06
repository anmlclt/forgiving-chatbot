
import { Button } from "@/components/ui/button";

interface SuccessScreenProps {
  customDescription: string;
  onReturn: () => void;
}

const SuccessScreen = ({ customDescription, onReturn }: SuccessScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] p-6">
      <div className="w-24 h-24 mb-8 animate-scale-in">
        <img 
          src="https://cczcueogekivqbfnrtaf.supabase.co/storage/v1/object/sign/Images/angel.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvYW5nZWwuc3ZnIiwiaWF0IjoxNzM4ODA2MDUyLCJleHAiOjE3NzAzNDIwNTJ9.0F94X5vgzRMo36p_GYCRPDMHaLCGCDZ3jCWwHW7M8x4"
          alt="Angel icon"
          className="w-full h-full [filter:invert(48%)_sepia(94%)_saturate(751%)_hue-rotate(346deg)_brightness(101%)_contrast(96%)]"
        />
      </div>
      <h2 className="text-2xl font-bold text-white mb-4 text-center animate-fade-in">
        Your Sin Has Been Forgiven
      </h2>
      <p className="text-gray-300 text-center mb-6 animate-fade-in">
        {customDescription 
          ? "Your personal reflection shows true remorse. Go forth and sin no more."
          : "Your confession has been heard. May peace be with you."}
      </p>
      <Button 
        onClick={onReturn}
        className="bg-[#F97316] hover:bg-[#F97316]/90 text-white animate-scale-in"
      >
        Forgive Another Sin
      </Button>
    </div>
  );
};

export default SuccessScreen;
