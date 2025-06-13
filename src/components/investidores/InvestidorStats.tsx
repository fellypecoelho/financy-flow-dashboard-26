
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Investidor, Aporte } from '@/types';

interface InvestidorStatsProps {
  investidores: Investidor[];
  aportes: Aporte[];
}

const InvestidorStats = ({ investidores, aportes }: InvestidorStatsProps) => {
  // Dados para gráfico de barras (aportes por investidor)
  const aportesData = investidores.map(investidor => {
    const totalAportes = aportes
      .filter(aporte => aporte.investidorId === investidor.id)
      .reduce((acc, aporte) => acc + aporte.valor, 0);
    
    return {
      nome: investidor.nome.split(' ')[0], // Apenas o primeiro nome
      aportes: totalAportes,
      saldo: investidor.saldoAtual,
      rendimento: investidor.saldoAtual - totalAportes
    };
  });

  // Dados para gráfico de pizza (distribuição de saldos)
  const saldosData = investidores.map(investidor => ({
    name: investidor.nome.split(' ')[0],
    value: investidor.saldoAtual,
    color: `hsl(${Math.random() * 360}, 70%, 50%)`
  }));

  const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Gráfico de Barras - Aportes vs Saldo */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Aportes vs Saldo Atual</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={aportesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nome" />
            <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
            <Tooltip 
              formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, '']}
            />
            <Bar dataKey="aportes" fill="#3b82f6" name="Total Aportes" />
            <Bar dataKey="saldo" fill="#10b981" name="Saldo Atual" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de Pizza - Distribuição de Saldos */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuição de Saldos</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={saldosData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {saldosData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Tabela de Performance */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 lg:col-span-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance dos Investidores</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2">Investidor</th>
                <th className="text-right py-2">Total Investido</th>
                <th className="text-right py-2">Saldo Atual</th>
                <th className="text-right py-2">Rendimento</th>
                <th className="text-right py-2">Performance</th>
              </tr>
            </thead>
            <tbody>
              {aportesData.map((item, index) => {
                const investidor = investidores.find(inv => inv.nome.startsWith(item.nome));
                const percentual = item.aportes > 0 ? (item.rendimento / item.aportes) * 100 : 0;
                
                return (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 font-medium">{investidor?.nome}</td>
                    <td className="text-right py-3">
                      {item.aportes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                    <td className="text-right py-3">
                      {item.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                    <td className={`text-right py-3 font-semibold ${item.rendimento >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.rendimento >= 0 ? '+' : ''}{item.rendimento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                    <td className={`text-right py-3 font-semibold ${percentual >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {percentual >= 0 ? '+' : ''}{percentual.toFixed(1)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvestidorStats;
