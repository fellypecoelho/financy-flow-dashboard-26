
import React from 'react';
import { Plus, Settings } from 'lucide-react';

interface ExpenseHeaderProps {
  onAddExpense: () => void;
  onManageCategories: () => void;
}

const ExpenseHeader = ({ onAddExpense, onManageCategories }: ExpenseHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Despesas</h1>
        <p className="text-gray-500 mt-1">Controle todas as suas despesas</p>
      </div>
      <div className="flex space-x-3">
        <button
          onClick={onManageCategories}
          className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Settings className="h-5 w-5 mr-2" />
          Gerenciar Categorias
        </button>
        <button
          onClick={onAddExpense}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nova Despesa
        </button>
      </div>
    </div>
  );
};

export default ExpenseHeader;
