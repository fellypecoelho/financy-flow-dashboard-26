
import React from 'react';
import { Edit, Trash2, TrendingUp } from 'lucide-react';
import { Investidor, Aporte } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface InvestidorTableProps {
  investidores: Investidor[];
  aportes: Aporte[];
  onEdit: (investidor: Investidor) => void;
  onDelete: (id: string) => void;
}

const InvestidorTable = ({ investidores, aportes, onEdit, onDelete }: InvestidorTableProps) => {
  const calcularTotalAportes = (investidorId: string) => {
    return aportes
      .filter(aporte => aporte.investidorId === investidorId)
      .reduce((acc, aporte) => acc + aporte.valor, 0);
  };

  const contarAportes = (investidorId: string) => {
    return aportes.filter(aporte => aporte.investidorId === investidorId).length;
  };

  const formatValor = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  if (investidores.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhum investidor encontrado</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Investidor</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Qtd. Aportes</TableHead>
          <TableHead className="text-right">Total Investido</TableHead>
          <TableHead className="text-right">Saldo Atual</TableHead>
          <TableHead className="text-right">Rendimento</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {investidores.map((investidor) => {
          const totalAportes = calcularTotalAportes(investidor.id);
          const qtdAportes = contarAportes(investidor.id);
          const rendimento = investidor.saldoAtual - totalAportes;
          const percentualRendimento = totalAportes > 0 ? (rendimento / totalAportes) * 100 : 0;

          return (
            <TableRow key={investidor.id}>
              <TableCell className="font-medium">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold text-sm">
                      {investidor.nome.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  {investidor.nome}
                </div>
              </TableCell>
              <TableCell className="text-gray-600">{investidor.email}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  investidor.ativo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {investidor.ativo ? 'Ativo' : 'Inativo'}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <span className="text-sm font-medium">{qtdAportes}</span>
              </TableCell>
              <TableCell className="text-right font-semibold text-blue-600">
                {formatValor(totalAportes)}
              </TableCell>
              <TableCell className="text-right font-semibold">
                {formatValor(investidor.saldoAtual)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end">
                  <TrendingUp className={`h-4 w-4 mr-1 ${rendimento >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                  <div className="text-right">
                    <div className={`font-semibold ${rendimento >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatValor(rendimento)}
                    </div>
                    <div className={`text-xs ${rendimento >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {percentualRendimento >= 0 ? '+' : ''}{percentualRendimento.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-2">
                  <button
                    onClick={() => onEdit(investidor)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(investidor.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default InvestidorTable;
