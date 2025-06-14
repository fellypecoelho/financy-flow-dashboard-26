
import React from 'react';
import { Cartao, Investidor } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { useFinancialData } from '@/hooks/useFinancialData';
import { useCartaoCalculation } from '@/hooks/useCartaoCalculations';
import CartaoVisual from './CartaoVisual';
import CartaoInfo from './CartaoInfo';

interface CartaoCardProps {
  cartao: Cartao;
  investidores: Investidor[];
  onEdit: (cartao: Cartao) => void;
  onDelete: (id: string) => void;
}

const CartaoCard = ({ cartao, investidores, onEdit, onDelete }: CartaoCardProps) => {
  const { despesas } = useFinancialData();
  const calculation = useCartaoCalculation(cartao.id, [cartao], despesas);

  if (!calculation) return null;

  const { utilizado, percentualUtilizado } = calculation;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <CartaoVisual 
          cartao={cartao}
          limiteUtilizado={utilizado}
          percentualUtilizado={percentualUtilizado}
        />
        <CartaoInfo 
          cartao={cartao}
          investidores={investidores}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </CardContent>
    </Card>
  );
};

export default CartaoCard;
