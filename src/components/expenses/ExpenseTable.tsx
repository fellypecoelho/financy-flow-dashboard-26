
import React from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import { Despesa, Categoria, Cartao } from '@/types';
import CategoryIcon from '@/components/ui/CategoryIcon';

interface ExpenseTableProps {
  expenses: Despesa[];
  categorias: Categoria[];
  cartoes: Cartao[];
  onEdit: (expense: Despesa) => void;
  onDelete: (id: string) => void;
}

const ExpenseTable = ({ expenses, categorias, cartoes, onEdit, onDelete }: ExpenseTableProps) => {
  const getCategoriaById = (id: string) => categorias.find(cat => cat.id === id);
  const getCartaoById = (id: string) => cartoes.find(cartao => cartao.id === id);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusBadge = (status: string) => {
    const classes = status === 'pago' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800';
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${classes}`}>
        {status === 'pago' ? 'Pago' : 'Pendente'}
      </span>
    );
  };

  const getTipoBadge = (tipo: string) => {
    const colors = {
      unica: 'bg-blue-100 text-blue-800',
      recorrente: 'bg-purple-100 text-purple-800',
      parcelada: 'bg-orange-100 text-orange-800'
    };
    
    const labels = {
      unica: 'Única',
      recorrente: 'Recorrente',
      parcelada: 'Parcelada'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[tipo as keyof typeof colors]}`}>
        {labels[tipo as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vencimento</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pagamento</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {expenses.map((expense) => {
            const categoria = getCategoriaById(expense.categoriaId);
            const cartao = expense.cartaoId ? getCartaoById(expense.cartaoId) : null;
            
            return (
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{expense.descricao}</div>
                    <div className="text-sm text-gray-500">{expense.origem}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatCurrency(expense.valor)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(expense.dataVencimento)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                      style={{ backgroundColor: categoria?.cor }}
                    >
                      <CategoryIcon 
                        iconName={categoria?.icone || 'Tag'} 
                        size={16} 
                        className="text-white" 
                      />
                    </div>
                    <span className="text-sm text-gray-900">{categoria?.nome}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(expense.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getTipoBadge(expense.tipo)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {expense.formaPagamento === 'cartao' && cartao 
                    ? cartao.nome 
                    : expense.formaPagamento === 'dinheiro' 
                      ? 'Dinheiro' 
                      : 'Transferência'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onEdit(expense)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(expense.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      {expenses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhuma despesa encontrada</p>
        </div>
      )}
    </div>
  );
};

export default ExpenseTable;
