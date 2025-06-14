import React, { useState } from 'react';
import { Plus, Search, CreditCard, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { useFinancialData } from '@/hooks/useFinancialData';
import { Cartao } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CartaoFilters from './cartoes/CartaoFilters';
import CartaoTable from './cartoes/CartaoTable';
import CartaoModal from './cartoes/CartaoModal';
import CartaoCard from './cartoes/CartaoCard';

const CartaoManagement = () => {
  const { cartoes, investidores, setCartoes, despesas } = useFinancialData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    investidor: '',
    bandeira: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCartao, setEditingCartao] = useState<Cartao | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const filteredCartoes = cartoes.filter(cartao => {
    const matchesSearch = cartao.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cartao.bandeira.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesInvestidor = !filters.investidor || cartao.investidorId === filters.investidor;
    const matchesBandeira = !filters.bandeira || cartao.bandeira === filters.bandeira;
    
    return matchesSearch && matchesInvestidor && matchesBandeira;
  });

  const handleAddCartao = () => {
    setEditingCartao(null);
    setIsModalOpen(true);
  };

  const handleEditCartao = (cartao: Cartao) => {
    setEditingCartao(cartao);
    setIsModalOpen(true);
  };

  const handleDeleteCartao = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este cartão?')) {
      setCartoes(prev => prev.filter(cartao => cartao.id !== id));
    }
  };

  const handleSaveCartao = (cartaoData: Omit<Cartao, 'id'>) => {
    if (editingCartao) {
      setCartoes(prev => prev.map(cartao => 
        cartao.id === editingCartao.id 
          ? { ...cartaoData, id: editingCartao.id }
          : cartao
      ));
    } else {
      const newCartao: Cartao = {
        ...cartaoData,
        id: Date.now().toString()
      };
      setCartoes(prev => [...prev, newCartao]);
    }
    setIsModalOpen(false);
    setEditingCartao(null);
  };

  // Calcular estatísticas
  const limiteTotal = cartoes.reduce((acc, cartao) => acc + cartao.limite, 0);
  const limiteUtilizado = despesas
    .filter(d => d.formaPagamento === 'cartao' && d.cartaoId)
    .reduce((acc, despesa) => acc + despesa.valor, 0);
  
  const proximaFatura = despesas
    .filter(d => d.formaPagamento === 'cartao' && d.status === 'pendente')
    .reduce((acc, despesa) => acc + despesa.valor, 0);

  const cartoesAtivos = cartoes.length;

  // Despesas recentes do cartão
  const despesasCartao = despesas
    .filter(d => d.formaPagamento === 'cartao')
    .slice(0, 5);

  const proximosVencimentos = despesas
    .filter(d => d.formaPagamento === 'cartao' && d.status === 'pendente')
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gerenciamento de Cartões</h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">Controle de cartões de crédito e faturas da empresa</p>
        </div>
        <Button onClick={handleAddCartao} className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Cartão
        </Button>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-500 truncate">Limite Total</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 truncate">
                  {limiteTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
                <p className="text-xs text-gray-500 mt-1 truncate">{cartoesAtivos} cartões ativos</p>
              </div>
              <div className="p-2 lg:p-3 bg-blue-100 rounded-lg flex-shrink-0 ml-2">
                <CreditCard className="h-4 w-4 lg:h-6 lg:w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-500 truncate">Limite Utilizado</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600 truncate">
                  {limiteUtilizado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
                <p className="text-xs text-gray-500 mt-1 truncate">
                  {limiteTotal > 0 ? Math.round((limiteUtilizado / limiteTotal) * 100) : 0}% do limite total
                </p>
              </div>
              <div className="p-2 lg:p-3 bg-orange-100 rounded-lg flex-shrink-0 ml-2">
                <TrendingUp className="h-4 w-4 lg:h-6 lg:w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-500 truncate">Próxima Fatura</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600 truncate">
                  {proximaFatura.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
                <p className="text-xs text-red-600 mt-1 truncate">Vence em 8 dias</p>
              </div>
              <div className="p-2 lg:p-3 bg-red-100 rounded-lg flex-shrink-0 ml-2">
                <AlertTriangle className="h-4 w-4 lg:h-6 lg:w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-500 truncate">Cartões Ativos</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">{cartoesAtivos}</p>
                <p className="text-xs text-green-600 mt-1 truncate">Todos funcionais</p>
              </div>
              <div className="p-2 lg:p-3 bg-green-100 rounded-lg flex-shrink-0 ml-2">
                <CheckCircle className="h-4 w-4 lg:h-6 lg:w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nome do cartão ou bandeira..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <CartaoFilters 
              filters={filters}
              onFiltersChange={setFilters}
              investidores={investidores}
            />
          </div>
        </CardContent>
      </Card>

      {/* Controle de Visualização e Cartões */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Seus Cartões</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Visualização:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  viewMode === 'cards'
                    ? 'bg-white text-gray-900 shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  viewMode === 'table'
                    ? 'bg-white text-gray-900 shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Lista
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCartoes.map((cartao) => (
              <CartaoCard
                key={cartao.id}
                cartao={cartao}
                investidores={investidores}
                onEdit={handleEditCartao}
                onDelete={handleDeleteCartao}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CartaoTable 
              cartoes={filteredCartoes}
              investidores={investidores}
              onEdit={handleEditCartao}
              onDelete={handleDeleteCartao}
            />
          </Card>
        )}
      </div>

      {/* Seção de Transações e Próximas Faturas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Transações Recentes</CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-600">
                Ver Todas
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {despesasCartao.map((despesa) => (
                <div key={despesa.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{despesa.descricao}</p>
                      <p className="text-sm text-gray-500">{despesa.origem}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-red-600">
                    -{despesa.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Próximas Faturas</CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-600">
                Ver Todas
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {proximosVencimentos.map((despesa) => {
                const cartao = cartoes.find(c => c.id === despesa.cartaoId);
                return (
                  <div key={despesa.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-8 bg-red-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-gray-900">{cartao?.nome}</p>
                        <p className="text-sm text-gray-500">
                          Vence em 8 dias • {new Date(despesa.dataVencimento).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold text-red-600">
                      {despesa.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>
                );
              })}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">Total das Próximas Faturas</span>
                  <span className="font-bold text-red-600">
                    {proximaFatura.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal */}
      <CartaoModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCartao(null);
        }}
        onSave={handleSaveCartao}
        cartao={editingCartao}
        investidores={investidores}
      />
    </div>
  );
};

export default CartaoManagement;
