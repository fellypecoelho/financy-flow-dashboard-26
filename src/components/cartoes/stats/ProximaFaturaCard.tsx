
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ProximaFaturaCardProps {
  proximaFatura: number;
}

const ProximaFaturaCard = ({ proximaFatura }: ProximaFaturaCardProps) => {
  return (
    <Card>
      <CardContent className="p-3 sm:p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1 pr-2">
            <p className="text-xs font-medium text-muted-foreground mb-1">Próxima Fatura</p>
            <p className="text-base sm:text-lg lg:text-2xl font-bold text-destructive leading-tight">
              {proximaFatura.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
            <p className="text-xs text-destructive mt-1">Vence em 8 dias</p>
          </div>
          <div className="p-2 bg-destructive/10 rounded-lg flex-shrink-0">
            <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-destructive" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProximaFaturaCard;
