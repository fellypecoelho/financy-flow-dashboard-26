
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CartaoHeaderProps {
  onAddCartao: () => void;
}

const CartaoHeader = ({ onAddCartao }: CartaoHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gerenciamento de Cartões</h1>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">Controle de cartões de crédito e faturas da empresa</p>
      </div>
      <Button onClick={onAddCartao} className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
        <Plus className="h-4 w-4 mr-2" />
        Adicionar Cartão
      </Button>
    </div>
  );
};

export default CartaoHeader;
