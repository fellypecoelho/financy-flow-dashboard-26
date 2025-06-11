
import React from 'react';
import { DayPicker } from 'react-day-picker';
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
    multiplosEventos: (date: Date) => getEventosNaData(date).length > 1,
  };

  const modifiersStyles = {
    despesaPendente: {
      backgroundColor: '#fef2f2',
      color: '#dc2626',
      fontWeight: 'bold',
      border: '2px solid #fca5a5',
    },
    despesaPaga: {
      backgroundColor: '#eff6ff',
      color: '#2563eb',
      fontWeight: 'bold',
      border: '2px solid #93c5fd',
    },
    aporte: {
      backgroundColor: '#f0fdf4',
      color: '#16a34a',
      fontWeight: 'bold',
      border: '2px solid #86efac',
    },
    multiplosEventos: {
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.3)',
    },
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-center">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && onDateSelect(date)}
          locale={ptBR}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          className="border rounded-lg p-4 bg-white shadow-sm"
          showOutsideDays
          classNames={{
            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center mb-4",
            caption_label: "text-lg font-semibold text-gray-900",
            nav: "space-x-1 flex items-center",
            nav_button: "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 border border-gray-300 rounded-md hover:bg-gray-100",
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell: "text-gray-500 rounded-md w-10 font-medium text-sm uppercase",
            row: "flex w-full mt-2",
            cell: "h-10 w-10 text-center text-sm p-0 relative hover:bg-gray-100 rounded-md transition-colors",
            day: "h-10 w-10 p-0 font-normal rounded-md hover:bg-gray-100 transition-colors cursor-pointer",
            day_selected: "bg-blue-600 text-white hover:bg-blue-700 font-semibold",
            day_today: "bg-blue-100 text-blue-900 font-semibold",
            day_outside: "text-gray-400 opacity-50",
            day_disabled: "text-gray-400 opacity-50 cursor-not-allowed",
          }}
        />
      </div>
      
      {/* Legenda melhorada */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-3">Legenda</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-100 border-2 border-red-300 rounded"></div>
            <span className="text-gray-700">Despesa Pendente</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-100 border-2 border-blue-300 rounded"></div>
            <span className="text-gray-700">Despesa Paga</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded"></div>
            <span className="text-gray-700">Aporte</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-600 rounded shadow-md"></div>
            <span className="text-gray-700">Múltiplos Eventos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarioView;
