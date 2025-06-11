
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
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

  // Dados para gráfico de linha - evolução diária
  const diasDoMes = eachDayOfInterval({ start: inicioMes, end: fimMes });
  const evolucaoDiaria = diasDoMes.map(dia => {
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

  const chartConfig = {
    aportes: {
      label: "Aportes",
      color: "hsl(var(--chart-1))",
    },
    despesas: {
      label: "Despesas",
      color: "hsl(var(--chart-2))",
    },
    saldo: {
      label: "Saldo",
      color: "hsl(var(--chart-3))",
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Barras - Comparativo */}
        <Card>
          <CardHeader>
            <CardTitle>Comparativo Mensal</CardTitle>
            <CardDescription>
              Aportes vs Despesas no período
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dadosComparativos}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nome" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="valor" 
                    fill="var(--color-aportes)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Pizza - Status das Despesas */}
        <Card>
          <CardHeader>
            <CardTitle>Status das Despesas</CardTitle>
            <CardDescription>
              Distribuição por status de pagamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDespesas}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusDespesas.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Linha - Evolução Diária */}
      <Card>
        <CardHeader>
          <CardTitle>Evolução Diária</CardTitle>
          <CardDescription>
            Movimentação financeira ao longo do mês
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={evolucaoDiaria}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dia" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="aportes" 
                  stroke="var(--color-aportes)" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="despesas" 
                  stroke="var(--color-despesas)" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="saldo" 
                  stroke="var(--color-saldo)" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default RelatorioGeral;
