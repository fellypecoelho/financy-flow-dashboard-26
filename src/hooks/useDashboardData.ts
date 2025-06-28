import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { useLancamentos } from '@/hooks/useLancamentos';
import { useCategorias } from '@/hooks/useCategorias';
import { DashboardData } from '@/types';
import { format, startOfMonth, endOfMonth, subMonths } from 'date-fns';

export const useDashboardData = () => {
  const { user } = useAuth();
  const { lancamentos, isLoading: lancamentosLoading } = useLancamentos();
  const { categorias, isLoading: categoriasLoading } = useCategorias();

  const isLoading = lancamentosLoading || categoriasLoading;

  const dashboardData: DashboardData | null = user ? (() => {
    const hoje = new Date();
    const inicioMes = startOfMonth(hoje);
    const fimMes = endOfMonth(hoje);

    // Filtrar lançamentos do mês atual
    const lancamentosMes = lancamentos.filter(l => {
      const dataLancamento = new Date(l.data);
      return dataLancamento >= inicioMes && dataLancamento <= fimMes;
    });

    // Calcular totais do mês
    const receitasMes = lancamentosMes
      .filter(l => l.tipo === 'receita')
      .reduce((sum, l) => sum + l.valor, 0);

    const despesasMes = lancamentosMes
      .filter(l => l.tipo === 'despesa')
      .reduce((sum, l) => sum + l.valor, 0);

    const saldoMes = receitasMes - despesasMes;

    // Calcular saldo total (todos os lançamentos)
    const totalReceitas = lancamentos
      .filter(l => l.tipo === 'receita')
      .reduce((sum, l) => sum + l.valor, 0);

    const totalDespesas = lancamentos
      .filter(l => l.tipo === 'despesa')
      .reduce((sum, l) => sum + l.valor, 0);

    const saldoTotal = totalReceitas - totalDespesas;

    // Lançamentos recentes (últimos 5)
    const lancamentosRecentes = lancamentos.slice(0, 5);

    // Gastos por categoria (apenas despesas)
    const gastosPorCategoria = categorias
      .filter(c => c.tipo === 'despesa')
      .map(categoria => {
        const valor = lancamentosMes
          .filter(l => l.tipo === 'despesa' && l.categoriaId === categoria.id)
          .reduce((sum, l) => sum + l.valor, 0);

        return {
          categoriaId: categoria.id,
          valor,
          nome: categoria.nome,
          cor: categoria.cor
        };
      })
      .filter(g => g.valor > 0)
      .sort((a, b) => b.valor - a.valor);

    // Evolução mensal (últimos 6 meses)
    const evolucaoMensal = Array.from({ length: 6 }, (_, i) => {
      const mes = subMonths(hoje, i);
      const inicioMesHistorico = startOfMonth(mes);
      const fimMesHistorico = endOfMonth(mes);

      const lancamentosMesHistorico = lancamentos.filter(l => {
        const dataLancamento = new Date(l.data);
        return dataLancamento >= inicioMesHistorico && dataLancamento <= fimMesHistorico;
      });

      const receitas = lancamentosMesHistorico
        .filter(l => l.tipo === 'receita')
        .reduce((sum, l) => sum + l.valor, 0);

      const despesas = lancamentosMesHistorico
        .filter(l => l.tipo === 'despesa')
        .reduce((sum, l) => sum + l.valor, 0);

      const saldo = receitas - despesas;

      return {
        mes: format(mes, 'MMM/yy'),
        receitas,
        despesas,
        saldo
      };
    }).reverse();

    return {
      saldoTotal,
      receitasMes,
      despesasMes,
      saldoMes,
      lancamentosRecentes,
      gastosPorCategoria,
      evolucaoMensal
    };
  })() : null;

  return {
    dashboardData,
    isLoading
  };
}; 