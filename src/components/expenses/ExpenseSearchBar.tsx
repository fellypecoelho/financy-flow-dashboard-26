
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Categoria, StatusDespesa, TipoDespesa } from '@/types';
import ExpenseFilters from './ExpenseFilters';

interface ExpenseSearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filters: {
    categoria: string;
    status: StatusDespesa | '';
    tipo: TipoDespesa | '';
    dataInicio: string;
    dataFim: string;
  };
  onFiltersChange: (filters: any) => void;
  categorias: Categoria[];
}

const ExpenseSearchBar = ({ 
  searchTerm, 
  onSearchChange, 
  filters, 
  onFiltersChange, 
  categorias 
}: ExpenseSearchBarProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar por descrição ou origem..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="h-5 w-5 mr-2" />
          Filtros
        </button>
      </div>
      
      <ExpenseFilters 
        filters={filters}
        onFiltersChange={onFiltersChange}
        categorias={categorias}
      />
    </div>
  );
};

export default ExpenseSearchBar;
