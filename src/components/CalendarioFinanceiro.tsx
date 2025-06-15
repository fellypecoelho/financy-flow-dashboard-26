
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronLeft, ChevronRight, Receipt, TrendingUp, CreditCard } from 'lucide-react';

const CalendarioFinanceiro = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const eventos = [
    {
      id: '1',
      tipo: 'despesa',
      titulo: 'Aluguel',
      valor: 2500.00,
      data: new Date(2024, 11, 25), // 25 de dezembro
      status: 'pendente'
    },
    {
      id: '2',
      tipo: 'aporte',
      titulo: 'Aporte João Silva',
      valor: 5000.00,
      data: new Date(2024, 11, 15), // 15 de dezembro
      status: 'confirmado'
    },
    {
      id: '3',
      tipo: 'cartao',
      titulo: 'Vencimento Cartão Principal',
      valor: 1200.00,
      data: new Date(2024, 11, 10), // 10 de dezembro
      status: 'pendente'
    }
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getEventosForDay = (day: number) => {
    return eventos.filter(evento => {
      const eventoDate = new Date(evento.data);
      return eventoDate.getDate() === day &&
             eventoDate.getMonth() === currentDate.getMonth() &&
             eventoDate.getFullYear() === currentDate.getFullYear();
    });
  };

  const getEventIcon = (tipo: string) => {
    switch (tipo) {
      case 'despesa':
        return <Receipt className="h-3 w-3" />;
      case 'aporte':
        return <TrendingUp className="h-3 w-3" />;
      case 'cartao':
        return <CreditCard className="h-3 w-3" />;
      default:
        return <Calendar className="h-3 w-3" />;
    }
  };

  const getEventColor = (tipo: string) => {
    switch (tipo) {
      case 'despesa':
        return 'destructive';
      case 'aporte':
        return 'default';
      case 'cartao':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const days = [];
  
  // Dias vazios do início do mês
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-24 border border-border"></div>);
  }

  // Dias do mês
  for (let day = 1; day <= daysInMonth; day++) {
    const eventosDay = getEventosForDay(day);
    days.push(
      <div key={day} className="h-24 border border-border p-1 bg-background hover:bg-accent/50 transition-colors">
        <div className="font-medium text-sm mb-1">{day}</div>
        <div className="space-y-1">
          {eventosDay.slice(0, 2).map((evento) => (
            <div key={evento.id} className="flex items-center gap-1">
              {getEventIcon(evento.tipo)}
              <Badge variant={getEventColor(evento.tipo)} className="text-xs p-0 px-1 h-4">
                {evento.tipo}
              </Badge>
            </div>
          ))}
          {eventosDay.length > 2 && (
            <div className="text-xs text-muted-foreground">
              +{eventosDay.length - 2} mais
            </div>
          )}
        </div>
      </div>
    );
  }

  const proximosEventos = eventos
    .filter(evento => evento.data >= new Date())
    .sort((a, b) => a.data.getTime() - b.data.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Calendário Financeiro</h1>
        <p className="text-muted-foreground">
          Visualize todos os eventos financeiros em um calendário
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendário */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={goToNextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-0 mb-2">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                  <div key={day} className="h-8 flex items-center justify-center font-medium text-sm bg-muted">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-0 border border-border">
                {days}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Próximos Eventos */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Próximos Eventos</CardTitle>
              <CardDescription>Eventos financeiros dos próximos dias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {proximosEventos.map((evento) => (
                  <div key={evento.id} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                    <div className="flex-shrink-0 mt-1">
                      {getEventIcon(evento.tipo)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{evento.titulo}</p>
                      <p className="text-sm text-muted-foreground">
                        {evento.data.toLocaleDateString('pt-BR')}
                      </p>
                      <p className="text-sm font-medium">
                        R$ {evento.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <Badge variant={getEventColor(evento.tipo)}>
                      {evento.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resumo do Mês */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Resumo do Mês</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Despesas</span>
                  <span className="text-sm font-bold text-destructive">R$ 3.700,00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Aportes</span>
                  <span className="text-sm font-bold text-green-600">R$ 5.000,00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Cartões</span>
                  <span className="text-sm font-bold text-amber-600">R$ 1.200,00</span>
                </div>
                <hr />
                <div className="flex justify-between items-center">
                  <span className="font-medium">Saldo do Mês</span>
                  <span className="font-bold text-green-600">R$ 100,00</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarioFinanceiro;
