
import { CURRENCY_CONFIG } from '@/constants/cartaoConstants';

export const formatCurrency = (valor: number) => {
  return valor.toLocaleString(CURRENCY_CONFIG.LOCALE, { 
    style: 'currency', 
    currency: CURRENCY_CONFIG.CURRENCY 
  });
};

export const formatPercentage = (value: number) => {
  return `${Math.round(value)}%`;
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString(CURRENCY_CONFIG.LOCALE);
};

export const formatCardNumber = () => {
  const lastFourDigits = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
  return `•••• •••• •••• ${lastFourDigits}`;
};
