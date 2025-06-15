
import React from 'react';
import { CartaoFiltersProps } from '@/types/cartao';

const CartaoFilters = ({ filters, onFiltersChange, investidores }: CartaoFiltersProps) => {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const bandeiras = ['Visa', 'Mastercard', 'Elo', 'American Express'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Bandeira</label>
        <select
          value={filters.bandeira}
          onChange={(e) => handleFilterChange('bandeira', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="">Todas</option>
          {bandeiras.map(bandeira => (
            <option key={bandeira} value={bandeira}>{bandeira}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CartaoFilters;
