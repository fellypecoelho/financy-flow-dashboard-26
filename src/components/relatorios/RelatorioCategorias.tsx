
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Despesa } from '@/types';
import { useFinancialData } from '@/hooks/useFinancialData';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface RelatorioCategoriasProps {
  periodo: Date;
  despesas: Despesa[];
}

const RelatorioCategorias = ({ periodo, despesas }: RelatorioCategoriasProps) => {
  const { categorias } = useFinancialData();
  const inicioMes = startOfMonth(periodo);
  const fimMes = endOfMonth(periodo);

  // Filtrar despesas do período
  const despesasPeriodo = despesas.filter(d => {
    const data = new Date(d.dataVencimento);
    return data >= inicioMes && data <= fimMes;
  });

  // Calcular gastos por categoria
  const gastosPorCategoria = categorias.map(categoria => {
    const despesasCategoria = despesasPeriodo.filter(d => d.categoriaId === categoria.id);
    const totalGasto = despesasCategoria.reduce((acc, d) => acc + d.valor, 0);
    const quantidadeDespesas = despesasCategoria.length;

    return {
      id: categoria.id,
      nome: categoria.nome,
      cor: categoria.cor,
      total: totalGasto,
      quantidade: quantidadeDespesas,
      despesas: despesasCategoria
    };
  }).filter(categoria => categoria.total > 0);

  const totalGeral = gastosPorCategoria.reduce((acc, cat) => acc + cat.total, 0);

  // Dados para gráfico de pizza
  const dadosPizza = gastosPorCategoria.map((categoria, index) => ({
    name: categoria.nome,
    value: categoria.total,
    color: categoria.cor,
    percentage: ((categoria.total / totalGeral) * 100).toFixed(1)
  }));

  // Dados para gráfico de barras
  const dadosBarras = gastosPorCategoria
    .sort((a, b) => b.total - a.total)
    .slice(0, 10)
    .map(categoria => ({
      nome: categoria.nome,
      valor: categoria.total,
      quantidade: categoria.quantidade
    }));

  const chartConfig = {
    valor: {
      label: "Valor",
      color: "hsl(var(--chart-1))",
    },
    quantidade: {
      label: "Quantidade",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Pizza - Distribuição por Categoria */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Categoria</CardTitle>
            <CardDescription>
              Percentual de gastos por categoria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dadosPizza}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dadosPizza.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Barras - Top Categorias */}
        <Card>
          <CardHeader>
            <CardTitle>Categorias com Maior Gasto</CardTitle>
            <CardDescription>
              Top 10 categorias por valor total
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dadosBarras} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="nome" type="category" width={80} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="valor" fill="var(--color-valor)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabela Detalhada */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhamento por Categoria</CardTitle>
          <CardDescription>
            Análise completa de gastos por categoria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-center">Quantidade</TableHead>
                <TableHead className="text-right">Valor Total</TableHead>
                <TableHead className="text-center">% do Total</TableHead>
                <TableHead className="text-right">Valor Médio</TableHead>
                <TableHead className="text-center">Participação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gastosPorCategoria
                .sort((a, b) => b.total - a.total)
                .map((categoria) => {
                  const percentual = ((categoria.total / totalGeral) * 100);
                  const valorMedio = categoria.quantidade > 0 ? categoria.total / categoria.quantidade : 0;
                  
                  return (
                    <TableRow key={categoria.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: categoria.cor }}
                          />
                          {categoria.nome}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">
                          {categoria.quantidade}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        R$ {categoria.total.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell className="text-center">
                        {percentual.toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-right">
                        R$ {valorMedio.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="w-full">
                          <Progress value={percentual} className="h-2" />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Resumo Estatístico */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Categorias Ativas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gastosPorCategoria.length}</div>
            <p className="text-xs text-muted-foreground">
              de {categorias.length} categorias
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Maior Gasto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {gastosPorCategoria.length > 0 ? gastosPorCategoria[0].nome : '-'}
            </div>
            <p className="text-xs text-muted-foreground">
              categoria predominante
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Gasto Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {gastosPorCategoria.length > 0 
                ? (totalGeral / gastosPorCategoria.length).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : '0,00'
              }
            </div>
            <p className="text-xs text-muted-foreground">
              por categoria
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Despesas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {despesasPeriodo.length}
            </div>
            <p className="text-xs text-muted-foreground">
              no período
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RelatorioCategorias;
