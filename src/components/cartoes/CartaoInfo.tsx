
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Cartao, Investidor } from '@/types';
import { getInvestidorNome, getInvestidorInitials } from '@/utils/investidorUtils';

interface CartaoInfoProps {
  cartao: Cartao;
  investidores: Investidor[];
  onEdit: (cartao: Cartao) => void;
  onDelete: (id: string) => void;
}

const CartaoInfo = ({ cartao, investidores, onEdit, onDelete }: CartaoInfoProps) => {
  return (
    <div className="p-4 bg-gray-50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-sm">
              {getInvestidorInitials(cartao.investidorId, investidores)}
            </span>
          </div>
          <span className="text-sm text-gray-600">
            {getInvestidorNome(cartao.investidorId, investidores)}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(cartao)}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(cartao.id)}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-500">Fechamento:</span>
          <span className="ml-2 bg-gray-200 px-2 py-1 rounded text-xs">
            Dia {cartao.diaFechamento}
          </span>
        </div>
        <div>
          <span className="text-gray-500">Vencimento:</span>
          <span className="ml-2 bg-red-100 text-red-600 px-2 py-1 rounded text-xs">
            Dia {cartao.diaVencimento}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartaoInfo;
