
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Profile {
  id: string;
  name: string | null;
  avatar_url: string | null;
  phone: string | null;
  bio: string | null;
  company: string | null;
}

interface ProfileUpdate {
  name?: string;
  avatar_url?: string;
  phone?: string;
  bio?: string;
  company?: string;
}

export function useProfile(userId?: string) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const targetUserId = userId || user?.email;

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile', targetUserId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', targetUserId)
        .single();

      if (error) throw error;
      return data as Profile;
    },
    enabled: !!targetUserId,
  });

  const updateProfile = useMutation({
    mutationFn: async (updates: ProfileUpdate) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user?.email)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', targetUserId] });
    },
  });

  return {
    profile,
    isLoading,
    error,
    updateProfile,
  };
}
