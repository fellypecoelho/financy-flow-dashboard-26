
import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Clock } from 'lucide-react';
import { DashboardData, Investidor } from '@/types';
import { Badge } from '@/components/ui/badge';

interface DashboardCardsProps {
  dashboardData: DashboardData;
  investidores: Investidor[];
}

const DashboardCards = ({ dashboardData, investidores }: DashboardCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Card Despesas do Mês */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Despesas do Mês</p>
            <p className="text-2xl font-bold text-red-600">
              R$ {dashboardData.despesasMes.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="p-3 bg-red-100 rounded-full">
            <TrendingDown className="h-6 w-6 text-red-600" />
          </div>
        </div>
        <div className="mt-4 space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Pagas:</span>
            <span className="text-green-600">R$ {dashboardData.despesasMes.pagas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Pendentes:</span>
            <span className="text-red-600">R$ {dashboardData.despesasMes.pendentes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>

      {/* Card Aportes do Mês */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Aportes do Mês</p>
            <p className="text-2xl font-bold text-green-600">
              R$ {dashboardData.aportesMes.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Saldo Disponível:</span>
            <span className="text-blue-600 font-medium">
              R$ {dashboardData.aportesMes.saldoDisponivel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* Card Total em Caixa */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total em Caixa</p>
            <p className="text-2xl font-bold text-blue-600">
              R$ {investidores.reduce((acc, inv) => acc + inv.saldoAtual, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <DollarSign className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-4">
          <span className="text-sm text-gray-500">Soma de todos os saldos</span>
        </div>
      </div>

      {/* Card Próximos Vencimentos */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Próximos Vencimentos</p>
            <p className="text-2xl font-bold text-orange-600">
              {dashboardData.proximosVencimentos.length}
            </p>
          </div>
          <div className="p-3 bg-orange-100 rounded-full">
            <Clock className="h-6 w-6 text-orange-600" />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">Próximos 7 dias</span>
          {dashboardData.proximosVencimentos.length > 0 && (
            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
              Atenção
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
