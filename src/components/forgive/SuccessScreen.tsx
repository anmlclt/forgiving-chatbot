
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
          src="https://cczcueogekivqbfnrtaf.supabase.co/storage/v1/object/sign/Images/hands.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvaGFuZHMuc3ZnIiwiaWF0IjoxNzM4ODA1ODg0LCJleHAiOjE3NzAzNDE4ODR9.lcIrjafXTBLzFQge1sRQMB0hnXhm6ao9HLnAd7mV3XA"
          alt="Praying hands"
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
