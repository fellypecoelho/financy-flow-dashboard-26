
import React from 'react';
import { useFinancialData } from '@/hooks/useFinancialData';
import DashboardCards from './dashboard/DashboardCards';
import InvestorBalances from './dashboard/InvestorBalances';
import UpcomingPayments from './dashboard/UpcomingPayments';
import CategoryChart from './CategoryChart';
import FinancialChart from './FinancialChart';
import StatsSkeleton from '@/components/ui/StatsSkeleton';

const Dashboard = () => {
  const { investidores, categorias, dashboardData, despesas, isLoading } = useFinancialData();

  const proximosVencimentos = despesas.filter(d => d.status === 'pendente').slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">Visão geral do controle financeiro</p>
        </div>
        <div className="flex items-center space-x-4">
          <select className="px-3 py-2 border border-input rounded-lg text-sm bg-background text-foreground">
            <option>Dezembro 2024</option>
            <option>Janeiro 2025</option>
          </select>
        </div>
      </div>

      {/* Cards principais com skeleton */}
      {isLoading ? (
        <StatsSkeleton />
      ) : (
        dashboardData && <DashboardCards dashboardData={dashboardData} investidores={investidores} />
      )}

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
