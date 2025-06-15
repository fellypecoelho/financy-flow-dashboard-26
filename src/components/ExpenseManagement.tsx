
import React, { useState } from 'react';
import { useFinancialData } from '@/hooks/useFinancialData';
import { useCategorias } from '@/hooks/useCategorias';
import { useExpenseFilters } from '@/hooks/useExpenseFilters';
import { Despesa } from '@/types';
import ExpenseModal from './expenses/ExpenseModal';
import CategoryModal from './expenses/CategoryModal';
import ExpenseHeader from './expenses/ExpenseHeader';
import ExpenseSearchBar from './expenses/ExpenseSearchBar';
import ExpenseTableContainer from './expenses/ExpenseTableContainer';

const ExpenseManagement = () => {
  const { despesas, cartoes, investidores, setDespesas } = useFinancialData();
  const { categorias } = useCategorias();
  const { searchTerm, setSearchTerm, filters, setFilters, filteredExpenses } = useExpenseFilters(despesas);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Despesa | null>(null);

  const handleAddExpense = () => {
    setSelectedExpense(null);
    setIsModalOpen(true);
  };

  const handleEditExpense = (expense: Despesa) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const handleDeleteExpense = (id: string) => {
    setDespesas(despesas.filter(d => d.id !== id));
  };

  const handleSaveExpense = (expense: Despesa) => {
    if (selectedExpense) {
      setDespesas(despesas.map(d => d.id === expense.id ? expense : d));
    } else {
      setDespesas([...despesas, { ...expense, id: Date.now().toString() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <ExpenseHeader 
        onAddExpense={handleAddExpense}
        onManageCategories={() => setIsCategoryModalOpen(true)}
      />

      <ExpenseSearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onFiltersChange={setFilters}
        categorias={categorias}
      />

      <ExpenseTableContainer
        expenses={filteredExpenses}
        categorias={categorias}
        cartoes={cartoes}
        onEdit={handleEditExpense}
        onDelete={handleDeleteExpense}
      />

      {/* Expense Modal */}
      {isModalOpen && (
        <ExpenseModal
          expense={selectedExpense}
          categorias={categorias}
          cartoes={cartoes}
          investidores={investidores}
          onSave={handleSaveExpense}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Category Modal */}
      {isCategoryModalOpen && (
        <CategoryModal
          categorias={categorias}
          onSave={() => {}} // Será implementado quando migrarmos categorias completamente
          onClose={() => setIsCategoryModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ExpenseManagement;
