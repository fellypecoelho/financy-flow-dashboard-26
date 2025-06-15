
import React, { useState } from 'react';
import { Plus, Search, Filter, TrendingUp } from 'lucide-react';
import { useFinancialData } from '@/hooks/useFinancialData';
import { Aporte } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
          <h1 className="text-3xl font-bold text-foreground">Gerenciamento de Aportes</h1>
          <p className="text-muted-foreground mt-1">Controle todos os aportes dos investidores</p>
        </div>
        <Button onClick={handleAddAporte} className="flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Novo Aporte
        </Button>
      </div>

      {/* Stats Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-foreground">Total de Aportes</h3>
              </div>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {totalAportes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Quantidade de aportes</p>
              <p className="text-2xl font-bold text-foreground">{filteredAportes.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Buscar por descrição ou investidor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filtros
            </Button>
          </div>
          
          <AporteFilters 
            filters={filters}
            onFiltersChange={setFilters}
            investidores={investidores}
          />
        </CardContent>
      </Card>

      {/* Aportes Table */}
      <Card>
        <AporteTable
          aportes={filteredAportes}
          investidores={investidores}
          onEdit={handleEditAporte}
          onDelete={handleDeleteAporte}
        />
      </Card>

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
