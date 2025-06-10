
import { useState, useEffect } from 'react';
import { Investidor, Categoria, Cartao, Despesa, Aporte, DashboardData } from '@/types';

// Mock data para desenvolvimento
const mockInvestidores: Investidor[] = [
  { id: '1', nome: 'João Silva', email: 'joao@email.com', ativo: true, saldoAtual: 15420.50 },
  { id: '2', nome: 'Maria Santos', email: 'maria@email.com', ativo: true, saldoAtual: 8750.30 },
  { id: '3', nome: 'Pedro Costa', email: 'pedro@email.com', ativo: true, saldoAtual: 12300.00 },
];

const mockCategorias: Categoria[] = [
  { id: '1', nome: 'Alimentação', cor: '#ef4444', icone: 'UtensilsCrossed' },
  { id: '2', nome: 'Transporte', cor: '#f97316', icone: 'Car' },
  { id: '3', nome: 'Moradia', cor: '#eab308', icone: 'Home' },
  { id: '4', nome: 'Lazer', cor: '#22c55e', icone: 'Gamepad2' },
  { id: '5', nome: 'Saúde', cor: '#3b82f6', icone: 'Heart' },
  { id: '6', nome: 'Educação', cor: '#8b5cf6', icone: 'GraduationCap' },
];

const mockCartoes: Cartao[] = [
  { id: '1', nome: 'Nubank Roxinho', bandeira: 'Mastercard', limite: 5000, diaFechamento: 15, diaVencimento: 10, investidorId: '1' },
  { id: '2', nome: 'Itaú Click', bandeira: 'Visa', limite: 3000, diaFechamento: 5, diaVencimento: 25, investidorId: '2' },
];

export const useFinancialData = () => {
  const [investidores] = useState<Investidor[]>(mockInvestidores);
  const [categorias] = useState<Categoria[]>(mockCategorias);
  const [cartoes, setCartoes] = useState<Cartao[]>(mockCartoes);
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [aportes, setAportes] = useState<Aporte[]>([]);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  // Simulação de dados para desenvolvimento
  useEffect(() => {
    const mockDespesas: Despesa[] = [
      {
        id: '1',
        descricao: 'Supermercado',
        origem: 'Extra',
        categoriaId: '1',
        valor: 450.30,
        dataCompra: '2024-12-01',
        dataVencimento: '2024-12-01',
        formaPagamento: 'cartao',
        status: 'pago',
        tipo: 'unica',
        cartaoId: '1',
        divisaoInvestidores: [
          { investidorId: '1', valor: 150.10 },
          { investidorId: '2', valor: 150.10 },
          { investidorId: '3', valor: 150.10 }
        ]
      },
      {
        id: '2',
        descricao: 'Aluguel',
        origem: 'Imobiliária',
        categoriaId: '3',
        valor: 2200.00,
        dataCompra: '2024-12-01',
        dataVencimento: '2024-12-10',
        formaPagamento: 'transferencia',
        status: 'pendente',
        tipo: 'recorrente',
        frequencia: 'mensal',
        divisaoInvestidores: [
          { investidorId: '1', valor: 733.33 },
          { investidorId: '2', valor: 733.33 },
          { investidorId: '3', valor: 733.34 }
        ]
      }
    ];

    const mockAportes: Aporte[] = [
      { id: '1', investidorId: '1', valor: 3000.00, data: '2024-12-01', descricao: 'Aporte mensal' },
      { id: '2', investidorId: '2', valor: 2500.00, data: '2024-12-01', descricao: 'Aporte mensal' },
      { id: '3', investidorId: '3', valor: 3000.00, data: '2024-12-01', descricao: 'Aporte mensal' },
    ];

    setDespesas(mockDespesas);
    setAportes(mockAportes);

    // Calcular dados do dashboard
    const totalDespesas = mockDespesas.reduce((acc, despesa) => acc + despesa.valor, 0);
    const despesasPagas = mockDespesas.filter(d => d.status === 'pago').reduce((acc, despesa) => acc + despesa.valor, 0);
    const totalAportes = mockAportes.reduce((acc, aporte) => acc + aporte.valor, 0);

    setDashboardData({
      despesasMes: {
        total: totalDespesas,
        pagas: despesasPagas,
        pendentes: totalDespesas - despesasPagas
      },
      aportesMes: {
        total: totalAportes,
        saldoDisponivel: totalAportes - despesasPagas
      },
      saldosInvestidores: investidores.map(inv => ({
        investidorId: inv.id,
        saldo: inv.saldoAtual
      })),
      proximosVencimentos: mockDespesas.filter(d => d.status === 'pendente').slice(0, 5)
    });
  }, [investidores]);

  return {
    investidores,
    categorias,
    cartoes,
    despesas,
    aportes,
    dashboardData,
    setDespesas,
    setAportes,
    setCartoes
  };
};
