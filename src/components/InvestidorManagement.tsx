
import React, { useState } from 'react';
import { Plus, Search, Users, TrendingUp, DollarSign } from 'lucide-react';
import { useFinancialData } from '@/hooks/useFinancialData';
import { Investidor } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
          <h1 className="text-3xl font-bold text-foreground">Gerenciamento de Investidores</h1>
          <p className="text-muted-foreground mt-1">Controle todos os investidores e seus aportes</p>
        </div>
        <Button onClick={handleAddInvestidor} className="flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Novo Investidor
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Investidores</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalInvestidores}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Investidores Ativos</p>
                <p className="text-2xl font-bold text-green-600">{stats.investidoresAtivos}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Aportes</p>
                <p className="text-2xl font-bold text-purple-600">
                  {stats.totalAportes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Saldo Total</p>
                <p className="text-2xl font-bold text-orange-600">
                  {stats.saldoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estatísticas detalhadas */}
      <InvestidorStats investidores={investidores} aportes={aportes} />

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Investidores Table */}
      <Card>
        <InvestidorTable
          investidores={filteredInvestidores}
          aportes={aportes}
          onEdit={handleEditInvestidor}
          onDelete={handleDeleteInvestidor}
        />
      </Card>

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
