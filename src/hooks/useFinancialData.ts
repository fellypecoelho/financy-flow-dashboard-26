
import { useInvestidores } from './useInvestidores';
import { useCategorias } from './useCategorias';
import { DashboardData } from '@/types';

// Hook simplificado que agrega os outros hooks
export const useFinancialData = () => {
  const { investidores, isLoading: investidoresLoading } = useInvestidores();
  const { categorias, isLoading: categoriasLoading } = useCategorias();

  // Dados temporários até migrarmos completamente
  const mockCartoes = [];
  const mockDespesas = [];
  const mockAportes = [];
  
  const isLoading = investidoresLoading || categoriasLoading;

  // Dashboard data simplificado
  const dashboardData: DashboardData = {
    despesasMes: {
      total: 0,
      pagas: 0,
      pendentes: 0
    },
    aportesMes: {
      total: 0,
      saldoDisponivel: 0
    },
    saldosInvestidores: investidores.map(inv => ({
      investidorId: inv.id,
      saldo: inv.saldo_atual
    })),
    proximosVencimentos: [],
    totalReceitas: 0,
    totalDespesas: 0,
    saldoTotal: 0
  };

  return {
    investidores,
    categorias,
    cartoes: mockCartoes,
    despesas: mockDespesas,
    aportes: mockAportes,
    dashboardData,
    isLoading
  };
};
