
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {/* Card Despesas do Mês */}
      <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="min-w-0 flex-1 pr-2">
            <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Despesas do Mês</p>
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600 leading-tight break-words">
              R$ {dashboardData.despesasMes.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="p-2 bg-red-100 rounded-full flex-shrink-0">
            <TrendingDown className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-gray-500">Pagas:</span>
            <span className="text-green-600 font-medium">R$ {dashboardData.despesasMes.pagas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-gray-500">Pendentes:</span>
            <span className="text-red-600 font-medium">R$ {dashboardData.despesasMes.pendentes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>

      {/* Card Aportes do Mês */}
      <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="min-w-0 flex-1 pr-2">
            <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Aportes do Mês</p>
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 leading-tight break-words">
              R$ {dashboardData.aportesMes.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="p-2 bg-green-100 rounded-full flex-shrink-0">
            <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-gray-500">Saldo Disponível:</span>
            <span className="text-blue-600 font-medium">
              R$ {dashboardData.aportesMes.saldoDisponivel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* Card Total em Caixa */}
      <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="min-w-0 flex-1 pr-2">
            <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Total em Caixa</p>
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 leading-tight break-words">
              R$ {investidores.reduce((acc, inv) => acc + inv.saldoAtual, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="p-2 bg-blue-100 rounded-full flex-shrink-0">
            <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          </div>
        </div>
        <div>
          <span className="text-xs sm:text-sm text-gray-500">Soma de todos os saldos</span>
        </div>
      </div>

      {/* Card Próximos Vencimentos */}
      <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="min-w-0 flex-1 pr-2">
            <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Próximos Vencimentos</p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-600">
              {dashboardData.proximosVencimentos.length}
            </p>
          </div>
          <div className="p-2 bg-orange-100 rounded-full flex-shrink-0">
            <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm text-gray-500">Próximos 7 dias</span>
          {dashboardData.proximosVencimentos.length > 0 && (
            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-xs">
              Atenção
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
