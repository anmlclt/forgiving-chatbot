
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
      <div className="relative mb-8">
        {/* Vertical bar - made longer */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-48 bg-[#F97316] animate-[pulse_2s_ease-in-out_infinite]" />
        {/* Horizontal bar - made shorter */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-2 bg-[#F97316] animate-[pulse_2s_ease-in-out_infinite]" />
      </div>
      <p className="text-gray-300 text-lg animate-pulse mt-8">
        Your request for forgiveness is being analyzed...
      </p>
    </div>
  );
};

export default CrossAnimation;
