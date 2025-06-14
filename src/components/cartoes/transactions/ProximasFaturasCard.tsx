
import React from 'react';
import { Cartao, Despesa } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProximasFaturasCardProps {
  cartoes: Cartao[];
  despesas: Despesa[];
}

const ProximasFaturasCard = ({ cartoes, despesas }: ProximasFaturasCardProps) => {
  const proximosVencimentos = despesas
    .filter(d => d.formaPagamento === 'cartao' && d.status === 'pendente')
    .slice(0, 5);

  const proximaFatura = despesas
    .filter(d => d.formaPagamento === 'cartao' && d.status === 'pendente')
    .reduce((acc, despesa) => acc + despesa.valor, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Próximas Faturas</CardTitle>
          <Button variant="ghost" size="sm" className="text-blue-600">
            Ver Todas
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {proximosVencimentos.map((despesa) => {
            const cartao = cartoes.find(c => c.id === despesa.cartaoId);
            return (
              <div key={despesa.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-8 bg-red-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">{cartao?.nome}</p>
                    <p className="text-sm text-gray-500">
                      Vence em 8 dias • {new Date(despesa.dataVencimento).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                <span className="font-semibold text-red-600">
                  {despesa.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
            );
          })}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900">Total das Próximas Faturas</span>
              <span className="font-bold text-red-600">
                {proximaFatura.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProximasFaturasCard;
