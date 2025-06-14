
import React from 'react';
import { CreditCard, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Cartao, Despesa } from '@/types';
import { Card, CardContent } from '@/components/ui/card';

interface CartaoStatsProps {
  cartoes: Cartao[];
  despesas: Despesa[];
}

const CartaoStats = ({ cartoes, despesas }: CartaoStatsProps) => {
  const limiteTotal = cartoes.reduce((acc, cartao) => acc + cartao.limite, 0);
  const limiteUtilizado = despesas
    .filter(d => d.formaPagamento === 'cartao' && d.cartaoId)
    .reduce((acc, despesa) => acc + despesa.valor, 0);
  
  const proximaFatura = despesas
    .filter(d => d.formaPagamento === 'cartao' && d.status === 'pendente')
    .reduce((acc, despesa) => acc + despesa.valor, 0);

  const cartoesAtivos = cartoes.length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      <Card>
        <CardContent className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1 pr-2">
              <p className="text-xs font-medium text-gray-500 mb-1">Limite Total</p>
              <p className="text-base sm:text-lg lg:text-2xl font-bold text-blue-600 leading-tight">
                {limiteTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
              <p className="text-xs text-gray-500 mt-1">{cartoesAtivos} cartões ativos</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1 pr-2">
              <p className="text-xs font-medium text-gray-500 mb-1">Limite Utilizado</p>
              <p className="text-base sm:text-lg lg:text-2xl font-bold text-orange-600 leading-tight">
                {limiteUtilizado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {limiteTotal > 0 ? Math.round((limiteUtilizado / limiteTotal) * 100) : 0}% do limite total
              </p>
            </div>
            <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1 pr-2">
              <p className="text-xs font-medium text-gray-500 mb-1">Próxima Fatura</p>
              <p className="text-base sm:text-lg lg:text-2xl font-bold text-red-600 leading-tight">
                {proximaFatura.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
              <p className="text-xs text-red-600 mt-1">Vence em 8 dias</p>
            </div>
            <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1 pr-2">
              <p className="text-xs font-medium text-gray-500 mb-1">Cartões Ativos</p>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600">{cartoesAtivos}</p>
              <p className="text-xs text-green-600 mt-1">Todos funcionais</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CartaoStats;
