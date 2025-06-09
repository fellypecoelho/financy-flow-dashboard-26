
import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';
import FinancialChart from './FinancialChart';
import CategoryChart from './CategoryChart';
import RecentTransactions from './RecentTransactions';

const Dashboard = () => {
  // Dados de exemplo
  const financialSummary = {
    totalBalance: 15420.50,
    monthlyIncome: 8500.00,
    monthlyExpenses: 6200.00,
    previousBalance: 13120.50
  };

  const balanceChange = financialSummary.totalBalance - financialSummary.previousBalance;
  const balanceChangePercentage = ((balanceChange / financialSummary.previousBalance) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Resumo da sua situação financeira</p>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar size={16} className="mr-2" />
          Dezembro 2024
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Saldo Total */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Saldo Total</p>
              <p className="text-2xl font-bold text-gray-900">
                R$ {financialSummary.totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+{balanceChangePercentage}%</span>
            <span className="text-sm text-gray-500 ml-2">vs mês anterior</span>
          </div>
        </div>

        {/* Receitas do Mês */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Receitas do Mês</p>
              <p className="text-2xl font-bold text-green-600">
                R$ {financialSummary.monthlyIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Meta: R$ 8.000,00</span>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '106%' }}></div>
            </div>
          </div>
        </div>

        {/* Despesas do Mês */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Despesas do Mês</p>
              <p className="text-2xl font-bold text-red-600">
                R$ {financialSummary.monthlyExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Limite: R$ 7.000,00</span>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: '88%' }}></div>
            </div>
          </div>
        </div>

        {/* Economia do Mês */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Economia do Mês</p>
              <p className="text-2xl font-bold text-blue-600">
                R$ {(financialSummary.monthlyIncome - financialSummary.monthlyExpenses).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Meta: R$ 2.000,00</span>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '115%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FinancialChart />
        <CategoryChart />
      </div>

      {/* Recent Transactions */}
      <RecentTransactions />
    </div>
  );
};

export default Dashboard;
