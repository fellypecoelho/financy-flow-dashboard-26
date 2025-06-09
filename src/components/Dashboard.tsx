
import React from 'react';
import { useFinancialData } from '@/hooks/useFinancialData';
import DashboardCards from './dashboard/DashboardCards';
import InvestorBalances from './dashboard/InvestorBalances';
import UpcomingPayments from './dashboard/UpcomingPayments';
import CategoryChart from './CategoryChart';
import FinancialChart from './FinancialChart';

const Dashboard = () => {
  const { investidores, categorias, dashboardData, despesas } = useFinancialData();

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Carregando dados...</div>
      </div>
    );
  }

  const proximosVencimentos = despesas.filter(d => d.status === 'pendente').slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Visão geral do controle financeiro</p>
        </div>
        <div className="flex items-center space-x-4">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>Dezembro 2024</option>
            <option>Janeiro 2025</option>
          </select>
        </div>
      </div>

      {/* Cards principais */}
      <DashboardCards dashboardData={dashboardData} investidores={investidores} />

      {/* Segunda linha - Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryChart />
        <FinancialChart />
      </div>

      {/* Terceira linha - Saldos e Vencimentos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InvestorBalances investidores={investidores} />
        <UpcomingPayments despesas={proximosVencimentos} categorias={categorias} />
      </div>
    </div>
  );
};

export default Dashboard;
