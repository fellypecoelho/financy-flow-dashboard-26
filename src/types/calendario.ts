
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
