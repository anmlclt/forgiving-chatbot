
const CrossAnimation = () => {
  return (
    <div className="fixed inset-0 bg-[#1A1F2C] flex items-center justify-center">
      <div className="relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-2 bg-[#F97316] animate-fade-in" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-40 bg-[#F97316] animate-fade-in" />
      </div>
    </div>
  );
};

export default CrossAnimation;
