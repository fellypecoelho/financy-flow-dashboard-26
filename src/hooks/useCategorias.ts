import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { Categoria } from '../types';
import { useAuth } from './useAuth';

export function useCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const { data, error } = await supabase
        .from('categorias')
        .select('*')
        .order('nome');

      if (error) {
        console.error('Erro ao buscar categorias:', error);
        return;
      }

      setCategorias(data || []);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    } finally {
      setLoading(false);
    }
  };

  const addCategoria = async (categoria: Omit<Categoria, 'id' | 'created_at' | 'updated_at'>) => {
    if (!isAdmin) {
      throw new Error('Apenas administradores podem adicionar categorias');
    }

    try {
      const { data, error } = await supabase
        .from('categorias')
        .insert([categoria])
        .select()
        .single();

      if (error) {
        console.error('Erro ao adicionar categoria:', error);
        throw error;
      }

      setCategorias(prev => [...prev, data]);
      return data;
    } catch (error) {
      console.error('Erro ao adicionar categoria:', error);
      throw error;
    }
  };

  const updateCategoria = async (id: string, updates: Partial<Categoria>) => {
    if (!isAdmin) {
      throw new Error('Apenas administradores podem editar categorias');
    }

    try {
      const { data, error } = await supabase
        .from('categorias')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Erro ao atualizar categoria:', error);
        throw error;
      }

      setCategorias(prev => 
        prev.map(c => c.id === id ? data : c)
      );
      return data;
    } catch (error) {
      console.error('Erro ao atualizar categoria:', error);
      throw error;
    }
  };

  const deleteCategoria = async (id: string) => {
    if (!isAdmin) {
      throw new Error('Apenas administradores podem excluir categorias');
    }

    try {
      const { error } = await supabase
        .from('categorias')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erro ao deletar categoria:', error);
        throw error;
      }

      setCategorias(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error('Erro ao deletar categoria:', error);
      throw error;
    }
  };

  const getCategoriasByTipo = (tipo: 'receita' | 'despesa') => {
    return categorias.filter(c => c.tipo === tipo);
  };

  return {
    categorias,
    loading,
    addCategoria,
    updateCategoria,
    deleteCategoria,
    getCategoriasByTipo,
    refreshCategorias: fetchCategorias,
  };
}
