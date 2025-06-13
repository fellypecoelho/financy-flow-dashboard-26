
import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, Settings } from 'lucide-react';
import { useFinancialData } from '@/hooks/useFinancialData';
import { Despesa, TipoDespesa, StatusDespesa, FormaPagamento } from '@/types';
import ExpenseModal from './expenses/ExpenseModal';
import ExpenseFilters from './expenses/ExpenseFilters';
import ExpenseTable from './expenses/ExpenseTable';
import CategoryModal from './expenses/CategoryModal';

const ExpenseManagement = () => {
  const { despesas, categorias, cartoes, investidores, setDespesas, setCategorias } = useFinancialData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Despesa | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    categoria: '',
    status: '' as StatusDespesa | '',
    tipo: '' as TipoDespesa | '',
    dataInicio: '',
    dataFim: ''
  });

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

  const filteredExpenses = despesas.filter(expense => {
    const matchesSearch = expense.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.origem.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoria = !filters.categoria || expense.categoriaId === filters.categoria;
    const matchesStatus = !filters.status || expense.status === filters.status;
    const matchesTipo = !filters.tipo || expense.tipo === filters.tipo;
    const matchesDataInicio = !filters.dataInicio || expense.dataVencimento >= filters.dataInicio;
    const matchesDataFim = !filters.dataFim || expense.dataVencimento <= filters.dataFim;

    return matchesSearch && matchesCategoria && matchesStatus && matchesTipo && 
           matchesDataInicio && matchesDataFim;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Despesas</h1>
          <p className="text-gray-500 mt-1">Controle todas as suas despesas</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsCategoryModalOpen(true)}
            className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Settings className="h-5 w-5 mr-2" />
            Gerenciar Categorias
          </button>
          <button
            onClick={handleAddExpense}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nova Despesa
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar por descrição ou origem..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5 mr-2" />
            Filtros
          </button>
        </div>
        
        <ExpenseFilters 
          filters={filters}
          onFiltersChange={setFilters}
          categorias={categorias}
        />
      </div>

      {/* Expenses Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <ExpenseTable
          expenses={filteredExpenses}
          categorias={categorias}
          cartoes={cartoes}
          onEdit={handleEditExpense}
          onDelete={handleDeleteExpense}
        />
      </div>

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
          onSave={setCategorias}
          onClose={() => setIsCategoryModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ExpenseManagement;
