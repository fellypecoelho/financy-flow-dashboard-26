
import { useState } from 'react';
import { Cartao, Investidor } from '@/types';

interface CartaoFilters {
  investidor: string;
  bandeira: string;
}

export const useCartaoFilters = (cartoes: Cartao[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<CartaoFilters>({
    investidor: '',
    bandeira: ''
  });

  const filteredCartoes = cartoes.filter(cartao => {
    const matchesSearch = cartao.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cartao.bandeira.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesInvestidor = !filters.investidor || cartao.investidorId === filters.investidor;
    const matchesBandeira = !filters.bandeira || cartao.bandeira === filters.bandeira;
    
    return matchesSearch && matchesInvestidor && matchesBandeira;
  });

  return {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    filteredCartoes
  };
};
