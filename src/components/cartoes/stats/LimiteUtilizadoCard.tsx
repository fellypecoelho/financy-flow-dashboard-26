
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface LimiteUtilizadoCardProps {
  limiteUtilizado: number;
  limiteTotal: number;
}

const LimiteUtilizadoCard = ({ limiteUtilizado, limiteTotal }: LimiteUtilizadoCardProps) => {
  const percentualUtilizado = limiteTotal > 0 ? Math.round((limiteUtilizado / limiteTotal) * 100) : 0;

  return (
    <Card>
      <CardContent className="p-3 sm:p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1 pr-2">
            <p className="text-xs font-medium text-gray-500 mb-1">Limite Utilizado</p>
            <p className="text-base sm:text-lg lg:text-2xl font-bold text-orange-600 leading-tight">
              {limiteUtilizado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {percentualUtilizado}% do limite total
            </p>
          </div>
          <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-orange-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LimiteUtilizadoCard;
