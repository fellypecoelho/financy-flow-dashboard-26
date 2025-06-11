
import React from 'react';
import { EventoCalendario } from '@/types/calendario';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, TrendingUp, Clock, User, Calendar } from 'lucide-react';

interface EventosDiaProps {
  eventos: EventoCalendario[];
}

const EventosDia = ({ eventos }: EventosDiaProps) => {
  if (eventos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Calendar className="w-16 h-16 mx-auto mb-4 opacity-30" />
        <p className="text-lg font-medium mb-2">Nenhum evento</p>
        <p className="text-sm">Não há eventos programados para este dia</p>
      </div>
    );
  }

  const getEventoIcon = (tipo: string) => {
    switch (tipo) {
      case 'despesa':
        return <CreditCard className="w-5 h-5" />;
      case 'aporte':
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getStatusBadge = (evento: EventoCalendario) => {
    if (evento.tipo === 'aporte') {
      return (
        <Badge variant="default" className="bg-green-100 text-green-700 border-green-300">
          Aporte
        </Badge>
      );
    }
    
    if (evento.status === 'pago') {
      return (
        <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-300">
          Pago
        </Badge>
      );
    }
    
    return (
      <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-300">
        Pendente
      </Badge>
    );
  };

  const getEventoColor = (evento: EventoCalendario) => {
    if (evento.tipo === 'aporte') return 'bg-green-100 text-green-700 border-green-200';
    if (evento.status === 'pago') return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-red-100 text-red-700 border-red-200';
  };

  const totalValor = eventos.reduce((acc, evento) => acc + evento.valor, 0);

  return (
    <div className="space-y-4">
      {/* Resumo do dia */}
      {eventos.length > 1 && (
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">
                Total do dia ({eventos.length} eventos)
              </span>
              <span className="text-lg font-bold text-gray-900">
                R$ {totalValor.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de eventos */}
      <div className="space-y-3">
        {eventos.map((evento) => (
          <Card
            key={evento.id}
            className={`transition-all duration-200 hover:shadow-md border-l-4 ${
              evento.tipo === 'aporte' 
                ? 'border-l-green-500 hover:border-l-green-600' 
                : evento.status === 'pago'
                ? 'border-l-blue-500 hover:border-l-blue-600'
                : 'border-l-red-500 hover:border-l-red-600'
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${getEventoColor(evento)}`}>
                  {getEventoIcon(evento.tipo)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-gray-900 truncate">
                      {evento.titulo}
                    </h4>
                    {getStatusBadge(evento)}
                  </div>
                  
                  {evento.descricao && (
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                      {evento.descricao}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-bold text-gray-900">
                        R$ {evento.valor.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                      
                      {evento.investidor && (
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <User className="w-4 h-4" />
                          <span>{evento.investidor}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventosDia;
