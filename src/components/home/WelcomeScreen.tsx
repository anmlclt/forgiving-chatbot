
import { Menu, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";

interface WelcomeScreenProps {
  onGetStarted: (screen?: string) => void;
  renderBottomNavigation: () => JSX.Element;
}

const WelcomeScreen = ({ onGetStarted, renderBottomNavigation }: WelcomeScreenProps) => {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'there';

  return (
    <div className="min-h-screen bg-[#D3E4FD] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <Button variant="ghost" className="text-[#1A1F2C] p-2">
          <Menu className="h-6 w-6" />
        </Button>
        <Button variant="ghost" className="text-[#1A1F2C] p-2">
          <User className="h-6 w-6" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-8">
        <h1 className="text-4xl font-bold text-[#1A1F2C] mb-8">
          Welcome back, {firstName}
        </h1>

        {/* Grid of Cards */}
        <div className="space-y-4">
          <Button
            onClick={() => onGetStarted()}
            className="flex items-start justify-between w-full bg-[#4646F9] hover:bg-[#4646F9]/90 text-white p-6 rounded-2xl"
          >
            <div className="text-left">
              <h2 className="text-2xl font-semibold mb-2">Forgive a sin</h2>
              <p className="text-sm text-white/80 max-w-[70%]">
                Record your confession and seek absolution through guidance
              </p>
            </div>
            <img
              src="https://cczcueogekivqbfnrtaf.supabase.co/storage/v1/object/sign/Images/priest.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvcHJpZXN0LnN2ZyIsImlhdCI6MTczODgyMDU4NCwiZXhwIjoxNzcwMzU2NTg0fQ.tP-RLxHKvkxRbOrbaBd3Jc8vw9Q5iu3Jz7bkHbD2BvI"
              alt="Priest Icon"
              className="w-12 h-12 object-contain"
            />
          </Button>

          <Button
            onClick={() => onGetStarted('chat')}
            className="flex items-start justify-between w-full bg-white hover:bg-white/90 text-[#1A1F2C] p-6 rounded-2xl"
          >
            <div className="text-left">
              <h2 className="text-2xl font-semibold mb-2">Chat with AI Priest</h2>
              <p className="text-sm text-[#1A1F2C]/70 max-w-[70%]">
                Get spiritual guidance and support through conversation
              </p>
            </div>
            <img
              src="https://cczcueogekivqbfnrtaf.supabase.co/storage/v1/object/sign/Images/priest.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvcHJpZXN0LnN2ZyIsImlhdCI6MTczODgyMDU4NCwiZXhwIjoxNzcwMzU2NTg0fQ.tP-RLxHKvkxRbOrbaBd3Jc8vw9Q5iu3Jz7bkHbD2BvI"
              alt="AI Priest Icon"
              className="w-12 h-12 object-contain"
            />
          </Button>
        </div>
      </div>

      {renderBottomNavigation()}
    </div>
  );
};

export default WelcomeScreen;
