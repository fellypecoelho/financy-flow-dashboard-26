
import React from 'react';
import { Cartao, Despesa } from '@/types';
import LimiteTotalCard from './stats/LimiteTotalCard';
import LimiteUtilizadoCard from './stats/LimiteUtilizadoCard';
import ProximaFaturaCard from './stats/ProximaFaturaCard';
import CartoesAtivosCard from './stats/CartoesAtivosCard';

interface CartaoStatsProps {
  cartoes: Cartao[];
  despesas: Despesa[];
}

const CartaoStats = ({ cartoes, despesas }: CartaoStatsProps) => {
  const limiteTotal = cartoes.reduce((acc, cartao) => acc + cartao.limite, 0);
  const limiteUtilizado = despesas
    .filter(d => d.formaPagamento === 'cartao' && d.cartaoId)
    .reduce((acc, despesa) => acc + despesa.valor, 0);
  
  const proximaFatura = despesas
    .filter(d => d.formaPagamento === 'cartao' && d.status === 'pendente')
    .reduce((acc, despesa) => acc + despesa.valor, 0);

  const cartoesAtivos = cartoes.length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      <LimiteTotalCard limiteTotal={limiteTotal} cartoesAtivos={cartoesAtivos} />
      <LimiteUtilizadoCard limiteUtilizado={limiteUtilizado} limiteTotal={limiteTotal} />
      <ProximaFaturaCard proximaFatura={proximaFatura} />
      <CartoesAtivosCard cartoesAtivos={cartoesAtivos} />
    </div>
  );
};

export default CartaoStats;
