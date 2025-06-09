
import React from 'react';
import { Categoria, TipoDespesa, StatusDespesa } from '@/types';

interface ExpenseFiltersProps {
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

const ExpenseFilters = ({ filters, onFiltersChange, categorias }: ExpenseFiltersProps) => {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
        <select
          value={filters.categoria}
          onChange={(e) => handleFilterChange('categoria', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Todas</option>
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Todos</option>
          <option value="pendente">Pendente</option>
          <option value="pago">Pago</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
        <select
          value={filters.tipo}
          onChange={(e) => handleFilterChange('tipo', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Todos</option>
          <option value="unica">Única</option>
          <option value="recorrente">Recorrente</option>
          <option value="parcelada">Parcelada</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Data Início</label>
        <input
          type="date"
          value={filters.dataInicio}
          onChange={(e) => handleFilterChange('dataInicio', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Data Fim</label>
        <input
          type="date"
          value={filters.dataFim}
          onChange={(e) => handleFilterChange('dataFim', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default ExpenseFilters;
