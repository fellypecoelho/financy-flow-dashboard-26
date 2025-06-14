
import React from 'react';
import { Edit, Trash2, CreditCard } from 'lucide-react';
import { Cartao, Investidor } from '@/types';
import { Card, CardContent } from '@/components/ui/card';

interface CartaoCardProps {
  cartao: Cartao;
  investidores: Investidor[];
  onEdit: (cartao: Cartao) => void;
  onDelete: (id: string) => void;
}

const CartaoCard = ({ cartao, investidores, onEdit, onDelete }: CartaoCardProps) => {
  const getInvestidorNome = (investidorId: string) => {
    const investidor = investidores.find(inv => inv.id === investidorId);
    return investidor?.nome || 'Investidor não encontrado';
  };

  const getBandeiraColor = (bandeira: string) => {
    switch (bandeira) {
      case 'Visa': return 'from-blue-500 to-blue-700';
      case 'Mastercard': return 'from-orange-500 to-red-600';
      case 'Elo': return 'from-purple-500 to-purple-700';
      case 'American Express': return 'from-green-500 to-green-700';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  const formatCardNumber = () => {
    const lastFourDigits = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    return `•••• •••• •••• ${lastFourDigits}`;
  };

  const limiteUtilizado = Math.random() * cartao.limite; // Simulação
  const percentualUtilizado = (limiteUtilizado / cartao.limite) * 100;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* Card visual do cartão */}
        <div className={`bg-gradient-to-br ${getBandeiraColor(cartao.bandeira)} p-6 text-white relative`}>
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="font-bold text-lg">{cartao.nome}</h3>
              <p className="text-sm opacity-80">{cartao.bandeira}</p>
            </div>
            <CreditCard className="h-8 w-8 opacity-80" />
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs opacity-60">Número do Cartão</p>
              <p className="font-mono text-lg tracking-wider">{formatCardNumber()}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-xs opacity-60">Limite</p>
                <p className="font-semibold">
                  {cartao.limite.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>
              <div>
                <p className="text-xs opacity-60">Disponível</p>
                <p className="font-semibold">
                  {(cartao.limite - limiteUtilizado).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>
              <div>
                <p className="text-xs opacity-60">Fatura</p>
                <p className="font-semibold">{cartao.diaVencimento}/12</p>
              </div>
            </div>

            {/* Barra de progresso do limite */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Limite Utilizado</span>
                <span>{Math.round(percentualUtilizado)}%</span>
              </div>
              <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{ width: `${percentualUtilizado}%` }}
                ></div>
              </div>
              <p className="text-xs mt-1 opacity-80">
                {Math.round(percentualUtilizado)}% utilizado
              </p>
            </div>
          </div>
        </div>

        {/* Informações adicionais */}
        <div className="p-4 bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">
                  {getInvestidorNome(cartao.investidorId).charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-sm text-gray-600">{getInvestidorNome(cartao.investidorId)}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onEdit(cartao)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(cartao.id)}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Fechamento:</span>
              <span className="ml-2 bg-gray-200 px-2 py-1 rounded text-xs">
                Dia {cartao.diaFechamento}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Vencimento:</span>
              <span className="ml-2 bg-red-100 text-red-600 px-2 py-1 rounded text-xs">
                Dia {cartao.diaVencimento}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartaoCard;
