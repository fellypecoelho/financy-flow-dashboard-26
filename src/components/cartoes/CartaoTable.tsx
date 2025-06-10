
import React from 'react';
import { Edit, Trash2, CreditCard } from 'lucide-react';
import { Cartao, Investidor } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface CartaoTableProps {
  cartoes: Cartao[];
  investidores: Investidor[];
  onEdit: (cartao: Cartao) => void;
  onDelete: (id: string) => void;
}

const CartaoTable = ({ cartoes, investidores, onEdit, onDelete }: CartaoTableProps) => {
  const getInvestidorNome = (investidorId: string) => {
    const investidor = investidores.find(inv => inv.id === investidorId);
    return investidor?.nome || 'Investidor não encontrado';
  };

  const formatLimit = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const getBandeiraColor = (bandeira: string) => {
    switch (bandeira) {
      case 'Visa': return 'text-blue-600 bg-blue-100';
      case 'Mastercard': return 'text-orange-600 bg-orange-100';
      case 'Elo': return 'text-purple-600 bg-purple-100';
      case 'American Express': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (cartoes.length === 0) {
    return (
      <div className="text-center py-12">
        <CreditCard className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-500">Nenhum cartão encontrado</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cartão</TableHead>
          <TableHead>Investidor</TableHead>
          <TableHead>Bandeira</TableHead>
          <TableHead className="text-right">Limite</TableHead>
          <TableHead className="text-center">Fechamento</TableHead>
          <TableHead className="text-center">Vencimento</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cartoes.map((cartao) => (
          <TableRow key={cartao.id}>
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
                    {getInvestidorNome(cartao.investidorId).charAt(0).toUpperCase()}
                  </span>
                </div>
                {getInvestidorNome(cartao.investidorId)}
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
        ))}
      </TableBody>
    </Table>
  );
};

export default CartaoTable;
