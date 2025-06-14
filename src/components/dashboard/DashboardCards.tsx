
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, Users } from 'lucide-react';
import { DashboardData, Investidor } from '@/types';
import ResponsiveValue from '@/components/ui/ResponsiveValue';

interface DashboardCardsProps {
  dashboardData: DashboardData;
  investidores: Investidor[];
}

const DashboardCards = ({ dashboardData, investidores }: DashboardCardsProps) => {
  const cards = [
    {
      title: 'Receitas Totais',
      value: dashboardData.totalReceitas,
      icon: TrendingUp,
      variant: 'success' as const,
      trend: '+8.2%',
      trendColor: 'text-green-600'
    },
    {
      title: 'Despesas Totais',
      value: dashboardData.totalDespesas,
      icon: TrendingDown,
      variant: 'danger' as const,
      trend: '+3.1%',
      trendColor: 'text-red-600'
    },
    {
      title: 'Saldo Total',
      value: dashboardData.saldoTotal,
      icon: DollarSign,
      variant: dashboardData.saldoTotal >= 0 ? 'success' : 'danger' as const,
      trend: dashboardData.saldoTotal >= 0 ? '+12.5%' : '-5.2%',
      trendColor: dashboardData.saldoTotal >= 0 ? 'text-green-600' : 'text-red-600'
    },
    {
      title: 'Investidores Ativos',
      value: investidores.filter(i => i.ativo).length,
      icon: Users,
      variant: 'default' as const,
      currency: false,
      trend: 'Sem mudanças',
      trendColor: 'text-gray-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <Card key={index} className="hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <ResponsiveValue 
                value={card.value} 
                variant={card.variant}
                size="xl"
                currency={card.currency !== false}
              />
              <p className={`text-xs ${card.trendColor} flex items-center`}>
                {card.trend}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardCards;
