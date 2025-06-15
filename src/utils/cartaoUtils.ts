
import { formatCurrency, formatCardNumber } from './formatUtils';
import { 
  BANDEIRAS, 
  BANDEIRA_COLORS, 
  BANDEIRA_GRADIENTS, 
  DEFAULT_COLORS 
} from '@/constants/cartaoConstants';

export const getBandeiraColor = (bandeira: string) => {
  return BANDEIRA_COLORS[bandeira as keyof typeof BANDEIRA_COLORS] || DEFAULT_COLORS.COLOR;
};

export const getBandeiraGradient = (bandeira: string) => {
  return BANDEIRA_GRADIENTS[bandeira as keyof typeof BANDEIRA_GRADIENTS] || DEFAULT_COLORS.GRADIENT;
};

export { formatCardNumber };

export const formatLimit = formatCurrency;

export const calculateLimiteUtilizado = (cartaoId: string, despesas: any[]) => {
  return despesas
    .filter(d => d.formaPagamento === 'cartao' && d.cartaoId === cartaoId)
    .reduce((acc, despesa) => acc + despesa.valor, 0);
};

export const calculatePercentualUtilizado = (utilizado: number, limite: number) => {
  return limite > 0 ? (utilizado / limite) * 100 : 0;
};
