
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Cartao, Investidor } from '@/types';
import { BANDEIRAS, BandeiraType } from '@/constants/cartaoConstants';

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
    bandeira: BANDEIRAS.VISA as BandeiraType,
    limite: '',
    diaFechamento: '1',
    diaVencimento: '1',
    investidorId: ''
  });

  useEffect(() => {
    if (cartao) {
      setFormData({
        nome: cartao.nome,
        bandeira: cartao.bandeira as BandeiraType,
        limite: cartao.limite.toString(),
        diaFechamento: cartao.diaFechamento.toString(),
        diaVencimento: cartao.diaVencimento.toString(),
        investidorId: cartao.investidorId
      });
    } else {
      setFormData({
        nome: '',
        bandeira: BANDEIRAS.VISA,
        limite: '',
        diaFechamento: '1',
        diaVencimento: '1',
        investidorId: ''
      });
    }
  }, [cartao, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cartaoData = {
      nome: formData.nome,
      bandeira: formData.bandeira,
      limite: parseFloat(formData.limite),
      diaFechamento: parseInt(formData.diaFechamento),
      diaVencimento: parseInt(formData.diaVencimento),
      investidorId: formData.investidorId
    };

    onSave(cartaoData);
    onClose();
  };

  const handleBandeiraChange = (value: string) => {
    setFormData({...formData, bandeira: value as BandeiraType});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto border">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-foreground">
            {cartao ? 'Editar Cartão' : 'Novo Cartão'}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Nome do Cartão</label>
            <input
              type="text"
              required
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
              placeholder="Ex: Cartão Principal"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Bandeira</label>
            <select
              value={formData.bandeira}
              onChange={(e) => handleBandeiraChange(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
            >
              <option value={BANDEIRAS.VISA}>{BANDEIRAS.VISA}</option>
              <option value={BANDEIRAS.MASTERCARD}>{BANDEIRAS.MASTERCARD}</option>
              <option value={BANDEIRAS.AMERICAN_EXPRESS}>{BANDEIRAS.AMERICAN_EXPRESS}</option>
              <option value={BANDEIRAS.ELO}>{BANDEIRAS.ELO}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Limite</label>
            <input
              type="number"
              step="0.01"
              min="0"
              required
              value={formData.limite}
              onChange={(e) => setFormData({...formData, limite: e.target.value})}
              className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
              placeholder="0,00"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Dia Fechamento</label>
              <select
                value={formData.diaFechamento}
                onChange={(e) => setFormData({...formData, diaFechamento: e.target.value})}
                className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                required
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <option key={day} value={day.toString()}>Dia {day}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Dia Vencimento</label>
              <select
                value={formData.diaVencimento}
                onChange={(e) => setFormData({...formData, diaVencimento: e.target.value})}
                className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                required
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <option key={day} value={day.toString()}>Dia {day}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Investidor</label>
            <select
              required
              value={formData.investidorId}
              onChange={(e) => setFormData({...formData, investidorId: e.target.value})}
              className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
            >
              <option value="">Selecione um investidor</option>
              {investidores.filter(inv => inv.ativo).map(investidor => (
                <option key={investidor.id} value={investidor.id}>{investidor.nome}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-muted-foreground border border-input rounded-lg hover:bg-accent hover:text-accent-foreground"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
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
