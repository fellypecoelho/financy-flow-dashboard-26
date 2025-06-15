
import React, { memo } from 'react';
import { CreditCard } from 'lucide-react';
import { CartaoVisualProps } from '@/types/cartao';
import { getBandeiraGradient, formatLimit } from '@/utils/cartaoUtils';

const CartaoVisual: React.FC<CartaoVisualProps> = memo(({ cartao, limiteUtilizado, percentualUtilizado }) => {
  const limiteDisponivel = cartao.limite - limiteUtilizado;
  
  // Função para formatar número do cartão (mock)
  const formatCardNumber = () => {
    return "**** **** **** 1234";
  };
  
  return (
    <div className={`bg-gradient-to-br ${getBandeiraGradient(cartao.bandeira)} p-6 text-white relative overflow-hidden`}>
      {/* Pattern de fundo sutil */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="relative z-10">
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
              <p className="font-semibold">{formatLimit(cartao.limite)}</p>
            </div>
            <div>
              <p className="text-xs opacity-60">Disponível</p>
              <p className="font-semibold">{formatLimit(limiteDisponivel)}</p>
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
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  percentualUtilizado > 80 ? 'bg-red-400' :
                  percentualUtilizado > 60 ? 'bg-yellow-400' : 'bg-white'
                }`}
                style={{ width: `${Math.min(percentualUtilizado, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs mt-1 opacity-80">
              {Math.round(percentualUtilizado)}% utilizado
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

CartaoVisual.displayName = 'CartaoVisual';

export default CartaoVisual;
