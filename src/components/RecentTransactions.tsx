import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Lancamento } from '@/types';
import CategoryIcon from '@/components/ui/CategoryIcon';

interface RecentTransactionsProps {
  lancamentos: Lancamento[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ lancamentos }) => {
  if (lancamentos.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Lançamentos Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>Nenhum lançamento encontrado</p>
            <p className="text-sm">Adicione seu primeiro lançamento para começar</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lançamentos Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lancamentos.map((lancamento) => (
            <div
              key={lancamento.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                  <CategoryIcon 
                    iconName="dollar-sign" 
                    size={20} 
                    className="text-primary" 
                  />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{lancamento.titulo}</h4>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(lancamento.data), 'dd/MM/yyyy', { locale: ptBR })}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={lancamento.tipo === 'receita' ? 'default' : 'secondary'}>
                  {lancamento.tipo === 'receita' ? 'Receita' : 'Despesa'}
                </Badge>
                <span className={`font-semibold ${
                  lancamento.tipo === 'receita' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {lancamento.tipo === 'receita' ? '+' : '-'} R$ {lancamento.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
