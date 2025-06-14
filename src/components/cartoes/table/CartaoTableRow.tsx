
import React from 'react';
import { Edit, Trash2, CreditCard } from 'lucide-react';
import { Cartao, Investidor } from '@/types';
import { TableCell, TableRow } from '@/components/ui/table';
import { getInvestidorNome, getInvestidorInitials } from '@/utils/investidorUtils';
import { getBandeiraColor, formatLimit } from '@/utils/cartaoUtils';

interface CartaoTableRowProps {
  cartao: Cartao;
  investidores: Investidor[];
  onEdit: (cartao: Cartao) => void;
  onDelete: (id: string) => void;
}

const CartaoTableRow = ({ cartao, investidores, onEdit, onDelete }: CartaoTableRowProps) => {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center">
          <div className="h-8 w-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
            <CreditCard className="h-4 w-4 text-gray-600" />
          </div>
          {cartao.nome}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center">
          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-blue-600 font-semibold text-sm">
              {getInvestidorInitials(cartao.investidorId, investidores)}
            </span>
          </div>
          {getInvestidorNome(cartao.investidorId, investidores)}
        </div>
      </TableCell>
      <TableCell>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBandeiraColor(cartao.bandeira)}`}>
          {cartao.bandeira}
        </span>
      </TableCell>
      <TableCell className="text-right font-semibold">
        {formatLimit(cartao.limite)}
      </TableCell>
      <TableCell className="text-center">
        <span className="bg-gray-100 px-2 py-1 rounded text-sm">
          Dia {cartao.diaFechamento}
        </span>
      </TableCell>
      <TableCell className="text-center">
        <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
          Dia {cartao.diaVencimento}
        </span>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end space-x-2">
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
      </TableCell>
    </TableRow>
  );
};

export default CartaoTableRow;
