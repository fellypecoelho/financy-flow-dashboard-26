
import React from 'react';
import { Calendar, dateFns, DayPicker } from 'react-day-picker';
import { EventoCalendario } from '@/types/calendario';
import { format, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface CalendarioViewProps {
  eventos: EventoCalendario[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const CalendarioView = ({ eventos, selectedDate, onDateSelect }: CalendarioViewProps) => {
  const getEventosNaData = (date: Date) => {
    return eventos.filter(evento => isSameDay(new Date(evento.data), date));
  };

  const modifiers = {
    comEventos: (date: Date) => getEventosNaData(date).length > 0,
    despesaPendente: (date: Date) => 
      getEventosNaData(date).some(e => e.tipo === 'despesa' && e.status === 'pendente'),
    despesaPaga: (date: Date) => 
      getEventosNaData(date).some(e => e.tipo === 'despesa' && e.status === 'pago'),
    aporte: (date: Date) => 
      getEventosNaData(date).some(e => e.tipo === 'aporte'),
  };

  const modifiersStyles = {
    despesaPendente: {
      backgroundColor: '#fef2f2',
      color: '#dc2626',
      fontWeight: 'bold',
    },
    despesaPaga: {
      backgroundColor: '#f0f9ff',
      color: '#2563eb',
      fontWeight: 'bold',
    },
    aporte: {
      backgroundColor: '#f0fdf4',
      color: '#16a34a',
      fontWeight: 'bold',
    },
  };

  return (
    <div className="flex flex-col space-y-4">
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={(date) => date && onDateSelect(date)}
        locale={ptBR}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        className="mx-auto"
        showOutsideDays
      />
      
      {/* Legenda */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
          <span>Despesa Pendente</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
          <span>Despesa Paga</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
          <span>Aporte</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarioView;
