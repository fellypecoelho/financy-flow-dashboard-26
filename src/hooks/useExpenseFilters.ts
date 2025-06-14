
import { useState } from 'react';
import { Despesa, StatusDespesa, TipoDespesa } from '@/types';

interface ExpenseFilters {
  categoria: string;
  status: StatusDespesa | '';
  tipo: TipoDespesa | '';
  dataInicio: string;
  dataFim: string;
}

export const useExpenseFilters = (despesas: Despesa[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<ExpenseFilters>({
    categoria: '',
    status: '' as StatusDespesa | '',
    tipo: '' as TipoDespesa | '',
    dataInicio: '',
    dataFim: ''
  });

  const filteredExpenses = despesas.filter(expense => {
    const matchesSearch = expense.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.origem.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoria = !filters.categoria || expense.categoriaId === filters.categoria;
    const matchesStatus = !filters.status || expense.status === filters.status;
    const matchesTipo = !filters.tipo || expense.tipo === filters.tipo;
    const matchesDataInicio = !filters.dataInicio || expense.dataVencimento >= filters.dataInicio;
    const matchesDataFim = !filters.dataFim || expense.dataVencimento <= filters.dataFim;

    return matchesSearch && matchesCategoria && matchesStatus && matchesTipo && 
           matchesDataInicio && matchesDataFim;
  });

  return {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    filteredExpenses
  };
};
