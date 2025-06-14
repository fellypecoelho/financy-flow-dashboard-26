
import React from 'react';
import { Cartao, Investidor } from '@/types';
import { Table, TableBody } from '@/components/ui/table';
import CartaoTableHeader from './table/CartaoTableHeader';
import CartaoTableRow from './table/CartaoTableRow';
import CartaoTableEmpty from './table/CartaoTableEmpty';

interface CartaoTableProps {
  cartoes: Cartao[];
  investidores: Investidor[];
  onEdit: (cartao: Cartao) => void;
  onDelete: (id: string) => void;
}

const CartaoTable = ({ cartoes, investidores, onEdit, onDelete }: CartaoTableProps) => {
  if (cartoes.length === 0) {
    return <CartaoTableEmpty />;
  }

  return (
    <Table>
      <CartaoTableHeader />
      <TableBody>
        {cartoes.map((cartao) => (
          <CartaoTableRow
            key={cartao.id}
            cartao={cartao}
            investidores={investidores}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default CartaoTable;
