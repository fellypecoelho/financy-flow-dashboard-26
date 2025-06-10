
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Cartao, Investidor } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CartaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cartao: Omit<Cartao, 'id'>) => void;
  cartao: Cartao | null;
  investidores: Investidor[];
}

const CartaoModal = ({ isOpen, onClose, onSave, cartao, investidores }: CartaoModalProps) => {
  const [formData, setFormData] = useState({
    nome: '',
    bandeira: 'Visa',
    limite: 0,
    diaFechamento: 1,
    diaVencimento: 1,
    investidorId: ''
  });

  useEffect(() => {
    if (cartao) {
      setFormData({
        nome: cartao.nome,
        bandeira: cartao.bandeira,
        limite: cartao.limite,
        diaFechamento: cartao.diaFechamento,
        diaVencimento: cartao.diaVencimento,
        investidorId: cartao.investidorId
      });
    } else {
      setFormData({
        nome: '',
        bandeira: 'Visa',
        limite: 0,
        diaFechamento: 1,
        diaVencimento: 1,
        investidorId: investidores.length > 0 ? investidores[0].id : ''
      });
    }
  }, [cartao, investidores, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const bandeiras = ['Visa', 'Mastercard', 'Elo', 'American Express'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {cartao ? 'Editar Cartão' : 'Novo Cartão'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label htmlFor="nome">Nome do Cartão</Label>
            <Input
              id="nome"
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Ex: Nubank Roxinho"
              required
            />
          </div>

          <div>
            <Label htmlFor="investidorId">Investidor</Label>
            <select
              id="investidorId"
              value={formData.investidorId}
              onChange={(e) => setFormData({ ...formData, investidorId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              {investidores.map(investidor => (
                <option key={investidor.id} value={investidor.id}>
                  {investidor.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="bandeira">Bandeira</Label>
            <select
              id="bandeira"
              value={formData.bandeira}
              onChange={(e) => setFormData({ ...formData, bandeira: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              {bandeiras.map(bandeira => (
                <option key={bandeira} value={bandeira}>
                  {bandeira}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="limite">Limite (R$)</Label>
            <Input
              id="limite"
              type="number"
              value={formData.limite}
              onChange={(e) => setFormData({ ...formData, limite: Number(e.target.value) })}
              placeholder="0,00"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="diaFechamento">Dia Fechamento</Label>
              <select
                id="diaFechamento"
                value={formData.diaFechamento}
                onChange={(e) => setFormData({ ...formData, diaFechamento: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <option key={day} value={day}>Dia {day}</option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="diaVencimento">Dia Vencimento</Label>
              <select
                id="diaVencimento"
                value={formData.diaVencimento}
                onChange={(e) => setFormData({ ...formData, diaVencimento: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <option key={day} value={day}>Dia {day}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              {cartao ? 'Atualizar' : 'Salvar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CartaoModal;
