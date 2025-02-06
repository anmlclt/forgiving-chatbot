
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export interface Profile {
  id: string;
  avatar_url: string | null;
  first_name: string | null;
  updated_at: string;
}

export const useProfile = (userId: string | undefined) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data as Profile;
    },
    enabled: !!userId,
  });

  const updateAvatar = useMutation({
    mutationFn: async (avatarFile: File) => {
      if (!userId) throw new Error("No user ID");

      // Upload image to storage
      const fileExt = avatarFile.name.split('.').pop();
      const fileName = `${userId}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('Images')
        .upload(filePath, avatarFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('Images')
        .getPublicUrl(filePath);

      // Update profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', userId);

      if (updateError) throw updateError;

      return publicUrl;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });
      toast({
        title: "Success",
        description: "Avatar updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update avatar: " + error.message,
        variant: "destructive",
      });
    },
  });

  const updateFirstName = useMutation({
    mutationFn: async (firstName: string) => {
      if (!userId) throw new Error("No user ID");

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ first_name: firstName })
        .eq('id', userId);

      if (updateError) throw updateError;

      return firstName;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });
      toast({
        title: "Success",
        description: "Name updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update name: " + error.message,
        variant: "destructive",
      });
    },
  });

  return {
    profile,
    isLoading,
    updateAvatar: updateAvatar.mutate,
    updateFirstName: updateFirstName.mutate,
    isUpdating: updateAvatar.isPending || updateFirstName.isPending
  };
};
