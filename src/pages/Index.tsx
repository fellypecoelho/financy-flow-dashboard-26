import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import LancamentoManagement from '@/components/LancamentoManagement';
import MetasFinanceiras from '@/components/MetasFinanceiras';
import RelatoriosFinanceiros from '@/components/RelatoriosFinanceiros';
import { UserManagement } from '@/components/UserManagement';
import Configuracoes from '@/components/Configuracoes';

const Index = () => {
  const { loading, isAdmin } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (loading) {
    return <div>Carregando...</div>;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'lancamentos':
        return <LancamentoManagement />;
      case 'metas':
        return <MetasFinanceiras />;
      case 'relatorios':
        return <RelatoriosFinanceiros />;
      case 'usuarios':
        return isAdmin ? <UserManagement /> : <Dashboard />;
      case 'configuracoes':
        return <Configuracoes />;
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
