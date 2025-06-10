
import React from 'react';
import { EventoCalendario } from '@/types/calendario';
import { Badge } from '@/components/ui/badge';
import { CreditCard, TrendingUp, Clock, CheckCircle } from 'lucide-react';

interface EventosDiaProps {
  eventos: EventoCalendario[];
}

const EventosDia = ({ eventos }: EventosDiaProps) => {
  if (eventos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>Nenhum evento neste dia</p>
      </div>
    );
  }

  const getEventoIcon = (tipo: string) => {
    switch (tipo) {
      case 'despesa':
        return <CreditCard className="w-4 h-4" />;
      case 'aporte':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (evento: EventoCalendario) => {
    if (evento.tipo === 'aporte') {
      return <Badge variant="secondary" className="bg-green-100 text-green-700">Aporte</Badge>;
    }
    
    if (evento.status === 'pago') {
      return <Badge variant="secondary" className="bg-blue-100 text-blue-700">Pago</Badge>;
    }
    
    return <Badge variant="destructive">Pendente</Badge>;
  };

  return (
    <div className="space-y-3">
      {eventos.map((evento) => (
        <div
          key={evento.id}
          className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1">
              <div className={`p-2 rounded-full ${
                evento.tipo === 'despesa' 
                  ? evento.status === 'pago' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-red-100 text-red-600'
                  : 'bg-green-100 text-green-600'
              }`}>
                {getEventoIcon(evento.tipo)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-gray-900 truncate">
                    {evento.titulo}
                  </h4>
                  {getStatusBadge(evento)}
                </div>
                
                {evento.descricao && (
                  <p className="text-sm text-gray-600 mb-1">{evento.descricao}</p>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">
                    R$ {evento.valor.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  
                  {evento.investidor && (
                    <span className="text-xs text-gray-500">
                      {evento.investidor}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventosDia;
