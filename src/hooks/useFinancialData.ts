
import { useInvestidores } from './useInvestidores';
import { useCategorias } from './useCategorias';
import { useDespesas } from './useDespesas';
import { useAportes } from './useAportes';
import { DashboardData } from '@/types';

// Hook que agrega os outros hooks financeiros
export const useFinancialData = () => {
  const { investidores, isLoading: investidoresLoading } = useInvestidores();
  const { categorias, isLoading: categoriasLoading } = useCategorias();
  const { despesas, isLoading: despesasLoading } = useDespesas();
  const { aportes, isLoading: aportesLoading } = useAportes();
  
  const isLoading = investidoresLoading || categoriasLoading || despesasLoading || aportesLoading;

  // Cálculos baseados em dados reais
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const despesasMes = despesas.filter(despesa => {
    const despesaDate = new Date(despesa.data_vencimento);
    return despesaDate.getMonth() === currentMonth && despesaDate.getFullYear() === currentYear;
  });

  const aportesMes = aportes.filter(aporte => {
    const aporteDate = new Date(aporte.data);
    return aporteDate.getMonth() === currentMonth && aporteDate.getFullYear() === currentYear;
  });

  const totalDespesasMes = despesasMes.reduce((sum, despesa) => sum + despesa.valor, 0);
  const totalDespesasPagas = despesasMes.filter(d => d.status === 'pago').reduce((sum, d) => sum + d.valor, 0);
  const totalDespesasPendentes = despesasMes.filter(d => d.status === 'pendente').reduce((sum, d) => sum + d.valor, 0);
  
  const totalAportesMes = aportesMes.reduce((sum, aporte) => sum + aporte.valor, 0);
  const saldoTotalInvestidores = investidores.reduce((sum, inv) => sum + inv.saldo_atual, 0);

  // Dashboard data com dados reais
  const dashboardData: DashboardData = {
    despesasMes: {
      total: totalDespesasMes,
      pagas: totalDespesasPagas,
      pendentes: totalDespesasPendentes
    },
    aportesMes: {
      total: totalAportesMes,
      saldoDisponivel: saldoTotalInvestidores
    },
    saldosInvestidores: investidores.map(inv => ({
      investidorId: inv.id,
      saldo: inv.saldo_atual
    })),
    proximosVencimentos: despesas
      .filter(d => d.status === 'pendente')
      .sort((a, b) => new Date(a.data_vencimento).getTime() - new Date(b.data_vencimento).getTime())
      .slice(0, 5), // Próximos 5 vencimentos
    totalReceitas: totalAportesMes,
    totalDespesas: totalDespesasMes,
    saldoTotal: saldoTotalInvestidores - totalDespesasPendentes
  };

  return {
    investidores,
    categorias,
    cartoes: [], // Será implementado quando criarmos o hook useCartoes
    despesas,
    aportes,
    dashboardData,
    isLoading
  };
};
