
import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, TrendingUp } from 'lucide-react';
import { useFinancialData } from '@/hooks/useFinancialData';
import { Aporte } from '@/types';
import AporteModal from './aportes/AporteModal';
import AporteFilters from './aportes/AporteFilters';
import AporteTable from './aportes/AporteTable';

const AporteManagement = () => {
  const { aportes, investidores, setAportes } = useFinancialData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAporte, setSelectedAporte] = useState<Aporte | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    investidor: '',
    dataInicio: '',
    dataFim: ''
  });

  const handleAddAporte = () => {
    setSelectedAporte(null);
    setIsModalOpen(true);
  };

  const handleEditAporte = (aporte: Aporte) => {
    setSelectedAporte(aporte);
    setIsModalOpen(true);
  };

  const handleDeleteAporte = (id: string) => {
    setAportes(aportes.filter(a => a.id !== id));
  };

  const handleSaveAporte = (aporte: Aporte) => {
    if (selectedAporte) {
      setAportes(aportes.map(a => a.id === aporte.id ? aporte : a));
    } else {
      setAportes([...aportes, { ...aporte, id: Date.now().toString() }]);
    }
    setIsModalOpen(false);
  };

  const filteredAportes = aportes.filter(aporte => {
    const investidor = investidores.find(inv => inv.id === aporte.investidorId);
    const matchesSearch = aporte.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investidor?.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesInvestidor = !filters.investidor || aporte.investidorId === filters.investidor;
    const matchesDataInicio = !filters.dataInicio || aporte.data >= filters.dataInicio;
    const matchesDataFim = !filters.dataFim || aporte.data <= filters.dataFim;

    return matchesSearch && matchesInvestidor && matchesDataInicio && matchesDataFim;
  });

  const totalAportes = filteredAportes.reduce((acc, aporte) => acc + aporte.valor, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Aportes</h1>
          <p className="text-gray-500 mt-1">Controle todos os aportes dos investidores</p>
        </div>
        <button
          onClick={handleAddAporte}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Novo Aporte
        </button>
      </div>

      {/* Stats Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Total de Aportes</h3>
            </div>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {totalAportes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Quantidade de aportes</p>
            <p className="text-2xl font-bold text-gray-900">{filteredAportes.length}</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar por descrição ou investidor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5 mr-2" />
            Filtros
          </button>
        </div>
        
        <AporteFilters 
          filters={filters}
          onFiltersChange={setFilters}
          investidores={investidores}
        />
      </div>

      {/* Aportes Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <AporteTable
          aportes={filteredAportes}
          investidores={investidores}
          onEdit={handleEditAporte}
          onDelete={handleDeleteAporte}
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <AporteModal
          aporte={selectedAporte}
          investidores={investidores}
          onSave={handleSaveAporte}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AporteManagement;
