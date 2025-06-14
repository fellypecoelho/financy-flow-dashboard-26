
import React from 'react';
import { Cartao, Investidor } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import CartaoVisual from './CartaoVisual';
import CartaoInfo from './CartaoInfo';

interface CartaoCardProps {
  cartao: Cartao;
  investidores: Investidor[];
  onEdit: (cartao: Cartao) => void;
  onDelete: (id: string) => void;
}

const CartaoCard = ({ cartao, investidores, onEdit, onDelete }: CartaoCardProps) => {
  const limiteUtilizado = Math.random() * cartao.limite; // Simulação
  const percentualUtilizado = (limiteUtilizado / cartao.limite) * 100;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <CartaoVisual 
          cartao={cartao}
          limiteUtilizado={limiteUtilizado}
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
