
import React from 'react';
import { TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';

const RecentTransactions = () => {
  const transactions = [
    {
      id: 1,
      title: 'Salário',
      category: 'Trabalho',
      amount: 8500.00,
      type: 'income',
      date: '2024-12-01',
      description: 'Salário mensal'
    },
    {
      id: 2,
      title: 'Supermercado',
      category: 'Alimentação',
      amount: -320.50,
      type: 'expense',
      date: '2024-12-08',
      description: 'Compras do mês'
    },
    {
      id: 3,
      title: 'Freelance',
      category: 'Trabalho',
      amount: 1200.00,
      type: 'income',
      date: '2024-12-07',
      description: 'Projeto desenvolvimento'
    },
    {
      id: 4,
      title: 'Combustível',
      category: 'Transporte',
      amount: -180.00,
      type: 'expense',
      date: '2024-12-06',
      description: 'Abastecimento'
    },
    {
      id: 5,
      title: 'Cinema',
      category: 'Lazer',
      amount: -45.00,
      type: 'expense',
      date: '2024-12-05',
      description: 'Sessão de filme'
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Trabalho': 'bg-green-100 text-green-800',
      'Alimentação': 'bg-red-100 text-red-800',
      'Transporte': 'bg-orange-100 text-orange-800',
      'Lazer': 'bg-blue-100 text-blue-800',
      'Saúde': 'bg-purple-100 text-purple-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Transações Recentes</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Ver todas
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'income' 
                    ? 'bg-green-100' 
                    : 'bg-red-100'
                }`}>
                  {transaction.type === 'income' ? (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">{transaction.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(transaction.category)}`}>
                      {transaction.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                    <span>{new Date(transaction.date).toLocaleDateString('pt-BR')}</span>
                    {transaction.description && (
                      <>
                        <span>•</span>
                        <span>{transaction.description}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`font-semibold ${
                  transaction.type === 'income' 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : ''}
                  R$ {Math.abs(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
                
                <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                  <MoreHorizontal className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
