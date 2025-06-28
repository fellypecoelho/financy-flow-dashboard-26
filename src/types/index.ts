export interface User {
  id: string;
  email: string;
  nome: string;
  tipo_usuario: 'admin' | 'investidor';
  ativo: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Categoria {
  id: string;
  nome: string;
  cor: string;
  icone: string;
  tipo: 'receita' | 'despesa';
  created_at?: string;
  updated_at?: string;
}

export interface Lancamento {
  id: string;
  titulo: string;
  valor: number;
  data: string;
  tipo: 'receita' | 'despesa';
  categoriaId: string;
  descricao?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Meta {
  id: string;
  titulo: string;
  valor: number;
  tipo: 'economia' | 'limite';
  categoriaId?: string;
  mes: string; // formato: YYYY-MM
  valorAtual: number;
  created_at?: string;
  updated_at?: string;
}

export interface DashboardData {
  saldoTotal: number;
  receitasMes: number;
  despesasMes: number;
  saldoMes: number;
  lancamentosRecentes: Lancamento[];
  gastosPorCategoria: { categoriaId: string; valor: number; nome: string; cor: string }[];
  evolucaoMensal: { mes: string; receitas: number; despesas: number; saldo: number }[];
}

export interface FiltrosLancamento {
  tipo: 'todos' | 'receita' | 'despesa';
  categoria: string;
  dataInicio: string;
  dataFim: string;
  busca: string;
}
