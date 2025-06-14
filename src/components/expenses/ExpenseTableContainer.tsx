
import React from 'react';
import { Despesa, Categoria, Cartao } from '@/types';
import ExpenseTable from './ExpenseTable';

interface ExpenseTableContainerProps {
  expenses: Despesa[];
  categorias: Categoria[];
  cartoes: Cartao[];
  onEdit: (expense: Despesa) => void;
  onDelete: (id: string) => void;
}

const ExpenseTableContainer = ({ 
  expenses, 
  categorias, 
  cartoes, 
  onEdit, 
  onDelete 
}: ExpenseTableContainerProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <ExpenseTable
        expenses={expenses}
        categorias={categorias}
        cartoes={cartoes}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};

export default ExpenseTableContainer;
