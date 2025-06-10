
import React from 'react';
import { DayPicker } from 'react-day-picker';
import { EventoCalendario } from '@/types/calendario';
import { format, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import 'react-day-picker/style.css';

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
      border: '2px solid #f87171'
    },
    despesaPaga: {
      backgroundColor: '#dbeafe',
      color: '#2563eb',
      fontWeight: 'bold',
      border: '2px solid #60a5fa'
    },
    aporte: {
      backgroundColor: '#dcfce7',
      color: '#16a34a',
      fontWeight: 'bold',
      border: '2px solid #4ade80'
    },
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-center">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && onDateSelect(date)}
          locale={ptBR}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          className="border rounded-lg p-4 bg-white shadow-sm"
          showOutsideDays={false}
          classNames={{
            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center text-lg font-semibold",
            caption_label: "text-lg font-semibold",
            nav: "space-x-1 flex items-center",
            nav_button: "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 border rounded-md hover:bg-gray-100",
            nav_button_previous: "absolute left-2",
            nav_button_next: "absolute right-2",
            table: "w-full border-collapse space-y-1 mt-4",
            head_row: "flex",
            head_cell: "text-muted-foreground rounded-md w-10 h-10 font-semibold text-sm flex items-center justify-center",
            row: "flex w-full mt-1",
            cell: "h-10 w-10 text-center text-sm p-0 relative flex items-center justify-center",
            day: "h-9 w-9 p-0 font-normal hover:bg-gray-100 rounded-md flex items-center justify-center cursor-pointer transition-colors",
            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            day_today: "bg-accent text-accent-foreground font-bold",
            day_outside: "text-muted-foreground opacity-50",
            day_disabled: "text-muted-foreground opacity-25",
          }}
        />
      </div>
      
      {/* Legenda */}
      <div className="flex flex-wrap justify-center gap-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 border-2 border-red-300 rounded"></div>
          <span className="text-sm font-medium text-gray-700">Despesa Pendente</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-100 border-2 border-blue-300 rounded"></div>
          <span className="text-sm font-medium text-gray-700">Despesa Paga</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded"></div>
          <span className="text-sm font-medium text-gray-700">Aporte</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarioView;
