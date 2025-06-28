import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Lancamento } from '@/types';

interface LancamentoInput {
  titulo: string;
  valor: number;
  data: string;
  tipo: 'receita' | 'despesa';
  categoria_id: string;
  descricao?: string;
}

export function useLancamentos() {
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    fetchLancamentos();
  }, []);

  const fetchLancamentos = async () => {
    try {
      const { data, error } = await supabase
        .from('lancamentos')
        .select(`
          *,
          categorias (
            id,
            nome,
            cor,
            icone
          )
        `)
        .order('data', { ascending: false });

      if (error) {
        console.error('Erro ao buscar lançamentos:', error);
        return;
      }

      setLancamentos(data || []);
    } catch (error) {
      console.error('Erro ao buscar lançamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const addLancamento = async (lancamento: Omit<Lancamento, 'id' | 'created_at' | 'updated_at'>) => {
    if (!isAdmin) {
      throw new Error('Apenas administradores podem adicionar lançamentos');
    }

    try {
      const { data, error } = await supabase
        .from('lancamentos')
        .insert([lancamento])
        .select()
        .single();

      if (error) {
        console.error('Erro ao adicionar lançamento:', error);
        throw error;
      }

      setLancamentos(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('Erro ao adicionar lançamento:', error);
      throw error;
    }
  };

  const updateLancamento = async (id: string, updates: Partial<Lancamento>) => {
    if (!isAdmin) {
      throw new Error('Apenas administradores podem editar lançamentos');
    }

    try {
      const { data, error } = await supabase
        .from('lancamentos')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Erro ao atualizar lançamento:', error);
        throw error;
      }

      setLancamentos(prev => 
        prev.map(l => l.id === id ? data : l)
      );
      return data;
    } catch (error) {
      console.error('Erro ao atualizar lançamento:', error);
      throw error;
    }
  };

  const deleteLancamento = async (id: string) => {
    if (!isAdmin) {
      throw new Error('Apenas administradores podem excluir lançamentos');
    }

    try {
      const { error } = await supabase
        .from('lancamentos')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erro ao deletar lançamento:', error);
        throw error;
      }

      setLancamentos(prev => prev.filter(l => l.id !== id));
    } catch (error) {
      console.error('Erro ao deletar lançamento:', error);
      throw error;
    }
  };

  return {
    lancamentos,
    loading,
    addLancamento,
    updateLancamento,
    deleteLancamento,
    refreshLancamentos: fetchLancamentos,
  };
} 