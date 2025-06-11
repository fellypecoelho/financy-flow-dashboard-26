
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EventoCalendario } from '@/types/calendario';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { TrendingUp, TrendingDown, DollarSign, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';

interface ResumoMensalProps {
  eventos: EventoCalendario[];
  mesAtual: Date;
}

const ResumoMensal = ({ eventos, mesAtual }: ResumoMensalProps) => {
  const inicioMes = startOfMonth(mesAtual);
  const fimMes = endOfMonth(mesAtual);
  
  const eventosMes = eventos.filter(evento => {
    const dataEvento = new Date(evento.data);
    return dataEvento >= inicioMes && dataEvento <= fimMes;
  });

  const despesas = eventosMes.filter(e => e.tipo === 'despesa');
  const aportes = eventosMes.filter(e => e.tipo === 'aporte');
  const despesasPendentes = despesas.filter(e => e.status === 'pendente');
  const despesasPagas = despesas.filter(e => e.status === 'pago');

  const totalDespesas = despesas.reduce((acc, e) => acc + e.valor, 0);
  const totalAportes = aportes.reduce((acc, e) => acc + e.valor, 0);
  const totalPendente = despesasPendentes.reduce((acc, e) => acc + e.valor, 0);
  const totalPago = despesasPagas.reduce((acc, e) => acc + e.valor, 0);

  const saldoLiquido = totalAportes - totalDespesas;

  // Estatísticas por dia
  const diasComEventos = eachDayOfInterval({ start: inicioMes, end: fimMes })
    .filter(dia => eventosMes.some(evento => isSameDay(new Date(evento.data), dia)))
    .length;

  return (
    <div className="space-y-6">
      {/* Cards principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-green-700">
              <TrendingUp className="w-4 h-4" />
              Total Aportes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">
              R$ {totalAportes.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <p className="text-xs text-green-600 mt-1">{aportes.length} aportes</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-red-700">
              <TrendingDown className="w-4 h-4" />
              Total Despesas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-800">
              R$ {totalDespesas.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <p className="text-xs text-red-600 mt-1">{despesas.length} despesas</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-orange-700">
              <AlertTriangle className="w-4 h-4" />
              Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">
              R$ {totalPendente.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <p className="text-xs text-orange-600 mt-1">{despesasPendentes.length} pendentes</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-blue-700">
              <DollarSign className="w-4 h-4" />
              Saldo Líquido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${saldoLiquido >= 0 ? 'text-green-800' : 'text-red-800'}`}>
              R$ {saldoLiquido.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <p className="text-xs text-blue-600 mt-1">
              {saldoLiquido >= 0 ? 'Superávit' : 'Déficit'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Estatísticas detalhadas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Estatísticas do Mês
            </CardTitle>
            <CardDescription>
              {format(mesAtual, "MMMM 'de' yyyy", { locale: ptBR })}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Dias com eventos</span>
              <span className="font-semibold">{diasComEventos} dias</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total de eventos</span>
              <span className="font-semibold">{eventosMes.length} eventos</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Média por evento</span>
              <span className="font-semibold">
                R$ {eventosMes.length > 0 ? 
                  ((totalDespesas + totalAportes) / eventosMes.length).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) : '0,00'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Status dos Pagamentos
            </CardTitle>
            <CardDescription>
              Situação atual das despesas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Despesas pagas</span>
              <div className="text-right">
                <span className="font-semibold text-blue-700">{despesasPagas.length}</span>
                <span className="text-xs text-gray-500 block">
                  ({despesas.length > 0 ? Math.round((despesasPagas.length / despesas.length) * 100) : 0}%)
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Despesas pendentes</span>
              <div className="text-right">
                <span className="font-semibold text-red-700">{despesasPendentes.length}</span>
                <span className="text-xs text-gray-500 block">
                  ({despesas.length > 0 ? Math.round((despesasPendentes.length / despesas.length) * 100) : 0}%)
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Valor médio despesa</span>
              <span className="font-semibold">
                R$ {despesas.length > 0 ? 
                  (totalDespesas / despesas.length).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) : '0,00'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResumoMensal;
