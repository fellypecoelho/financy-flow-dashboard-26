
import React from 'react';
import { EventoCalendario } from '@/types/calendario';
import { format, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';

interface CalendarioViewProps {
  eventos: EventoCalendario[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const CalendarioView = ({ eventos, selectedDate, onDateSelect }: CalendarioViewProps) => {
  const getEventosNaData = (date: Date) => {
    return eventos.filter(evento => isSameDay(new Date(evento.data), date));
  };

  const today = new Date();
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = [];
  let day = startDate;

  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const renderDay = (day: Date) => {
    const eventosNoDia = getEventosNaData(day);
    const isToday = isSameDay(day, today);
    const isSelected = isSameDay(day, selectedDate);
    const isCurrentMonth = isSameMonth(day, selectedDate);
    const dayNumber = format(day, 'd');

    const hasAporte = eventosNoDia.some(e => e.tipo === 'aporte');
    const hasDespesaPendente = eventosNoDia.some(e => e.tipo === 'despesa' && e.status === 'pendente');
    const hasDespesaPaga = eventosNoDia.some(e => e.tipo === 'despesa' && e.status === 'pago');

    return (
      <div
        key={day.toString()}
        className={`
          min-h-[80px] p-2 border border-border cursor-pointer transition-all hover:bg-accent/50
          ${isSelected ? 'bg-primary/10 border-primary' : ''}
          ${isToday ? 'bg-accent' : ''}
          ${!isCurrentMonth ? 'text-muted-foreground bg-muted/30' : ''}
        `}
        onClick={() => onDateSelect(day)}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-1">
            <span className={`text-sm font-medium ${isToday ? 'font-bold text-primary' : ''}`}>
              {dayNumber}
            </span>
            {eventosNoDia.length > 0 && (
              <div className="flex gap-1">
                {hasAporte && (
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                )}
                {hasDespesaPaga && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
                {hasDespesaPendente && (
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex-1 space-y-1">
            {eventosNoDia.slice(0, 2).map((evento, index) => (
              <div
                key={index}
                className={`text-xs p-1 rounded truncate ${
                  evento.tipo === 'aporte' 
                    ? 'bg-green-100 text-green-700'
                    : evento.status === 'pago'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {evento.titulo}
              </div>
            ))}
            
            {eventosNoDia.length > 2 && (
              <div className="text-xs text-muted-foreground font-medium">
                +{eventosNoDia.length - 2} mais
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Grid do calendário */}
      <div className="grid grid-cols-7 gap-0 border border-border rounded-lg overflow-hidden bg-card">
        {/* Cabeçalho dos dias da semana */}
        {weekDays.map((day) => (
          <div
            key={day}
            className="bg-muted p-3 text-center text-sm font-medium text-muted-foreground border-b border-border"
          >
            {day}
          </div>
        ))}
        
        {/* Dias do mês */}
        {days.map(renderDay)}
      </div>
      
      {/* Legenda */}
      <div className="mt-6 bg-muted/30 p-4 rounded-lg">
        <h4 className="font-medium text-card-foreground mb-3">Legenda</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-muted-foreground">Despesa Pendente</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-muted-foreground">Despesa Paga</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-muted-foreground">Aporte</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarioView;
