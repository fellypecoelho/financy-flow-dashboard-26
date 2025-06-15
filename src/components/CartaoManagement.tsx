
import React, { useState } from 'react';
import { useFinancialData } from '@/hooks/useFinancialData';
import { useCartaoFilters } from '@/hooks/useCartaoFilters';
import { Cartao } from '@/types';
import { Card } from '@/components/ui/card';
import CartaoHeader from './cartoes/CartaoHeader';
import CartaoStats from './cartoes/CartaoStats';
import CartaoSearch from './cartoes/CartaoSearch';
import CartaoTable from './cartoes/CartaoTable';
import CartaoCard from './cartoes/CartaoCard';
import CartaoTransactions from './cartoes/CartaoTransactions';
import CartaoModalBasic from './modals/CartaoModalBasic';
import ConfirmationModal from './ui/ConfirmationModal';

const CartaoManagement = () => {
  const { cartoes, investidores, setCartoes, despesas } = useFinancialData();
  const { searchTerm, setSearchTerm, filters, setFilters, filteredCartoes } = useCartaoFilters(cartoes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCartao, setEditingCartao] = useState<Cartao | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; cartaoId: string; cartaoNome: string }>({
    isOpen: false,
    cartaoId: '',
    cartaoNome: ''
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
    const cartao = cartoes.find(c => c.id === id);
    if (cartao) {
      setDeleteConfirmation({
        isOpen: true,
        cartaoId: id,
        cartaoNome: cartao.nome
      });
    }
  };

  const confirmDeleteCartao = () => {
    setCartoes(prev => prev.filter(cartao => cartao.id !== deleteConfirmation.cartaoId));
    setDeleteConfirmation({ isOpen: false, cartaoId: '', cartaoNome: '' });
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

      <CartaoModalBasic
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCartao(null);
        }}
        onSave={handleSaveCartao}
        cartao={editingCartao}
        investidores={investidores}
      />

      <ConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        onClose={() => setDeleteConfirmation({ isOpen: false, cartaoId: '', cartaoNome: '' })}
        onConfirm={confirmDeleteCartao}
        title="Excluir Cartão"
        description={`Tem certeza que deseja excluir o cartão "${deleteConfirmation.cartaoNome}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="destructive"
      />
    </div>
  );
};

export default CartaoManagement;
