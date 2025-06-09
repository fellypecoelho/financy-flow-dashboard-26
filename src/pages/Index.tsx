
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import ExpenseManagement from '@/components/ExpenseManagement';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'despesas':
        return <ExpenseManagement />;
      case 'aportes':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Gerenciamento de Aportes</h2>
            <p className="text-gray-500">Em desenvolvimento...</p>
          </div>
        );
      case 'cartoes':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Gerenciamento de Cartões</h2>
            <p className="text-gray-500">Em desenvolvimento...</p>
          </div>
        );
      case 'calendario':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Calendário Financeiro</h2>
            <p className="text-gray-500">Em desenvolvimento...</p>
          </div>
        );
      case 'relatorios':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Relatórios</h2>
            <p className="text-gray-500">Em desenvolvimento...</p>
          </div>
        );
      case 'configuracoes':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Configurações</h2>
            <p className="text-gray-500">Em desenvolvimento...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

export default Index;
