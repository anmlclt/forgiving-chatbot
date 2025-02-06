
import { useEffect } from "react";

const CrossAnimation = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // This is handled by the parent component
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#1A1F2C] flex flex-col items-center justify-center">
      <img 
        src="https://cczcueogekivqbfnrtaf.supabase.co/storage/v1/object/sign/Images/hands.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvaGFuZHMuc3ZnIiwiaWF0IjoxNzM4ODA1NTgzLCJleHAiOjE3NzAzNDE1ODN9.4kV3hNdsljsPNkgyrBEJ7cftpqK0BwGzSUdlWlHZKbs"
        alt="Praying hands"
        className="w-48 h-48 mb-8 animate-[pulse_2s_ease-in-out_infinite]"
      />
      <p className="text-gray-300 text-lg animate-pulse mt-8">
        Your request for forgiveness is being analyzed...
      </p>
    </div>
  );
};

export default CrossAnimation;
