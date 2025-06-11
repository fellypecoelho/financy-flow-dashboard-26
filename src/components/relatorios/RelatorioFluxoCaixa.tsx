import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Despesa, Aporte } from '@/types';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface RelatorioFluxoCaixaProps {
  periodo: Date;
  despesas: Despesa[];
  aportes: Aporte[];
}

const RelatorioFluxoCaixa = ({ periodo, despesas, aportes }: RelatorioFluxoCaixaProps) => {
  const inicioMes = startOfMonth(periodo);
  const fimMes = endOfMonth(periodo);

  // Evolução do fluxo de caixa diário
  const diasDoMes = eachDayOfInterval({ start: inicioMes, end: fimMes });
  let saldoAcumulado = 0;

  const fluxoDiario = diasDoMes.map(dia => {
    const despesasDia = despesas
      .filter(d => isSameDay(new Date(d.dataVencimento), dia) && d.status === 'pago')
      .reduce((acc, d) => acc + d.valor, 0);
    
    const aportesDia = aportes
      .filter(a => isSameDay(new Date(a.data), dia))
      .reduce((acc, a) => acc + a.valor, 0);

    const movimentoDia = aportesDia - despesasDia;
    saldoAcumulado += movimentoDia;

    return {
      dia: format(dia, 'd/M'),
      data: dia,
      entradas: aportesDia,
      saidas: despesasDia,
      saldo: movimentoDia,
      saldoAcumulado: saldoAcumulado
    };
  });

  // Comparação com meses anteriores
  const mesesComparacao = [];
  for (let i = 0; i < 6; i++) {
    const mesAtual = subMonths(periodo, i);
    const inicioMesComp = startOfMonth(mesAtual);
    const fimMesComp = endOfMonth(mesAtual);

    const totalAportes = aportes
      .filter(a => {
        const data = new Date(a.data);
        return data >= inicioMesComp && data <= fimMesComp;
      })
      .reduce((acc, a) => acc + a.valor, 0);

    const totalDespesas = despesas
      .filter(d => {
        const data = new Date(d.dataVencimento);
        return data >= inicioMesComp && data <= fimMesComp;
      })
      .reduce((acc, d) => acc + d.valor, 0);

    mesesComparacao.unshift({
      mes: format(mesAtual, 'MMM/yy', { locale: ptBR }),
      entradas: totalAportes,
      saidas: totalDespesas,
      saldo: totalAportes - totalDespesas
    });
  }

  // Resumo do fluxo atual
  const totalEntradas = fluxoDiario.reduce((acc, dia) => acc + dia.entradas, 0);
  const totalSaidas = fluxoDiario.reduce((acc, dia) => acc + dia.saidas, 0);
  const saldoFinal = totalEntradas - totalSaidas;

  const chartConfig = {
    entradas: {
      label: "Entradas",
      color: "hsl(var(--chart-1))",
    },
    saidas: {
      label: "Saídas",
      color: "hsl(var(--chart-2))",
    },
    saldoAcumulado: {
      label: "Saldo Acumulado",
      color: "hsl(var(--chart-3))",
    },
  };

  return (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entradas</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {totalEntradas.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Saídas</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              R$ {totalSaidas.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Final</CardTitle>
            <DollarSign className={`h-4 w-4 ${saldoFinal >= 0 ? 'text-green-600' : 'text-red-600'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${saldoFinal >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              R$ {saldoFinal.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Área - Fluxo Diário */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Fluxo Diário</CardTitle>
            <CardDescription>
              Entradas, saídas e saldo acumulado por dia
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="w-full h-[300px]">
              <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={fluxoDiario} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dia" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area 
                      type="monotone" 
                      dataKey="entradas" 
                      stackId="1"
                      stroke="var(--color-entradas)" 
                      fill="var(--color-entradas)"
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="saidas" 
                      stackId="2"
                      stroke="var(--color-saidas)" 
                      fill="var(--color-saidas)"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de Linha - Saldo Acumulado */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Saldo Acumulado</CardTitle>
            <CardDescription>
              Evolução do saldo ao longo do mês
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="w-full h-[300px]">
              <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={fluxoDiario} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dia" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="saldoAcumulado" 
                      stroke="var(--color-saldoAcumulado)" 
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comparação Mensal */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Comparação Últimos 6 Meses</CardTitle>
          <CardDescription>
            Histórico de fluxo de caixa mensal
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mês</TableHead>
                <TableHead className="text-right">Entradas</TableHead>
                <TableHead className="text-right">Saídas</TableHead>
                <TableHead className="text-right">Saldo</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mesesComparacao.map((mes, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{mes.mes}</TableCell>
                  <TableCell className="text-right text-green-600">
                    R$ {mes.entradas.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell className="text-right text-red-600">
                    R$ {mes.saidas.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell className={`text-right font-medium ${mes.saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    R$ {mes.saldo.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={mes.saldo >= 0 ? 'default' : 'destructive'}>
                      {mes.saldo >= 0 ? 'Positivo' : 'Negativo'}
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

export default RelatorioFluxoCaixa;
