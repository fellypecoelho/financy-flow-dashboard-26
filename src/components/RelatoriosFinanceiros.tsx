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
import FiltrosAvancados from '@/components/relatorios/FiltrosAvancados';
import ExportarRelatorio from '@/components/relatorios/ExportarRelatorio';
import NotificacaoVencimentos from '@/components/relatorios/NotificacaoVencimentos';
import { useFinancialData } from '@/hooks/useFinancialData';
import { format, startOfMonth, endOfMonth, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { BarChart3, Download, Filter, TrendingUp, Clock, DollarSign, Target, Calendar, Settings } from 'lucide-react';

const RelatoriosFinanceiros = () => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState<Date>(new Date());
  const [tipoRelatorio, setTipoRelatorio] = useState('mes-atual');
  const [filtrosAtivos, setFiltrosAtivos] = useState({});
  
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

  // Simulação de próximos vencimentos com mais detalhes
  const hoje = new Date();
  
  const proximosVencimentosDetalhados = [
    {
      id: '1',
      descricao: 'Aluguel',
      valor: 2200.00,
      dataVencimento: format(addDays(hoje, 2), 'yyyy-MM-dd'),
      categoria: 'Moradia',
      status: 'pendente',
      prioridade: 'alta'
    },
    {
      id: '2',
      descricao: 'Conta de Luz',
      valor: 280.50,
      dataVencimento: format(addDays(hoje, 4), 'yyyy-MM-dd'),
      categoria: 'Moradia',
      status: 'pendente',
      prioridade: 'media'
    },
    {
      id: '3',
      descricao: 'Internet',
      valor: 89.90,
      dataVencimento: format(addDays(hoje, 6), 'yyyy-MM-dd'),
      categoria: 'Moradia',
      status: 'pendente',
      prioridade: 'baixa'
    },
    {
      id: '4',
      descricao: 'Supermercado',
      valor: 450.30,
      dataVencimento: format(addDays(hoje, 1), 'yyyy-MM-dd'),
      categoria: 'Alimentação',
      status: 'pendente',
      prioridade: 'alta'
    }
  ];

  const proximosVencimentos = proximosVencimentosDetalhados.length;

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'media':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'baixa':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getDiasRestantes = (dataVencimento: string) => {
    const vencimento = new Date(dataVencimento);
    const diffTime = vencimento.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleFiltrosChange = (novosFiltros: any) => {
    setFiltrosAtivos(novosFiltros);
    console.log('Filtros aplicados:', novosFiltros);
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
        </div>
      </div>

      {/* Cards de Resumo */}
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

      {/* Cards Funcionais */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <FiltrosAvancados onFiltrosChange={handleFiltrosChange} />
        <ExportarRelatorio dadosRelatorio={{ despesas, aportes, investidores }} periodo={periodoSelecionado} />
        <NotificacaoVencimentos />
      </div>

      {/* Card de Próximos Vencimentos */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
              Próximos Vencimentos
            </CardTitle>
            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
              {proximosVencimentos} {proximosVencimentos === 1 ? 'despesa' : 'despesas'}
            </Badge>
          </div>
          <CardDescription>
            Despesas que vencem nos próximos 7 dias
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {proximosVencimentosDetalhados.length > 0 ? (
            <div className="divide-y">
              {proximosVencimentosDetalhados.map((vencimento) => {
                const diasRestantes = getDiasRestantes(vencimento.dataVencimento);
                return (
                  <div key={vencimento.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          diasRestantes <= 1 ? 'bg-red-500' : 
                          diasRestantes <= 3 ? 'bg-orange-500' : 'bg-yellow-500'
                        }`} />
                        <div>
                          <div className="font-medium text-gray-900">{vencimento.descricao}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(vencimento.dataVencimento), "dd 'de' MMMM", { locale: ptBR })}
                            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                              {vencimento.categoria}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          R$ {vencimento.valor.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getPrioridadeColor(vencimento.prioridade)}`}
                          >
                            {vencimento.prioridade}
                          </Badge>
                          <span className={`text-xs font-medium ${
                            diasRestantes <= 1 ? 'text-red-600' : 
                            diasRestantes <= 3 ? 'text-orange-600' : 'text-yellow-600'
                          }`}>
                            {diasRestantes === 0 ? 'Hoje' : 
                             diasRestantes === 1 ? 'Amanhã' : 
                             `${diasRestantes} dias`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Nenhum vencimento nos próximos 7 dias</p>
            </div>
          )}
          {proximosVencimentosDetalhados.length > 0 && (
            <div className="p-4 bg-gray-50 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  Total dos vencimentos:
                </span>
                <span className="font-semibold text-gray-900">
                  R$ {proximosVencimentosDetalhados.reduce((acc, v) => acc + v.valor, 0).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          )}
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
