
import { useState, useEffect } from 'react';
import { EventoCalendario } from '@/types/calendario';
import { useFinancialData } from './useFinancialData';
import { isSameDay } from 'date-fns';

export const useCalendarioData = () => {
  const { despesas, aportes, investidores } = useFinancialData();
  const [eventosCalendario, setEventosCalendario] = useState<EventoCalendario[]>([]);

  useEffect(() => {
    const eventos: EventoCalendario[] = [];

    // Adicionar despesas
    despesas.forEach(despesa => {
      const investidorNome = investidores.find(inv => 
        despesa.divisaoInvestidores.some(div => div.investidorId === inv.id)
      )?.nome || 'Múltiplos investidores';

      eventos.push({
        id: `despesa-${despesa.id}`,
        titulo: despesa.descricao,
        descricao: despesa.origem,
        data: despesa.dataVencimento,
        valor: despesa.valor,
        tipo: 'despesa',
        status: despesa.status,
        investidor: investidorNome,
      });
    });

    // Adicionar aportes
    aportes.forEach(aporte => {
      const investidor = investidores.find(inv => inv.id === aporte.investidorId);
      
      eventos.push({
        id: `aporte-${aporte.id}`,
        titulo: 'Aporte',
        descricao: aporte.descricao,
        data: aporte.data,
        valor: aporte.valor,
        tipo: 'aporte',
        status: 'confirmado',
        investidor: investidor?.nome || 'Investidor não encontrado',
      });
    });

    setEventosCalendario(eventos);
  }, [despesas, aportes, investidores]);

  const getEventosDia = (data: Date): EventoCalendario[] => {
    return eventosCalendario.filter(evento => 
      isSameDay(new Date(evento.data), data)
    );
  };

  return {
    eventosCalendario,
    getEventosDia,
  };
};
