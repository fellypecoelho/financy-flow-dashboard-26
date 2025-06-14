
import { formatCurrency, formatCardNumber } from './formatUtils';

export const getBandeiraColor = (bandeira: string) => {
  switch (bandeira) {
    case 'Visa': return 'text-blue-600 bg-blue-100';
    case 'Mastercard': return 'text-orange-600 bg-orange-100';
    case 'Elo': return 'text-purple-600 bg-purple-100';
    case 'American Express': return 'text-green-600 bg-green-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

export const getBandeiraGradient = (bandeira: string) => {
  switch (bandeira) {
    case 'Visa': return 'from-blue-500 to-blue-700';
    case 'Mastercard': return 'from-orange-500 to-red-600';
    case 'Elo': return 'from-purple-500 to-purple-700';
    case 'American Express': return 'from-green-500 to-green-700';
    default: return 'from-gray-500 to-gray-700';
  }
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
