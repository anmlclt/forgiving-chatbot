
import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/components/auth/AuthProvider";
import { useProfile } from "@/hooks/useProfile";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface WelcomeScreenProps {
  onGetStarted: (screen?: string) => void;
  renderBottomNavigation: () => JSX.Element;
}

const WelcomeScreen = ({ onGetStarted, renderBottomNavigation }: WelcomeScreenProps) => {
  const { user } = useAuth();
  const { profile, updateAvatar, updateFirstName, isUpdating } = useProfile(user?.id);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [firstName, setFirstName] = useState(profile?.first_name || "");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateAvatar(file);
    }
  };

  const handleSaveFirstName = () => {
    if (firstName.trim()) {
      updateFirstName(firstName);
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#242424] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <Button variant="ghost" className="text-[#F7F7F7] p-2">
          <Menu className="h-6 w-6" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={profile?.avatar_url || undefined} alt="Profile" />
                <AvatarFallback>
                  {user?.email?.charAt(0).toUpperCase() || '?'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
              {isUpdating ? 'Updating...' : 'Change Avatar'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
              Change Name
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-8">
        <h1 className="text-4xl font-bold text-[#F7F7F7] mb-8">
          {profile?.first_name ? `Hi, ${profile.first_name}` : 'Welcome to Confess'}
        </h1>

        {/* Grid of Buttons */}
        <div className="grid grid-cols-1 gap-4">
          <Button
            onClick={() => onGetStarted()}
            className="flex items-center h-40 bg-[#6C5DE7] hover:bg-[#6C5DE7]/90 text-white p-6 rounded-xl w-full"
          >
            <img 
              src="https://cczcueogekivqbfnrtaf.supabase.co/storage/v1/object/sign/Images/hands.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvaGFuZHMuc3ZnIiwiaWF0IjoxNzM4ODIyMTM4LCJleHAiOjE3NzAzNTgxMzh9.t7n-2psDedjK1Q2zkS0e-XrGu2I_m0fZEoiO20nU2ts"
              alt="Hands icon"
              className="h-20 w-20 mr-6 flex-shrink-0 [filter:brightness(0)_saturate(100%)_invert(100%)_sepia(0%)_saturate(0%)_hue-rotate(0deg)_brightness(100%)_contrast(100%)]"
            />
            <div className="text-left">
              <span className="text-lg font-medium block text-white">Forgive a sin</span>
              <span className="text-sm block text-white">Record and seek absolution</span>
            </div>
          </Button>

          <Button
            onClick={() => onGetStarted('chat')}
            className="flex items-center h-40 bg-[#F7F7F7] hover:bg-[#F7F7F7]/90 p-6 rounded-xl w-full"
          >
            <img 
              src="https://cczcueogekivqbfnrtaf.supabase.co/storage/v1/object/sign/Images/priest.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvcHJpZXN0LnN2ZyIsImlhdCI6MTczODgyMjE3OSwiZXhwIjoxNzcwMzU4MTc5fQ.Y13Z1bL4-vas2Iwi_l1DZzzYQqU2BdgmX6jFopVwXJg"
              alt="Priest icon" 
              className="h-20 w-20 mr-6 flex-shrink-0 [filter:brightness(0)_saturate(100%)_invert(12%)_sepia(98%)_saturate(3795%)_hue-rotate(239deg)_brightness(106%)_contrast(109%)]"
            />
            <div className="text-left">
              <span className="text-lg font-medium block text-[#6C5DE7]">Chat with AI Priest</span>
              <span className="text-sm block text-[#5A5A5A]">Seek guidance</span>
            </div>
          </Button>
        </div>
      </div>

      {/* Name Change Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change your name</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
            />
            <Button onClick={handleSaveFirstName} disabled={!firstName.trim()}>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {renderBottomNavigation()}
    </div>
  );
};

export default WelcomeScreen;
