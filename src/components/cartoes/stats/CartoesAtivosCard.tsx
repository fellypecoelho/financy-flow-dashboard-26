
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface CartoesAtivosCardProps {
  cartoesAtivos: number;
}

const CartoesAtivosCard = ({ cartoesAtivos }: CartoesAtivosCardProps) => {
  return (
    <Card>
      <CardContent className="p-3 sm:p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1 pr-2">
            <p className="text-xs font-medium text-gray-500 mb-1">Cartões Ativos</p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600">{cartoesAtivos}</p>
            <p className="text-xs text-green-600 mt-1">Todos funcionais</p>
          </div>
          <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-green-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartoesAtivosCard;
