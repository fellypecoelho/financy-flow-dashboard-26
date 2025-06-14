
import React from 'react';
import { CreditCard } from 'lucide-react';
import { Despesa } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TransacoesRecentesCardProps {
  despesas: Despesa[];
}

const TransacoesRecentesCard = ({ despesas }: TransacoesRecentesCardProps) => {
  const despesasCartao = despesas
    .filter(d => d.formaPagamento === 'cartao')
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Transações Recentes</CardTitle>
          <Button variant="ghost" size="sm" className="text-blue-600">
            Ver Todas
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {despesasCartao.map((despesa) => (
            <div key={despesa.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{despesa.descricao}</p>
                  <p className="text-sm text-gray-500">{despesa.origem}</p>
                </div>
              </div>
              <span className="font-semibold text-red-600">
                -{despesa.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransacoesRecentesCard;
