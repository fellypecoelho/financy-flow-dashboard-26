
export const BANDEIRAS = {
  VISA: 'Visa',
  MASTERCARD: 'Mastercard',
  ELO: 'Elo',
  AMERICAN_EXPRESS: 'American Express'
} as const;

export const BANDEIRA_COLORS = {
  [BANDEIRAS.VISA]: 'text-blue-600 bg-blue-100',
  [BANDEIRAS.MASTERCARD]: 'text-orange-600 bg-orange-100',
  [BANDEIRAS.ELO]: 'text-purple-600 bg-purple-100',
  [BANDEIRAS.AMERICAN_EXPRESS]: 'text-green-600 bg-green-100'
} as const;

export const BANDEIRA_GRADIENTS = {
  [BANDEIRAS.VISA]: 'from-blue-500 to-blue-700',
  [BANDEIRAS.MASTERCARD]: 'from-orange-500 to-red-600',
  [BANDEIRAS.ELO]: 'from-purple-500 to-purple-700',
  [BANDEIRAS.AMERICAN_EXPRESS]: 'from-green-500 to-green-700'
} as const;

export const DEFAULT_COLORS = {
  COLOR: 'text-gray-600 bg-gray-100',
  GRADIENT: 'from-gray-500 to-gray-700'
} as const;

export const CURRENCY_CONFIG = {
  LOCALE: 'pt-BR',
  CURRENCY: 'BRL'
} as const;

export const PERCENTAGE_THRESHOLDS = {
  LOW: 30,
  MEDIUM: 70,
  HIGH: 90
} as const;
