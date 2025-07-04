
import React from 'react';
import { Categoria, TipoDespesa, StatusDespesa } from '@/types';
import CategoryIcon from '@/components/ui/CategoryIcon';

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

  const selectedCategoria = categorias.find(cat => cat.id === filters.categoria);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Categoria</label>
        <select
          value={filters.categoria}
          onChange={(e) => handleFilterChange('categoria', e.target.value)}
          className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
        >
          <option value="">Todas</option>
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
        {selectedCategoria && (
          <div className="mt-2 flex items-center space-x-2">
            <div 
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: selectedCategoria.cor }}
            >
              <CategoryIcon 
                iconName={selectedCategoria.icone} 
                size={14} 
                className="text-white" 
              />
            </div>
            <span className="text-sm text-muted-foreground">{selectedCategoria.nome}</span>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Status</label>
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
        >
          <option value="">Todos</option>
          <option value="pendente">Pendente</option>
          <option value="pago">Pago</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Tipo</label>
        <select
          value={filters.tipo}
          onChange={(e) => handleFilterChange('tipo', e.target.value)}
          className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
        >
          <option value="">Todos</option>
          <option value="unica">Única</option>
          <option value="recorrente">Recorrente</option>
          <option value="parcelada">Parcelada</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Data Início</label>
        <input
          type="date"
          value={filters.dataInicio}
          onChange={(e) => handleFilterChange('dataInicio', e.target.value)}
          className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Data Fim</label>
        <input
          type="date"
          value={filters.dataFim}
          onChange={(e) => handleFilterChange('dataFim', e.target.value)}
          className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
        />
      </div>
    </div>
  );
};

export default ExpenseFilters;
