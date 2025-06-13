
import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Users, TrendingUp, DollarSign } from 'lucide-react';
import { useFinancialData } from '@/hooks/useFinancialData';
import { Investidor } from '@/types';
import InvestidorModal from './investidores/InvestidorModal';
import InvestidorTable from './investidores/InvestidorTable';
import InvestidorStats from './investidores/InvestidorStats';

const InvestidorManagement = () => {
  const { investidores, aportes, setInvestidores } = useFinancialData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvestidor, setSelectedInvestidor] = useState<Investidor | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddInvestidor = () => {
    setSelectedInvestidor(null);
    setIsModalOpen(true);
  };

  const handleEditInvestidor = (investidor: Investidor) => {
    setSelectedInvestidor(investidor);
    setIsModalOpen(true);
  };

  const handleDeleteInvestidor = (id: string) => {
    setInvestidores(investidores.filter(inv => inv.id !== id));
  };

  const handleSaveInvestidor = (investidor: Investidor) => {
    if (selectedInvestidor) {
      setInvestidores(investidores.map(inv => inv.id === investidor.id ? investidor : inv));
    } else {
      setInvestidores([...investidores, { ...investidor, id: Date.now().toString() }]);
    }
    setIsModalOpen(false);
  };

  const filteredInvestidores = investidores.filter(investidor =>
    investidor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    investidor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular estatísticas dos investidores
  const calcularEstatisticas = () => {
    const totalInvestidores = investidores.length;
    const investidoresAtivos = investidores.filter(inv => inv.ativo).length;
    const totalAportes = aportes.reduce((acc, aporte) => acc + aporte.valor, 0);
    const saldoTotal = investidores.reduce((acc, inv) => acc + inv.saldoAtual, 0);

    return {
      totalInvestidores,
      investidoresAtivos,
      totalAportes,
      saldoTotal
    };
  };

  const stats = calcularEstatisticas();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Investidores</h1>
          <p className="text-gray-500 mt-1">Controle todos os investidores e seus aportes</p>
        </div>
        <button
          onClick={handleAddInvestidor}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Novo Investidor
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total de Investidores</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalInvestidores}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Investidores Ativos</p>
              <p className="text-2xl font-bold text-green-600">{stats.investidoresAtivos}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total de Aportes</p>
              <p className="text-2xl font-bold text-purple-600">
                {stats.totalAportes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Saldo Total</p>
              <p className="text-2xl font-bold text-orange-600">
                {stats.saldoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Estatísticas detalhadas */}
      <InvestidorStats investidores={investidores} aportes={aportes} />

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Investidores Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <InvestidorTable
          investidores={filteredInvestidores}
          aportes={aportes}
          onEdit={handleEditInvestidor}
          onDelete={handleDeleteInvestidor}
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <InvestidorModal
          investidor={selectedInvestidor}
          onSave={handleSaveInvestidor}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default InvestidorManagement;
