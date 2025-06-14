
import React, { useState } from 'react';
import { useFinancialData } from '@/hooks/useFinancialData';
import { Cartao } from '@/types';
import { Card } from '@/components/ui/card';
import CartaoHeader from './cartoes/CartaoHeader';
import CartaoStats from './cartoes/CartaoStats';
import CartaoSearch from './cartoes/CartaoSearch';
import CartaoTable from './cartoes/CartaoTable';
import CartaoModal from './cartoes/CartaoModal';
import CartaoCard from './cartoes/CartaoCard';
import CartaoTransactions from './cartoes/CartaoTransactions';

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

  return (
    <div className="space-y-6">
      <CartaoHeader onAddCartao={handleAddCartao} />

      <CartaoStats cartoes={cartoes} despesas={despesas} />

      <CartaoSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onFiltersChange={setFilters}
        investidores={investidores}
      />

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

      <CartaoTransactions cartoes={cartoes} despesas={despesas} />

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
