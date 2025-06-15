
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { transformDespesaFromDB } from '@/utils/dataTransforms';
import { Despesa } from '@/types';

interface DespesaInput {
  descricao: string;
  origem: string;
  categoria_id: string;
  valor: number;
  data_compra: string;
  data_vencimento: string;
  forma_pagamento: 'dinheiro' | 'transferencia' | 'cartao';
  status: 'pendente' | 'pago';
  tipo: 'unica' | 'recorrente' | 'parcelada';
  cartao_id?: string;
  frequencia?: 'mensal' | 'trimestral' | 'semestral' | 'anual';
  total_parcelas?: number;
  parcela_atual?: number;
}

export const useDespesas = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: despesas = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['despesas'],
    queryFn: async (): Promise<Despesa[]> => {
      const { data, error } = await supabase
        .from('despesas')
        .select('*')
        .order('data_vencimento', { ascending: false });

      if (error) throw error;
      return (data || []).map(transformDespesaFromDB);
    },
    enabled: !!user
  });

  const createDespesa = useMutation({
    mutationFn: async (despesa: DespesaInput) => {
      const { data, error } = await supabase
        .from('despesas')
        .insert([{
          ...despesa,
          user_id: user?.id
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['despesas'] });
      toast({
        title: "Sucesso!",
        description: "Despesa criada com sucesso."
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

  const updateDespesa = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<DespesaInput> & { id: string }) => {
      const { data, error } = await supabase
        .from('despesas')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['despesas'] });
      toast({
        title: "Sucesso!",
        description: "Despesa atualizada com sucesso."
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

  const deleteDespesa = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('despesas')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['despesas'] });
      toast({
        title: "Sucesso!",
        description: "Despesa removida com sucesso."
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
    despesas,
    isLoading,
    error,
    createDespesa: createDespesa.mutate,
    updateDespesa: updateDespesa.mutate,
    deleteDespesa: deleteDespesa.mutate,
    isCreating: createDespesa.isPending,
    isUpdating: updateDespesa.isPending,
    isDeleting: deleteDespesa.isPending
  };
};
