
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CalendarioView from '@/components/calendario/CalendarioView';
import EventosDia from '@/components/calendario/EventosDia';
import { useCalendarioData } from '@/hooks/useCalendarioData';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const CalendarioFinanceiro = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { eventosCalendario, getEventosDia } = useCalendarioData();

  const eventosDoDia = getEventosDia(selectedDate);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendário Financeiro</h1>
          <p className="text-gray-500 mt-1">Visualize vencimentos e aportes programados</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendário */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Calendário</CardTitle>
              <CardDescription>
                Clique em uma data para ver os eventos do dia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CalendarioView
                eventos={eventosCalendario}
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
              />
            </CardContent>
          </Card>
        </div>

        {/* Eventos do dia selecionado */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                {format(selectedDate, "d 'de' MMMM", { locale: ptBR })}
              </CardTitle>
              <CardDescription>
                Eventos programados para este dia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EventosDia eventos={eventosDoDia} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Resumo mensal */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo do Mês</CardTitle>
          <CardDescription>
            Visão geral dos eventos financeiros
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-red-600 text-sm font-medium">Despesas Pendentes</div>
              <div className="text-2xl font-bold text-red-700">
                {eventosCalendario.filter(e => e.tipo === 'despesa' && e.status === 'pendente').length}
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-green-600 text-sm font-medium">Aportes Programados</div>
              <div className="text-2xl font-bold text-green-700">
                {eventosCalendario.filter(e => e.tipo === 'aporte').length}
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-blue-600 text-sm font-medium">Despesas Pagas</div>
              <div className="text-2xl font-bold text-blue-700">
                {eventosCalendario.filter(e => e.tipo === 'despesa' && e.status === 'pago').length}
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-purple-600 text-sm font-medium">Total de Eventos</div>
              <div className="text-2xl font-bold text-purple-700">
                {eventosCalendario.length}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarioFinanceiro;
