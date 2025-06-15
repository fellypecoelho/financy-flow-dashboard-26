
import { Cartao, Investidor, Despesa } from './index';

// Props padronizadas para componentes de cartão
export interface CartaoCardProps {
  cartao: Cartao;
  investidores: Investidor[];
  onEdit: (cartao: Cartao) => void;
  onDelete: (id: string) => void;
}

export interface CartaoVisualProps {
  cartao: Cartao;
  limiteUtilizado: number;
  percentualUtilizado: number;
}

export interface CartaoInfoProps {
  cartao: Cartao;
  investidores: Investidor[];
  onEdit: (cartao: Cartao) => void;
  onDelete: (id: string) => void;
}

export interface CartaoStatsProps {
  cartoes: Cartao[];
  despesas: Despesa[];
}

export interface CartaoTableProps {
  cartoes: Cartao[];
  investidores: Investidor[];
  onEdit: (cartao: Cartao) => void;
  onDelete: (id: string) => void;
}

export interface CartaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cartao: Omit<Cartao, 'id'>) => void;
  cartao: Cartao | null;
  investidores: Investidor[];
}

export interface CartaoFiltersProps {
  filters: {
    investidor: string;
    bandeira: string;
  };
  onFiltersChange: (filters: { investidor: string; bandeira: string }) => void;
  investidores: Investidor[];
}

export interface CartaoSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filters: {
    investidor: string;
    bandeira: string;
  };
  onFiltersChange: (filters: { investidor: string; bandeira: string }) => void;
  investidores: Investidor[];
}

// Tipos para cálculos de cartão
export interface CartaoCalculation {
  cartao: Cartao;
  utilizado: number;
  percentualUtilizado: number;
  disponivel: number;
}

export interface CartaoCalculations {
  limiteTotal: number;
  limiteUtilizado: number;
  proximaFatura: number;
  cartoesAtivos: number;
  percentualUtilizadoGeral: number;
  calculosPorCartao: Record<string, {
    utilizado: number;
    percentualUtilizado: number;
    disponivel: number;
  }>;
}

// Tipos para filtros
export interface CartaoFilters {
  investidor: string;
  bandeira: string;
}
