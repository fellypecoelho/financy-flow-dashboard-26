
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Aporte, Investidor } from '@/types';

interface AporteModalProps {
  aporte: Aporte | null;
  investidores: Investidor[];
  onSave: (aporte: Aporte) => void;
  onClose: () => void;
}

const AporteModal = ({ aporte, investidores, onSave, onClose }: AporteModalProps) => {
  const [formData, setFormData] = useState({
    investidorId: '',
    valor: '',
    data: new Date().toISOString().split('T')[0],
    descricao: ''
  });

  useEffect(() => {
    if (aporte) {
      setFormData({
        investidorId: aporte.investidorId,
        valor: aporte.valor.toString(),
        data: aporte.data,
        descricao: aporte.descricao
      });
    }
  }, [aporte]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const aporteData: Aporte = {
      id: aporte?.id || '',
      investidorId: formData.investidorId,
      valor: parseFloat(formData.valor),
      data: formData.data,
      descricao: formData.descricao
    };

    onSave(aporteData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {aporte ? 'Editar Aporte' : 'Novo Aporte'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Investidor</label>
            <select
              required
              value={formData.investidorId}
              onChange={(e) => setFormData({...formData, investidorId: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Selecione um investidor</option>
              {investidores.filter(inv => inv.ativo).map(investidor => (
                <option key={investidor.id} value={investidor.id}>{investidor.nome}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
            <input
              type="number"
              step="0.01"
              min="0"
              required
              value={formData.valor}
              onChange={(e) => setFormData({...formData, valor: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="0,00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
            <input
              type="date"
              required
              value={formData.data}
              onChange={(e) => setFormData({...formData, data: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea
              required
              rows={3}
              value={formData.descricao}
              onChange={(e) => setFormData({...formData, descricao: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              placeholder="Descreva o aporte..."
            />
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
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              {aporte ? 'Atualizar' : 'Criar'} Aporte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AporteModal;
