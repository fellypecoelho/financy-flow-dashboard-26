
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Investidor } from '@/types';

interface InvestidorModalProps {
  investidor: Investidor | null;
  onSave: (investidor: Investidor) => void;
  onClose: () => void;
}

const InvestidorModal = ({ investidor, onSave, onClose }: InvestidorModalProps) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    ativo: true,
    saldoAtual: ''
  });

  useEffect(() => {
    if (investidor) {
      setFormData({
        nome: investidor.nome,
        email: investidor.email,
        ativo: investidor.ativo,
        saldoAtual: investidor.saldo_atual.toString()
      });
    }
  }, [investidor]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const investidorData: Investidor = {
      id: investidor?.id || '',
      nome: formData.nome,
      email: formData.email,
      ativo: formData.ativo,
      saldo_atual: parseFloat(formData.saldoAtual) || 0
    };

    onSave(investidorData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {investidor ? 'Editar Investidor' : 'Novo Investidor'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input
              type="text"
              required
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nome completo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="email@exemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Saldo Atual</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.saldoAtual}
              onChange={(e) => setFormData({...formData, saldoAtual: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0,00"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="ativo"
              checked={formData.ativo}
              onChange={(e) => setFormData({...formData, ativo: e.target.checked})}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="ativo" className="ml-2 block text-sm text-gray-900">
              Investidor ativo
            </label>
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
              {investidor ? 'Atualizar' : 'Criar'} Investidor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvestidorModal;
