
import React from 'react';
import { Table, TableBody } from '@/components/ui/table';
import { CartaoTableProps } from '@/types/cartao';
import CartaoTableHeader from './table/CartaoTableHeader';
import CartaoTableRow from './table/CartaoTableRow';
import CartaoTableEmpty from './table/CartaoTableEmpty';

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
