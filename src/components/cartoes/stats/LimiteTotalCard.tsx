
import React from 'react';
import { CreditCard } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface LimiteTotalCardProps {
  limiteTotal: number;
  cartoesAtivos: number;
}

const LimiteTotalCard = ({ limiteTotal, cartoesAtivos }: LimiteTotalCardProps) => {
  return (
    <Card>
      <CardContent className="p-3 sm:p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1 pr-2">
            <p className="text-xs font-medium text-muted-foreground mb-1">Limite Total</p>
            <p className="text-base sm:text-lg lg:text-2xl font-bold text-primary leading-tight">
              {limiteTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{cartoesAtivos} cartões ativos</p>
          </div>
          <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
            <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LimiteTotalCard;
