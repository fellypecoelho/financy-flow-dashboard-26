import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Despesa, Aporte, Investidor } from '@/types';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface RelatorioInvestidoresProps {
  periodo: Date;
  despesas: Despesa[];
  aportes: Aporte[];
  investidores: Investidor[];
}

const RelatorioInvestidores = ({ periodo, despesas, aportes, investidores }: RelatorioInvestidoresProps) => {
  const inicioMes = startOfMonth(periodo);
  const fimMes = endOfMonth(periodo);

  // Calcular dados por investidor
  const dadosInvestidores = investidores.map(investidor => {
    const aportesInvestidor = aportes
      .filter(a => {
        const data = new Date(a.data);
        return a.investidorId === investidor.id && data >= inicioMes && data <= fimMes;
      })
      .reduce((acc, a) => acc + a.valor, 0);

    const despesasInvestidor = despesas
      .filter(d => {
        const data = new Date(d.dataVencimento);
        return data >= inicioMes && data <= fimMes;
      })
      .reduce((acc, d) => {
        const divisaoInvestidor = d.divisaoInvestidores.find(di => di.investidorId === investidor.id);
        return acc + (divisaoInvestidor?.valor || 0);
      }, 0);

    return {
      id: investidor.id,
      nome: investidor.nome,
      aportes: aportesInvestidor,
      despesas: despesasInvestidor,
      saldo: aportesInvestidor - despesasInvestidor,
      saldoAtual: investidor.saldoAtual
    };
  });

  // Dados para gráfico de barras - aportes por investidor
  const dadosAportes = dadosInvestidores.map(d => ({
    nome: d.nome.split(' ')[0], // Apenas primeiro nome
    aportes: d.aportes,
    despesas: d.despesas
  }));

  // Dados para gráfico de pizza - distribuição de saldos
  const distribuicaoSaldos = dadosInvestidores.map(d => ({
    name: d.nome.split(' ')[0],
    value: d.saldoAtual,
    color: `hsl(${Math.random() * 360}, 70%, 50%)`
  }));

  const chartConfig = {
    aportes: {
      label: "Aportes",
      color: "hsl(var(--chart-1))",
    },
    despesas: {
      label: "Despesas",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Barras - Aportes vs Despesas por Investidor */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Aportes vs Despesas</CardTitle>
            <CardDescription>
              Comparativo por investidor no período
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="w-full h-[300px]">
              <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dadosAportes} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nome" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="aportes" fill="var(--color-aportes)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="despesas" fill="var(--color-despesas)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de Pizza - Distribuição de Saldos */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Distribuição de Saldos</CardTitle>
            <CardDescription>
              Saldo atual de cada investidor
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="w-full h-[300px]">
              <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <Pie
                      data={distribuicaoSaldos}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {distribuicaoSaldos.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela Detalhada */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Detalhamento por Investidor</CardTitle>
          <CardDescription>
            Análise detalhada da movimentação de cada investidor
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Investidor</TableHead>
                <TableHead className="text-right">Aportes</TableHead>
                <TableHead className="text-right">Despesas</TableHead>
                <TableHead className="text-right">Saldo Período</TableHead>
                <TableHead className="text-right">Saldo Atual</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dadosInvestidores.map((investidor) => (
                <TableRow key={investidor.id}>
                  <TableCell className="font-medium">{investidor.nome}</TableCell>
                  <TableCell className="text-right text-green-600">
                    R$ {investidor.aportes.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell className="text-right text-red-600">
                    R$ {investidor.despesas.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell className={`text-right font-medium ${investidor.saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    R$ {investidor.saldo.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    R$ {investidor.saldoAtual.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={investidor.saldoAtual >= 0 ? 'default' : 'destructive'}>
                      {investidor.saldoAtual >= 0 ? 'Positivo' : 'Negativo'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RelatorioInvestidores;
