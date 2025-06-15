
export interface Investidor {
  id: string;
  nome: string;
  email: string;
  ativo: boolean;
  saldo_atual: number;
  created_at?: string;
  updated_at?: string;
}

export interface Categoria {
  id: string;
  nome: string;
  cor: string;
  icone: string;
  created_at?: string;
  updated_at?: string;
}

export interface Cartao {
  id: string;
  nome: string;
  bandeira: string;
  limite: number;
  diaFechamento: number;
  diaVencimento: number;
  investidorId: string;
}

export type TipoDespesa = 'unica' | 'recorrente' | 'parcelada';
export type StatusDespesa = 'pendente' | 'pago';
export type FormaPagamento = 'dinheiro' | 'transferencia' | 'cartao';
export type FrequenciaRecorrente = 'mensal' | 'trimestral' | 'semestral' | 'anual';

export interface Despesa {
  id: string;
  descricao: string;
  origem: string;
  categoriaId: string;
  valor: number;
  dataCompra: string;
  dataVencimento: string;
  formaPagamento: FormaPagamento;
  status: StatusDespesa;
  tipo: TipoDespesa;
  cartaoId?: string;
  
  // Campos para despesa recorrente
  frequencia?: FrequenciaRecorrente;
  
  // Campos para despesa parcelada
  totalParcelas?: number;
  parcelaAtual?: number;
  
  // Divisão entre investidores
  divisaoInvestidores: { investidorId: string; valor: number }[];
}

export interface Aporte {
  id: string;
  investidorId: string;
  valor: number;
  data: string;
  descricao: string;
}

export interface DashboardData {
  despesasMes: {
    total: number;
    pagas: number;
    pendentes: number;
  };
  aportesMes: {
    total: number;
    saldoDisponivel: number;
  };
  saldosInvestidores: { investidorId: string; saldo: number }[];
  proximosVencimentos: Despesa[];
  // Adicionando as propriedades que estão sendo usadas
  totalReceitas: number;
  totalDespesas: number;
  saldoTotal: number;
}

export interface EventoCalendario {
  id: string;
  titulo: string;
  descricao?: string;
  data: string;
  valor: number;
  tipo: 'despesa' | 'aporte';
  status: 'pendente' | 'pago' | 'confirmado';
  investidor?: string;
}
