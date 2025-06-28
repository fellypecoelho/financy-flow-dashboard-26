import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/types';

export const useProfiles = () => {
  const { user } = useAuth();

  const {
    data: currentProfile,
    isLoading,
    error
  } = useQuery({
    queryKey: ['profile'],
    queryFn: async (): Promise<User | null> => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  return {
    currentProfile,
    isLoading,
    error
  };
};
