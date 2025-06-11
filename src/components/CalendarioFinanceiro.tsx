
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CalendarioView from '@/components/calendario/CalendarioView';
import EventosDia from '@/components/calendario/EventosDia';
import ResumoMensal from '@/components/calendario/ResumoMensal';
import FiltrosCalendario from '@/components/calendario/FiltrosCalendario';
import { useCalendarioData } from '@/hooks/useCalendarioData';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, Filter, BarChart3, List } from 'lucide-react';

const CalendarioFinanceiro = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [filtros, setFiltros] = useState({
    tipo: 'todos' as 'todos' | 'despesas' | 'aportes',
    status: 'todos' as 'todos' | 'pendente' | 'pago' | 'confirmado',
    investidor: 'todos'
  });
  
  const { eventosCalendario, getEventosDia } = useCalendarioData();

  const eventosFiltrados = eventosCalendario.filter(evento => {
    if (filtros.tipo !== 'todos' && evento.tipo !== filtros.tipo.slice(0, -1)) return false;
    if (filtros.status !== 'todos' && evento.status !== filtros.status) return false;
    if (filtros.investidor !== 'todos' && evento.investidor !== filtros.investidor) return false;
    return true;
  });

  const eventosDoDia = getEventosDia(selectedDate).filter(evento => {
    if (filtros.tipo !== 'todos' && evento.tipo !== filtros.tipo.slice(0, -1)) return false;
    if (filtros.status !== 'todos' && evento.status !== filtros.status) return false;
    if (filtros.investidor !== 'todos' && evento.investidor !== filtros.investidor) return false;
    return true;
  });

  const mesAtual = format(selectedDate, 'MMMM yyyy', { locale: ptBR });
  const inicioMes = startOfMonth(selectedDate);
  const fimMes = endOfMonth(selectedDate);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-blue-600" />
            Calendário Financeiro
          </h1>
          <p className="text-gray-500 mt-1 capitalize">
            {mesAtual} - Visualize vencimentos e aportes programados
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-sm">
            {eventosFiltrados.length} eventos
          </Badge>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FiltrosCalendario filtros={filtros} onFiltrosChange={setFiltros} />
        </CardContent>
      </Card>

      {/* Tabs principais */}
      <Tabs defaultValue="calendario" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
          <TabsTrigger value="calendario" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Calendário
          </TabsTrigger>
          <TabsTrigger value="lista" className="flex items-center gap-2">
            <List className="w-4 h-4" />
            Lista
          </TabsTrigger>
          <TabsTrigger value="resumo" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Resumo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendario" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Calendário principal */}
            <div className="xl:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="capitalize">{mesAtual}</CardTitle>
                  <CardDescription>
                    Clique em uma data para ver os eventos do dia
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CalendarioView
                    eventos={eventosFiltrados}
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Eventos do dia selecionado */}
            <div>
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {format(selectedDate, "d 'de' MMMM", { locale: ptBR })}
                  </CardTitle>
                  <CardDescription>
                    {eventosDoDia.length} evento(s) programado(s)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EventosDia eventos={eventosDoDia} />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="lista" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Todos os Eventos</CardTitle>
              <CardDescription>
                Lista completa de eventos do mês atual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {eventosFiltrados
                  .filter(evento => {
                    const dataEvento = new Date(evento.data);
                    return dataEvento >= inicioMes && dataEvento <= fimMes;
                  })
                  .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
                  .map((evento) => (
                    <div
                      key={evento.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => setSelectedDate(new Date(evento.data))}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-medium text-gray-900">{evento.titulo}</h4>
                            <Badge 
                              variant={evento.tipo === 'aporte' ? 'default' : 
                                      evento.status === 'pago' ? 'secondary' : 'destructive'}
                              className="text-xs"
                            >
                              {evento.tipo === 'aporte' ? 'Aporte' : 
                               evento.status === 'pago' ? 'Pago' : 'Pendente'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            {format(new Date(evento.data), "d 'de' MMMM", { locale: ptBR })}
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            R$ {evento.valor.toLocaleString('pt-BR', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resumo" className="space-y-6">
          <ResumoMensal 
            eventos={eventosFiltrados}
            mesAtual={selectedDate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CalendarioFinanceiro;
