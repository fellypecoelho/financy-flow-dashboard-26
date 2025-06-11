import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import ExpenseManagement from '@/components/ExpenseManagement';
import AporteManagement from '@/components/AporteManagement';
import CartaoManagement from '@/components/CartaoManagement';
import CalendarioFinanceiro from '@/components/CalendarioFinanceiro';
import RelatoriosFinanceiros from '@/components/RelatoriosFinanceiros';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'despesas':
        return <ExpenseManagement />;
      case 'aportes':
        return <AporteManagement />;
      case 'cartoes':
        return <CartaoManagement />;
      case 'calendario':
        return <CalendarioFinanceiro />;
      case 'relatorios':
        return <RelatoriosFinanceiros />;
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
