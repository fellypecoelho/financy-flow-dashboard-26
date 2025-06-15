
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import ExpenseManagement from '@/components/ExpenseManagement';
import AporteManagement from '@/components/AporteManagement';
import InvestidorManagement from '@/components/InvestidorManagement';
import CartaoManagement from '@/components/CartaoManagement';
import CalendarioFinanceiro from '@/components/CalendarioFinanceiro';
import RelatoriosFinanceiros from '@/components/RelatoriosFinanceiros';
import Configuracoes from '@/components/Configuracoes';
import UserManagement from '@/components/users/UserManagement';

const Index = () => {
  const { loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (loading) {
    return <div>Carregando...</div>;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'despesas':
        return <ExpenseManagement />;
      case 'aportes':
        return <AporteManagement />;
      case 'investidores':
        return <InvestidorManagement />;
      case 'cartoes':
        return <CartaoManagement />;
      case 'calendario':
        return <CalendarioFinanceiro />;
      case 'relatorios':
        return <RelatoriosFinanceiros />;
      case 'configuracoes':
        return <Configuracoes />;
      case 'usuarios':
        return <UserManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderCurrentPage()}
    </Layout>
  );
};

export default Index;
