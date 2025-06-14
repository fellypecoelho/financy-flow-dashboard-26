
import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveValueProps {
  value: number;
  currency?: boolean;
  variant?: 'default' | 'success' | 'danger' | 'warning';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  prefix?: string;
}

const ResponsiveValue = ({ 
  value, 
  currency = true, 
  variant = 'default',
  size = 'md',
  className,
  prefix
}: ResponsiveValueProps) => {
  const formatValue = (val: number) => {
    if (val === undefined || val === null) return '0';
    
    if (currency) {
      return val.toLocaleString('pt-BR', { 
        style: 'currency', 
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      });
    }
    return val.toLocaleString('pt-BR');
  };

  const variantClasses = {
    default: 'text-gray-900',
    success: 'text-green-600',
    danger: 'text-red-600',
    warning: 'text-yellow-600'
  };

  const sizeClasses = {
    sm: 'text-sm font-medium',
    md: 'text-base font-semibold',
    lg: 'text-lg font-bold',
    xl: 'text-xl md:text-2xl font-bold'
  };

  return (
    <span className={cn(
      'tabular-nums break-words',
      variantClasses[variant],
      sizeClasses[size],
      // Responsividade específica para valores monetários
      'text-sm sm:text-base',
      size === 'lg' && 'text-base sm:text-lg',
      size === 'xl' && 'text-lg sm:text-xl md:text-2xl',
      className
    )}>
      {prefix}{formatValue(value)}
    </span>
  );
};

export default ResponsiveValue;
