
import React, { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useFinancialData } from '@/hooks/useFinancialData';
import { useCartaoCalculation } from '@/hooks/useCartaoCalculations';
import { CartaoCardProps } from '@/types/cartao';
import CartaoVisual from './CartaoVisual';
import CartaoInfo from './CartaoInfo';

const CartaoCard: React.FC<CartaoCardProps> = memo(({ cartao, investidores, onEdit, onDelete }) => {
  const { despesas } = useFinancialData();
  const calculation = useCartaoCalculation(cartao.id, [cartao], despesas);

  // Se não conseguir calcular, usar valores padrão para evitar crash
  const utilizado = calculation?.utilizado || 0;
  const percentualUtilizado = calculation?.percentualUtilizado || 0;

  console.log('CartaoCard rendering:', {
    cartaoId: cartao.id,
    cartaoNome: cartao.nome,
    calculation,
    utilizado,
    percentualUtilizado
  });

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
});

CartaoCard.displayName = 'CartaoCard';

export default CartaoCard;
