
import { useEffect } from "react";

const CrossAnimation = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // This is handled by the parent component
    }, 5000); // Updated to 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#1A1F2C] flex flex-col items-center justify-center">
      <img 
        src="https://cczcueogekivqbfnrtaf.supabase.co/storage/v1/object/sign/Images/hands.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvaGFuZHMuc3ZnIiwiaWF0IjoxNzM4ODA1NTgzLCJleHAiOjE3NzAzNDE1ODN9.4kV3hNdsljsPNkgyrBEJ7cftpqK0BwGzSUdlWlHZKbs"
        alt="Praying hands"
        className="w-48 h-48 mb-8 [filter:invert(48%)_sepia(94%)_saturate(751%)_hue-rotate(346deg)_brightness(101%)_contrast(96%)] animate-[pulse_10s_ease-in-out_infinite]"
      />
      <p className="text-gray-300 text-base text-center px-4">
        Your request for forgiveness is being analyzed...
      </p>
    </div>
  );
};

export default CrossAnimation;
