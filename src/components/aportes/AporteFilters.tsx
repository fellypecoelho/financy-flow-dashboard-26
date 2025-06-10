
import React from 'react';
import { Investidor } from '@/types';

interface AporteFiltersProps {
  filters: {
    investidor: string;
    dataInicio: string;
    dataFim: string;
  };
  onFiltersChange: (filters: any) => void;
  investidores: Investidor[];
}

const AporteFilters = ({ filters, onFiltersChange, investidores }: AporteFiltersProps) => {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Investidor</label>
        <select
          value={filters.investidor}
          onChange={(e) => handleFilterChange('investidor', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="">Todos</option>
          {investidores.map(investidor => (
            <option key={investidor.id} value={investidor.id}>{investidor.nome}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Data Início</label>
        <input
          type="date"
          value={filters.dataInicio}
          onChange={(e) => handleFilterChange('dataInicio', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Data Fim</label>
        <input
          type="date"
          value={filters.dataFim}
          onChange={(e) => handleFilterChange('dataFim', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default AporteFilters;
