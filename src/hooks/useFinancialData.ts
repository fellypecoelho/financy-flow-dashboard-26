
import { useInvestidores } from './useInvestidores';
import { useCategorias } from './useCategorias';
import { DashboardData } from '@/types';
import { useState } from 'react';

// Hook simplificado que agrega os outros hooks
export const useFinancialData = () => {
  const { investidores, isLoading: investidoresLoading } = useInvestidores();
  const { categorias, isLoading: categoriasLoading } = useCategorias();

  // Dados temporários até migrarmos completamente
  const [cartoes, setCartoes] = useState([]);
  const [despesas, setDespesas] = useState([]);
  const [aportes, setAportes] = useState([]);
  
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
    cartoes,
    despesas,
    aportes,
    dashboardData,
    isLoading,
    // Funções setter necessárias para os componentes
    setCartoes,
    setDespesas,
    setAportes,
    setCategorias: () => {}, // Placeholder, será removido quando migrarmos categorias
  };
};
