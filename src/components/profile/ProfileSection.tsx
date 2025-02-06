
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";

const ProfileSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/auth");
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <h2 className="text-2xl font-bold text-white mb-4">Welcome</h2>
        <p className="text-gray-400 text-center mb-6">
          Please sign in to access your profile
        </p>
        <Button
          onClick={() => navigate("/auth")}
          className="bg-[#9b87f5] hover:bg-[#9b87f5]/90"
        >
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-4">
      <h2 className="text-2xl font-bold text-white mb-4">Profile</h2>
      <div className="space-y-4">
        <div>
          <p className="text-gray-400">Email</p>
          <p className="text-white">{user.email}</p>
        </div>
        <Button
          onClick={handleSignOut}
          variant="destructive"
          className="w-full"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default ProfileSection;
