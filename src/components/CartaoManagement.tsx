
import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useFinancialData } from '@/hooks/useFinancialData';
import { Cartao } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CartaoFilters from './cartoes/CartaoFilters';
import CartaoTable from './cartoes/CartaoTable';
import CartaoModal from './cartoes/CartaoModal';

const CartaoManagement = () => {
  const { cartoes, investidores, setCartoes } = useFinancialData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    investidor: '',
    bandeira: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCartao, setEditingCartao] = useState<Cartao | null>(null);

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Cartões</h1>
          <p className="text-gray-500 mt-1">Gerencie os cartões de crédito dos investidores</p>
        </div>
        <Button onClick={handleAddCartao} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Cartão
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <div className="w-6 h-6 bg-blue-600 rounded"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total de Cartões</p>
              <p className="text-2xl font-bold text-gray-900">{cartoes.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <div className="w-6 h-6 bg-green-600 rounded"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Limite Total</p>
              <p className="text-2xl font-bold text-gray-900">
                {cartoes.reduce((acc, cartao) => acc + cartao.limite, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <div className="w-6 h-6 bg-purple-600 rounded"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Cartões Visa</p>
              <p className="text-2xl font-bold text-gray-900">
                {cartoes.filter(c => c.bandeira === 'Visa').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <div className="w-6 h-6 bg-orange-600 rounded"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Cartões Mastercard</p>
              <p className="text-2xl font-bold text-gray-900">
                {cartoes.filter(c => c.bandeira === 'Mastercard').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <CartaoTable 
          cartoes={filteredCartoes}
          investidores={investidores}
          onEdit={handleEditCartao}
          onDelete={handleDeleteCartao}
        />
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
