import React from 'react';
import { useDashboardData } from '@/hooks/useDashboardData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, DollarSign, Wallet, Plus } from 'lucide-react';
import CategoryChart from './CategoryChart';
import FinancialChart from './FinancialChart';
import RecentTransactions from './RecentTransactions';
import StatsSkeleton from '@/components/ui/StatsSkeleton';
import { useLancamentos } from '@/hooks/useLancamentos';
import { useCategorias } from '@/hooks/useCategorias';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { dashboardData, isLoading } = useDashboardData();
  const { createLancamento } = useLancamentos();
  const { categorias } = useCategorias();
  const { toast } = useToast();

  const insertDemoData = async () => {
    if (!categorias.length) {
      toast({
        title: "Erro",
        description: "Aguarde as categorias carregarem",
        variant: "destructive"
      });
      return;
    }

    const demoData = [
      {
        titulo: 'Salário',
        valor: 5000,
        data: '2024-12-01',
        tipo: 'receita' as const,
        categoria_id: categorias.find(c => c.nome === 'Salário')?.id || categorias[0].id,
        descricao: 'Salário mensal'
      },
      {
        titulo: 'Supermercado',
        valor: 450,
        data: '2024-12-05',
        tipo: 'despesa' as const,
        categoria_id: categorias.find(c => c.nome === 'Alimentação')?.id || categorias[0].id,
        descricao: 'Compras do mês'
      },
      {
        titulo: 'Freelance',
        valor: 1200,
        data: '2024-12-10',
        tipo: 'receita' as const,
        categoria_id: categorias.find(c => c.nome === 'Freelance')?.id || categorias[0].id,
        descricao: 'Projeto de desenvolvimento'
      },
      {
        titulo: 'Combustível',
        valor: 180,
        data: '2024-12-08',
        tipo: 'despesa' as const,
        categoria_id: categorias.find(c => c.nome === 'Transporte')?.id || categorias[0].id,
        descricao: 'Abastecimento'
      },
      {
        titulo: 'Cinema',
        valor: 45,
        data: '2024-12-12',
        tipo: 'despesa' as const,
        categoria_id: categorias.find(c => c.nome === 'Lazer')?.id || categorias[0].id,
        descricao: 'Sessão de filme'
      }
    ];

    try {
      for (const data of demoData) {
        await createLancamento.mutateAsync(data);
      }
      
      toast({
        title: "Sucesso!",
        description: "Dados de demonstração inseridos com sucesso!"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao inserir dados de demonstração",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return <StatsSkeleton />;
  }

  if (!dashboardData) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard Financeiro</h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              Visão geral das suas finanças pessoais
            </p>
          </div>
        </div>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="bg-primary/10 p-4 rounded-full w-fit mx-auto">
                <DollarSign className="h-12 w-12 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Bem-vindo ao seu Dashboard!</h3>
                <p className="text-muted-foreground mt-2">
                  Comece adicionando seus primeiros lançamentos para ver suas finanças organizadas.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={insertDemoData} disabled={createLancamento.isPending}>
                  <Plus className="mr-2 h-4 w-4" />
                  {createLancamento.isPending ? 'Inserindo...' : 'Inserir Dados de Exemplo'}
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/#/lancamentos'}>
                  Adicionar Primeiro Lançamento
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { saldoTotal, receitasMes, despesasMes, saldoMes, lancamentosRecentes, gastosPorCategoria, evolucaoMensal } = dashboardData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard Financeiro</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            Visão geral das suas finanças pessoais
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={insertDemoData} disabled={createLancamento.isPending}>
            <Plus className="mr-2 h-4 w-4" />
            {createLancamento.isPending ? 'Inserindo...' : 'Dados de Exemplo'}
          </Button>
          <select className="px-3 py-2 border border-input rounded-lg text-sm bg-background text-foreground">
            <option>Dezembro 2024</option>
            <option>Janeiro 2025</option>
          </select>
        </div>
      </div>

      {/* Cards principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {saldoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              Saldo geral de todas as suas contas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receitas do Mês</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {receitasMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              Total de entradas este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas do Mês</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              R$ {despesasMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              Total de saídas este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo do Mês</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${saldoMes >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              R$ {saldoMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              {saldoMes >= 0 ? 'Saldo positivo' : 'Saldo negativo'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryChart data={gastosPorCategoria} />
        <FinancialChart data={evolucaoMensal} />
      </div>

      {/* Lançamentos recentes */}
      <div className="grid grid-cols-1 gap-6">
        <RecentTransactions lancamentos={lancamentosRecentes} />
      </div>
    </div>
  );
};

export default Dashboard;
