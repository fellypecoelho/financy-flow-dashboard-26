
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface AporteInput {
  descricao: string;
  valor: number;
  investidor_id: string;
  data: string;
}

interface Aporte extends AporteInput {
  id: string;
  user_id: string;
  created_at?: string;
  updated_at?: string;
}

export const useAportes = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: aportes = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['aportes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('aportes')
        .select(`
          *,
          investidores(nome)
        `)
        .order('data', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user
  });

  const createAporte = useMutation({
    mutationFn: async (aporte: AporteInput) => {
      const { data, error } = await supabase
        .from('aportes')
        .insert([{
          ...aporte,
          user_id: user?.id
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aportes'] });
      toast({
        title: "Sucesso!",
        description: "Aporte criado com sucesso."
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const deleteAporte = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('aportes')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aportes'] });
      toast({
        title: "Sucesso!",
        description: "Aporte removido com sucesso."
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  return {
    aportes,
    isLoading,
    error,
    createAporte: createAporte.mutate,
    deleteAporte: deleteAporte.mutate,
    isCreating: createAporte.isPending,
    isDeleting: deleteAporte.isPending
  };
};
