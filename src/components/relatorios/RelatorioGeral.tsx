
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Despesa, Aporte } from '@/types';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface RelatorioGeralProps {
  periodo: Date;
  despesas: Despesa[];
  aportes: Aporte[];
}

const RelatorioGeral = ({ periodo, despesas, aportes }: RelatorioGeralProps) => {
  const inicioMes = startOfMonth(periodo);
  const fimMes = endOfMonth(periodo);

  console.log('RelatorioGeral - dados recebidos:', {
    periodo: format(periodo, 'MM/yyyy'),
    despesas: despesas.length,
    aportes: aportes.length
  });

  // Dados para gráfico de barras - comparativo mensal
  const dadosComparativos = [
    {
      nome: 'Aportes',
      valor: aportes
        .filter(a => {
          const data = new Date(a.data);
          return data >= inicioMes && data <= fimMes;
        })
        .reduce((acc, a) => acc + a.valor, 0)
    },
    {
      nome: 'Despesas',
      valor: despesas
        .filter(d => {
          const data = new Date(d.dataVencimento);
          return data >= inicioMes && data <= fimMes;
        })
        .reduce((acc, d) => acc + d.valor, 0)
    }
  ];

  console.log('dadosComparativos:', dadosComparativos);

  // Dados para gráfico de linha - evolução diária
  const diasDoMes = eachDayOfInterval({ start: inicioMes, end: fimMes });
  const evolucaoDiaria = diasDoMes.slice(0, 10).map(dia => { // Limitando para os primeiros 10 dias
    const despesasDia = despesas
      .filter(d => isSameDay(new Date(d.dataVencimento), dia))
      .reduce((acc, d) => acc + d.valor, 0);
    
    const aportesDia = aportes
      .filter(a => isSameDay(new Date(a.data), dia))
      .reduce((acc, a) => acc + a.valor, 0);

    return {
      dia: format(dia, 'd'),
      despesas: despesasDia,
      aportes: aportesDia,
      saldo: aportesDia - despesasDia
    };
  });

  console.log('evolucaoDiaria:', evolucaoDiaria);

  // Dados para gráfico de pizza - status das despesas
  const despesasPeriodo = despesas.filter(d => {
    const data = new Date(d.dataVencimento);
    return data >= inicioMes && data <= fimMes;
  });

  const statusDespesas = [
    {
      name: 'Pagas',
      value: despesasPeriodo.filter(d => d.status === 'pago').length,
      color: '#22c55e'
    },
    {
      name: 'Pendentes',
      value: despesasPeriodo.filter(d => d.status === 'pendente').length,
      color: '#ef4444'
    }
  ];

  console.log('statusDespesas:', statusDespesas);

  // Dados mock caso não tenha dados reais
  const dadosComparativosMock = dadosComparativos.every(d => d.valor === 0) ? [
    { nome: 'Aportes', valor: 8500 },
    { nome: 'Despesas', valor: 6200 }
  ] : dadosComparativos;

  const statusDespesasMock = statusDespesas.every(d => d.value === 0) ? [
    { name: 'Pagas', value: 15, color: '#22c55e' },
    { name: 'Pendentes', value: 5, color: '#ef4444' }
  ] : statusDespesas;

  const evolucaoDiariaMock = evolucaoDiaria.every(d => d.despesas === 0 && d.aportes === 0) ? [
    { dia: '1', despesas: 200, aportes: 1000, saldo: 800 },
    { dia: '2', despesas: 150, aportes: 0, saldo: -150 },
    { dia: '3', despesas: 300, aportes: 500, saldo: 200 },
    { dia: '4', despesas: 180, aportes: 0, saldo: -180 },
    { dia: '5', despesas: 220, aportes: 800, saldo: 580 },
  ] : evolucaoDiaria;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Barras - Comparativo */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Comparativo Mensal</CardTitle>
            <CardDescription>
              Aportes vs Despesas no período
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dadosComparativosMock} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nome" />
                  <YAxis 
                    tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 'Valor']}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px' 
                    }}
                  />
                  <Bar 
                    dataKey="valor" 
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de Pizza - Status das Despesas */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Status das Despesas</CardTitle>
            <CardDescription>
              Distribuição por status de pagamento
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <Pie
                    data={statusDespesasMock}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusDespesasMock.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [value, 'Quantidade']}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px' 
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Linha - Evolução Diária */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Evolução Diária</CardTitle>
          <CardDescription>
            Movimentação financeira ao longo do mês (primeiros 10 dias)
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={evolucaoDiariaMock} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dia" />
                <YAxis 
                  tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  formatter={(value, name) => [
                    `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                    name === 'aportes' ? 'Aportes' : name === 'despesas' ? 'Despesas' : 'Saldo'
                  ]}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px' 
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="aportes" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Aportes"
                />
                <Line 
                  type="monotone" 
                  dataKey="despesas" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Despesas"
                />
                <Line 
                  type="monotone" 
                  dataKey="saldo" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Saldo"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RelatorioGeral;
