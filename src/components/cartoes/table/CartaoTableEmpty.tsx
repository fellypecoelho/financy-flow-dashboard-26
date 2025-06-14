
import React from 'react';
import { CreditCard } from 'lucide-react';

const CartaoTableEmpty = () => {
  return (
    <div className="text-center py-12">
      <CreditCard className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <p className="text-gray-500">Nenhum cartão encontrado</p>
    </div>
  );
};

export default CartaoTableEmpty;
