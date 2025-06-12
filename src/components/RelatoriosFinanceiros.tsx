
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import RelatorioGeral from '@/components/relatorios/RelatorioGeral';
import RelatorioInvestidores from '@/components/relatorios/RelatorioInvestidores';
import RelatorioFluxoCaixa from '@/components/relatorios/RelatorioFluxoCaixa';
import RelatorioCategorias from '@/components/relatorios/RelatorioCategorias';
import { useFinancialData } from '@/hooks/useFinancialData';
import { format, startOfMonth, endOfMonth, subMonths, addDays, isAfter, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { BarChart3, Download, Filter, TrendingUp, Clock, DollarSign, Target } from 'lucide-react';

const RelatoriosFinanceiros = () => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState<Date>(new Date());
  const [tipoRelatorio, setTipoRelatorio] = useState('mes-atual');
  
  const { despesas, aportes, investidores } = useFinancialData();

  const mesAtual = format(periodoSelecionado, 'MMMM yyyy', { locale: ptBR });
  const inicioMes = startOfMonth(periodoSelecionado);
  const fimMes = endOfMonth(periodoSelecionado);

  // Cálculos básicos para cards de resumo
  const totalDespesasMes = despesas
    .filter(d => {
      const data = new Date(d.dataVencimento);
      return data >= inicioMes && data <= fimMes;
    })
    .reduce((acc, d) => acc + d.valor, 0);

  const totalAportesMes = aportes
    .filter(a => {
      const data = new Date(a.data);
      return data >= inicioMes && data <= fimMes;
    })
    .reduce((acc, a) => acc + a.valor, 0);

  const saldoMes = totalAportesMes - totalDespesasMes;

  // Cálculo de próximos vencimentos (próximos 7 dias)
  const hoje = new Date();
  const proximosSeteDias = addDays(hoje, 7);
  const proximosVencimentos = despesas.filter(d => {
    const dataVencimento = new Date(d.dataVencimento);
    return d.status === 'pendente' && 
           isAfter(dataVencimento, hoje) && 
           isBefore(dataVencimento, proximosSeteDias);
  }).length;

  const handleExportarRelatorio = () => {
    // Lógica para exportar relatório
    console.log('Exportando relatório...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            Relatórios Financeiros
          </h1>
          <p className="text-gray-500 mt-1 capitalize">
            {mesAtual} - Análises e insights detalhados
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={tipoRelatorio} onValueChange={setTipoRelatorio}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mes-atual">Mês Atual</SelectItem>
              <SelectItem value="mes-anterior">Mês Anterior</SelectItem>
              <SelectItem value="trimestre">Trimestre</SelectItem>
              <SelectItem value="ano">Ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={handleExportarRelatorio}>
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Cards de Resumo - Apenas 3 cards agora */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Despesas</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold text-red-600">
              R$ {totalDespesasMes.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              no período selecionado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Aportes</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold text-green-600">
              R$ {totalAportesMes.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              no período selecionado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo do Período</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-xl lg:text-2xl font-bold ${saldoMes >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              R$ {saldoMes.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              {saldoMes >= 0 ? 'superávit' : 'déficit'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Card separado para Próximos Vencimentos */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-500" />
            Próximos Vencimentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {proximosVencimentos}
              </div>
              <p className="text-sm text-muted-foreground">
                {proximosVencimentos === 1 ? 'despesa vence' : 'despesas vencem'} nos próximos 7 dias
              </p>
            </div>
            {proximosVencimentos > 0 && (
              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                Atenção
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabs dos Relatórios */}
      <Tabs defaultValue="geral" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="geral" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="investidores" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Investidores
          </TabsTrigger>
          <TabsTrigger value="fluxo-caixa" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Fluxo de Caixa
          </TabsTrigger>
          <TabsTrigger value="categorias" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Categorias
          </TabsTrigger>
        </TabsList>

        <TabsContent value="geral" className="space-y-6">
          <RelatorioGeral 
            periodo={periodoSelecionado}
            despesas={despesas}
            aportes={aportes}
          />
        </TabsContent>

        <TabsContent value="investidores" className="space-y-6">
          <RelatorioInvestidores 
            periodo={periodoSelecionado}
            despesas={despesas}
            aportes={aportes}
            investidores={investidores}
          />
        </TabsContent>

        <TabsContent value="fluxo-caixa" className="space-y-6">
          <RelatorioFluxoCaixa 
            periodo={periodoSelecionado}
            despesas={despesas}
            aportes={aportes}
          />
        </TabsContent>

        <TabsContent value="categorias" className="space-y-6">
          <RelatorioCategorias 
            periodo={periodoSelecionado}
            despesas={despesas}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RelatoriosFinanceiros;
