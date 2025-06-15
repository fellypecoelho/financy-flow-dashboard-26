
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Investidor {
  id: string;
  nome: string;
  email: string;
  ativo: boolean;
  saldo_atual: number;
  created_at?: string;
  updated_at?: string;
}

export const useInvestidores = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: investidores = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['investidores'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('investidores')
        .select('*')
        .order('nome');

      if (error) throw error;
      return data || [];
    },
    enabled: !!user
  });

  const createInvestidor = useMutation({
    mutationFn: async (investidor: Omit<Investidor, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('investidores')
        .insert([{
          ...investidor,
          user_id: user?.id
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investidores'] });
      toast({
        title: "Sucesso!",
        description: "Investidor criado com sucesso."
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

  const updateInvestidor = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Investidor> & { id: string }) => {
      const { data, error } = await supabase
        .from('investidores')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investidores'] });
      toast({
        title: "Sucesso!",
        description: "Investidor atualizado com sucesso."
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

  const deleteInvestidor = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('investidores')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investidores'] });
      toast({
        title: "Sucesso!",
        description: "Investidor removido com sucesso."
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
    investidores,
    isLoading,
    error,
    createInvestidor: createInvestidor.mutate,
    updateInvestidor: updateInvestidor.mutate,
    deleteInvestidor: deleteInvestidor.mutate,
    isCreating: createInvestidor.isPending,
    isUpdating: updateInvestidor.isPending,
    isDeleting: deleteInvestidor.isPending
  };
};
