
import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const CartaoTableHeader = () => {
  return (
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
  );
};

export default CartaoTableHeader;
