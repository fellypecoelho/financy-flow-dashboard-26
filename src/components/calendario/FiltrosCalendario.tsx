
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFinancialData } from '@/hooks/useFinancialData';

interface FiltrosCalendarioProps {
  filtros: {
    tipo: 'todos' | 'despesas' | 'aportes';
    status: 'todos' | 'pendente' | 'pago' | 'confirmado';
    investidor: string;
  };
  onFiltrosChange: (filtros: any) => void;
}

const FiltrosCalendario = ({ filtros, onFiltrosChange }: FiltrosCalendarioProps) => {
  const { investidores } = useFinancialData();

  const handleFiltroChange = (key: string, value: string) => {
    onFiltrosChange({
      ...filtros,
      [key]: value
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Tipo de Evento</label>
        <Select value={filtros.tipo} onValueChange={(value) => handleFiltroChange('tipo', value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os tipos</SelectItem>
            <SelectItem value="despesas">Despesas</SelectItem>
            <SelectItem value="aportes">Aportes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Status</label>
        <Select value={filtros.status} onValueChange={(value) => handleFiltroChange('status', value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os status</SelectItem>
            <SelectItem value="pendente">Pendente</SelectItem>
            <SelectItem value="pago">Pago</SelectItem>
            <SelectItem value="confirmado">Confirmado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Investidor</label>
        <Select value={filtros.investidor} onValueChange={(value) => handleFiltroChange('investidor', value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os investidores</SelectItem>
            {investidores.map((investidor) => (
              <SelectItem key={investidor.id} value={investidor.nome}>
                {investidor.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FiltrosCalendario;
