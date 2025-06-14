
export const formatCurrency = (valor: number) => {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export const formatPercentage = (value: number) => {
  return `${Math.round(value)}%`;
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR');
};

export const formatCardNumber = () => {
  const lastFourDigits = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
  return `•••• •••• •••• ${lastFourDigits}`;
};
