
import React, { memo } from 'react';
import { CreditCard } from 'lucide-react';
import { CartaoVisualProps } from '@/types/cartao';
import { BANDEIRA_CSS_GRADIENTS, USAGE_THRESHOLDS, USAGE_CLASSES, DEFAULT_COLORS } from '@/constants/cartaoConstants';
import { formatLimit } from '@/utils/cartaoUtils';

const CartaoVisual: React.FC<CartaoVisualProps> = memo(({ cartao, limiteUtilizado, percentualUtilizado }) => {
  const limiteDisponivel = cartao.limite - limiteUtilizado;
  
  // Função para formatar número do cartão (mock)
  const formatCardNumber = () => {
    return "**** **** **** 1234";
  };

  // Função para obter gradiente baseado na bandeira
  const getGradientClass = (bandeira: string) => {
    return BANDEIRA_CSS_GRADIENTS[bandeira as keyof typeof BANDEIRA_CSS_GRADIENTS] || DEFAULT_COLORS.GRADIENT;
  };

  // Função para obter classe de cor baseada no percentual de uso
  const getUsageColorClass = (percentual: number) => {
    if (percentual >= USAGE_THRESHOLDS.CRITICAL) return USAGE_CLASSES.CRITICAL;
    if (percentual >= USAGE_THRESHOLDS.HIGH) return USAGE_CLASSES.HIGH;
    if (percentual >= USAGE_THRESHOLDS.MEDIUM) return USAGE_CLASSES.MEDIUM;
    return USAGE_CLASSES.LOW;
  };
  
  return (
    <div className={`${getGradientClass(cartao.bandeira)} p-6 text-white relative overflow-hidden`}>
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
                className={`h-2 rounded-full transition-all duration-300 ${getUsageColorClass(percentualUtilizado)}`}
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
