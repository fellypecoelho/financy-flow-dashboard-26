
export const BANDEIRAS = {
  VISA: 'Visa',
  MASTERCARD: 'Mastercard',
  ELO: 'Elo',
  AMERICAN_EXPRESS: 'American Express'
} as const;

export type BandeiraType = typeof BANDEIRAS[keyof typeof BANDEIRAS];

// Usando cores do design system via CSS variables
export const BANDEIRA_COLORS = {
  [BANDEIRAS.VISA]: 'text-blue-600 bg-blue-50 border-blue-200',
  [BANDEIRAS.MASTERCARD]: 'text-orange-600 bg-orange-50 border-orange-200',
  [BANDEIRAS.ELO]: 'text-purple-600 bg-purple-50 border-purple-200',
  [BANDEIRAS.AMERICAN_EXPRESS]: 'text-green-600 bg-green-50 border-green-200'
} as const;

export const BANDEIRA_GRADIENTS = {
  [BANDEIRAS.VISA]: 'from-blue-500 to-blue-700',
  [BANDEIRAS.MASTERCARD]: 'from-orange-500 to-red-600',
  [BANDEIRAS.ELO]: 'from-purple-500 to-purple-700',
  [BANDEIRAS.AMERICAN_EXPRESS]: 'from-green-500 to-green-700'
} as const;

// Novos gradientes usando variáveis CSS
export const BANDEIRA_CSS_GRADIENTS = {
  [BANDEIRAS.VISA]: 'bg-gradient-to-br from-blue-500 to-blue-700',
  [BANDEIRAS.MASTERCARD]: 'bg-gradient-to-br from-orange-500 to-red-600',
  [BANDEIRAS.ELO]: 'bg-gradient-to-br from-purple-500 to-purple-700',
  [BANDEIRAS.AMERICAN_EXPRESS]: 'bg-gradient-to-br from-green-500 to-green-700'
} as const;

export const DEFAULT_COLORS = {
  COLOR: 'text-muted-foreground bg-muted border-border',
  GRADIENT: 'bg-gradient-to-br from-muted to-muted-foreground'
} as const;

// Cores de status padronizadas
export const STATUS_COLORS = {
  SUCCESS: 'text-green-600 bg-green-50',
  WARNING: 'text-yellow-600 bg-yellow-50',
  ERROR: 'text-red-600 bg-red-50',
  INFO: 'text-blue-600 bg-blue-50'
} as const;

// Thresholds para diferentes estados
export const USAGE_THRESHOLDS = {
  LOW: 30,
  MEDIUM: 60,
  HIGH: 80,
  CRITICAL: 90
} as const;

// Classes para diferentes níveis de uso
export const USAGE_CLASSES = {
  LOW: 'bg-green-400',
  MEDIUM: 'bg-yellow-400', 
  HIGH: 'bg-orange-400',
  CRITICAL: 'bg-red-400'
} as const;

export const CURRENCY_CONFIG = {
  LOCALE: 'pt-BR',
  CURRENCY: 'BRL'
} as const;
