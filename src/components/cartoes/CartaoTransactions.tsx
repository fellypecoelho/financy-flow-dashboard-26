
import React from 'react';
import { Cartao, Despesa } from '@/types';
import TransacoesRecentesCard from './transactions/TransacoesRecentesCard';
import ProximasFaturasCard from './transactions/ProximasFaturasCard';

interface CartaoTransactionsProps {
  cartoes: Cartao[];
  despesas: Despesa[];
}

const CartaoTransactions = ({ cartoes, despesas }: CartaoTransactionsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <TransacoesRecentesCard despesas={despesas} />
      <ProximasFaturasCard cartoes={cartoes} despesas={despesas} />
    </div>
  );
};

export default CartaoTransactions;
