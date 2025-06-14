
import { Investidor } from '@/types';

export const getInvestidorNome = (investidorId: string, investidores: Investidor[]) => {
  const investidor = investidores.find(inv => inv.id === investidorId);
  return investidor?.nome || 'Investidor não encontrado';
};

export const getInvestidorInitials = (investidorId: string, investidores: Investidor[]) => {
  const nome = getInvestidorNome(investidorId, investidores);
  return nome.charAt(0).toUpperCase();
};

export const getInvestidor = (investidorId: string, investidores: Investidor[]) => {
  return investidores.find(inv => inv.id === investidorId);
};
