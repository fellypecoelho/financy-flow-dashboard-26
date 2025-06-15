
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { useDespesas } from '@/hooks/useDespesas';
import { useAportes } from '@/hooks/useAportes';
import { useInvestidores } from '@/hooks/useInvestidores';
import { useCategorias } from '@/hooks/useCategorias';
import { DashboardData } from '@/types';

export const useFinancialData = () => {
  const { user } = useAuth();
  const { despesas, isLoading: despesasLoading } = useDespesas();
  const { aportes, isLoading: aportesLoading } = useAportes();
  const { investidores, isLoading: investidoresLoading } = useInvestidores();
  const { categorias, isLoading: categoriasLoading } = useCategorias();

  const isLoading = despesasLoading || aportesLoading || investidoresLoading || categoriasLoading;

  // Calcular dados do dashboard baseado nos dados reais
  const dashboardData: DashboardData | null = user ? {
    despesasMes: {
      total: despesas.reduce((sum, d) => sum + d.valor, 0),
      pagas: despesas.filter(d => d.status === 'pago').reduce((sum, d) => sum + d.valor, 0),
      pendentes: despesas.filter(d => d.status === 'pendente').reduce((sum, d) => sum + d.valor, 0),
    },
    aportesMes: {
      total: aportes.reduce((sum, a) => sum + a.valor, 0),
      saldoDisponivel: aportes.reduce((sum, a) => sum + a.valor, 0) - despesas.filter(d => d.status === 'pago').reduce((sum, d) => sum + d.valor, 0),
    },
    saldosInvestidores: investidores.map(inv => ({
      investidorId: inv.id,
      saldo: inv.saldo_atual
    })),
    proximosVencimentos: despesas.filter(d => d.status === 'pendente').slice(0, 5),
    totalReceitas: aportes.reduce((sum, a) => sum + a.valor, 0),
    totalDespesas: despesas.reduce((sum, d) => sum + d.valor, 0),
    saldoTotal: aportes.reduce((sum, a) => sum + a.valor, 0) - despesas.filter(d => d.status === 'pago').reduce((sum, d) => sum + d.valor, 0)
  } : null;

  return {
    despesas,
    aportes,
    investidores,
    categorias,
    dashboardData,
    isLoading
  };
};
