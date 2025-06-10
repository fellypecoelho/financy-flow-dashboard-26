
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Aporte, Investidor } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface AporteTableProps {
  aportes: Aporte[];
  investidores: Investidor[];
  onEdit: (aporte: Aporte) => void;
  onDelete: (id: string) => void;
}

const AporteTable = ({ aportes, investidores, onEdit, onDelete }: AporteTableProps) => {
  const getInvestidorNome = (investidorId: string) => {
    const investidor = investidores.find(inv => inv.id === investidorId);
    return investidor?.nome || 'Investidor não encontrado';
  };

  const formatData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const formatValor = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  if (aportes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhum aporte encontrado</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Data</TableHead>
          <TableHead>Investidor</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead className="text-right">Valor</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {aportes.map((aporte) => (
          <TableRow key={aporte.id}>
            <TableCell className="font-medium">
              {formatData(aporte.data)}
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 font-semibold text-sm">
                    {getInvestidorNome(aporte.investidorId).charAt(0).toUpperCase()}
                  </span>
                </div>
                {getInvestidorNome(aporte.investidorId)}
              </div>
            </TableCell>
            <TableCell>{aporte.descricao}</TableCell>
            <TableCell className="text-right font-semibold text-green-600">
              {formatValor(aporte.valor)}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end space-x-2">
                <button
                  onClick={() => onEdit(aporte)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(aporte.id)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AporteTable;
