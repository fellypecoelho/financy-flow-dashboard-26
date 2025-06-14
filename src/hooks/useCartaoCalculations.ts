
import { useMemo } from 'react';
import { Cartao, Despesa } from '@/types';

export const useCartaoCalculations = (cartoes: Cartao[], despesas: Despesa[]) => {
  const calculations = useMemo(() => {
    const limiteTotal = cartoes.reduce((acc, cartao) => acc + cartao.limite, 0);
    
    const limiteUtilizado = despesas
      .filter(d => d.formaPagamento === 'cartao' && d.cartaoId)
      .reduce((acc, despesa) => acc + despesa.valor, 0);
    
    const proximaFatura = despesas
      .filter(d => d.formaPagamento === 'cartao' && d.status === 'pendente')
      .reduce((acc, despesa) => acc + despesa.valor, 0);

    const cartoesAtivos = cartoes.length;
    
    const percentualUtilizadoGeral = limiteTotal > 0 ? (limiteUtilizado / limiteTotal) * 100 : 0;

    // Cálculos por cartão individual
    const calculosPorCartao = cartoes.reduce((acc, cartao) => {
      const utilizadoCartao = despesas
        .filter(d => d.formaPagamento === 'cartao' && d.cartaoId === cartao.id)
        .reduce((sum, despesa) => sum + despesa.valor, 0);
      
      const percentualUtilizadoCartao = cartao.limite > 0 ? (utilizadoCartao / cartao.limite) * 100 : 0;
      const limiteDisponivel = cartao.limite - utilizadoCartao;

      acc[cartao.id] = {
        utilizado: utilizadoCartao,
        percentualUtilizado: percentualUtilizadoCartao,
        disponivel: limiteDisponivel
      };
      
      return acc;
    }, {} as Record<string, { utilizado: number; percentualUtilizado: number; disponivel: number }>);

    return {
      limiteTotal,
      limiteUtilizado,
      proximaFatura,
      cartoesAtivos,
      percentualUtilizadoGeral,
      calculosPorCartao
    };
  }, [cartoes, despesas]);

  return calculations;
};

export const useCartaoCalculation = (cartaoId: string, cartoes: Cartao[], despesas: Despesa[]) => {
  return useMemo(() => {
    const cartao = cartoes.find(c => c.id === cartaoId);
    if (!cartao) return null;

    const utilizado = despesas
      .filter(d => d.formaPagamento === 'cartao' && d.cartaoId === cartaoId)
      .reduce((acc, despesa) => acc + despesa.valor, 0);
    
    const percentualUtilizado = cartao.limite > 0 ? (utilizado / cartao.limite) * 100 : 0;
    const disponivel = cartao.limite - utilizado;

    return {
      cartao,
      utilizado,
      percentualUtilizado,
      disponivel
    };
  }, [cartaoId, cartoes, despesas]);
};
