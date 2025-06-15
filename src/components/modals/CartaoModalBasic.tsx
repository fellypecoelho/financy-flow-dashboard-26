
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Cartao, Investidor } from '@/types';

interface CartaoModalBasicProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cartao: Omit<Cartao, 'id'>) => void;
  cartao: Cartao | null;
  investidores: Investidor[];
}

const CartaoModalBasic = ({ isOpen, onClose, onSave, cartao, investidores }: CartaoModalBasicProps) => {
  const [formData, setFormData] = useState({
    nome: '',
    numero: '',
    bandeira: 'Visa' as const,
    limite: '',
    dataVencimento: '',
    investidorId: ''
  });

  useEffect(() => {
    if (cartao) {
      setFormData({
        nome: cartao.nome,
        numero: cartao.numero,
        bandeira: cartao.bandeira,
        limite: cartao.limite.toString(),
        dataVencimento: cartao.dataVencimento,
        investidorId: cartao.investidorId
      });
    } else {
      setFormData({
        nome: '',
        numero: '',
        bandeira: 'Visa',
        limite: '',
        dataVencimento: '',
        investidorId: ''
      });
    }
  }, [cartao, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cartaoData = {
      nome: formData.nome,
      numero: formData.numero,
      bandeira: formData.bandeira,
      limite: parseFloat(formData.limite),
      dataVencimento: formData.dataVencimento,
      investidorId: formData.investidorId
    };

    onSave(cartaoData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {cartao ? 'Editar Cartão' : 'Novo Cartão'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Cartão</label>
            <input
              type="text"
              required
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: Cartão Principal"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Número do Cartão</label>
            <input
              type="text"
              required
              value={formData.numero}
              onChange={(e) => setFormData({...formData, numero: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="**** **** **** 1234"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bandeira</label>
            <select
              value={formData.bandeira}
              onChange={(e) => setFormData({...formData, bandeira: e.target.value as any})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Visa">Visa</option>
              <option value="Mastercard">Mastercard</option>
              <option value="American Express">American Express</option>
              <option value="Elo">Elo</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Limite</label>
            <input
              type="number"
              step="0.01"
              min="0"
              required
              value={formData.limite}
              onChange={(e) => setFormData({...formData, limite: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0,00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data de Vencimento</label>
            <input
              type="date"
              required
              value={formData.dataVencimento}
              onChange={(e) => setFormData({...formData, dataVencimento: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Investidor</label>
            <select
              required
              value={formData.investidorId}
              onChange={(e) => setFormData({...formData, investidorId: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Selecione um investidor</option>
              {investidores.filter(inv => inv.ativo).map(investidor => (
                <option key={investidor.id} value={investidor.id}>{investidor.nome}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {cartao ? 'Atualizar' : 'Criar'} Cartão
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CartaoModalBasic;
