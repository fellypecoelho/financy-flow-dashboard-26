
import React, { useState } from 'react';
import { Search, Filter, Download, Calendar, TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TransactionList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  // Dados de exemplo expandidos
  const transactions = [
    {
      id: 1,
      title: 'Salário',
      category: 'Trabalho',
      amount: 8500.00,
      type: 'income',
      date: '2024-12-01',
      description: 'Salário mensal empresa'
    },
    {
      id: 2,
      title: 'Supermercado Extra',
      category: 'Alimentação',
      amount: -320.50,
      type: 'expense',
      date: '2024-12-08',
      description: 'Compras mensais'
    },
    {
      id: 3,
      title: 'Freelance Website',
      category: 'Trabalho',
      amount: 1200.00,
      type: 'income',
      date: '2024-12-07',
      description: 'Desenvolvimento site cliente'
    },
    {
      id: 4,
      title: 'Posto Shell',
      category: 'Transporte',
      amount: -180.00,
      type: 'expense',
      date: '2024-12-06',
      description: 'Abastecimento mensal'
    },
    {
      id: 5,
      title: 'Cinema Shopping',
      category: 'Lazer',
      amount: -45.00,
      type: 'expense',
      date: '2024-12-05',
      description: 'Filme com amigos'
    },
    {
      id: 6,
      title: 'Uber',
      category: 'Transporte',
      amount: -25.50,
      type: 'expense',
      date: '2024-12-04',
      description: 'Corrida para o trabalho'
    },
    {
      id: 7,
      title: 'Dividendos',
      category: 'Investimentos',
      amount: 150.00,
      type: 'income',
      date: '2024-12-03',
      description: 'Dividendos ações'
    },
    {
      id: 8,
      title: 'Farmácia',
      category: 'Saúde',
      amount: -85.90,
      type: 'expense',
      date: '2024-12-02',
      description: 'Medicamentos'
    }
  ];

  const categories = ['Alimentação', 'Transporte', 'Trabalho', 'Lazer', 'Saúde', 'Investimentos', 'Moradia', 'Educação'];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Trabalho': 'bg-green-100 text-green-800',
      'Alimentação': 'bg-red-100 text-red-800',
      'Transporte': 'bg-orange-100 text-orange-800',
      'Lazer': 'bg-blue-100 text-blue-800',
      'Saúde': 'bg-purple-100 text-purple-800',
      'Investimentos': 'bg-emerald-100 text-emerald-800',
      'Moradia': 'bg-yellow-100 text-yellow-800',
      'Educação': 'bg-indigo-100 text-indigo-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const exportToCSV = () => {
    const headers = ['Título', 'Categoria', 'Tipo', 'Valor', 'Data', 'Descrição'];
    const csvContent = [
      headers.join(','),
      ...filteredTransactions.map(t => [
        t.title,
        t.category,
        t.type === 'income' ? 'Receita' : 'Despesa',
        t.amount,
        t.date,
        t.description
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'transacoes.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lançamentos</h1>
          <p className="text-gray-500 mt-1">Gerencie suas receitas e despesas</p>
        </div>
        <Button onClick={exportToCSV} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar CSV
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Receitas</p>
                <p className="text-xl font-bold text-green-600">
                  R$ {totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Despesas</p>
                <p className="text-xl font-bold text-red-600">
                  R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Saldo</p>
                <p className={`text-xl font-bold ${
                  (totalIncome - totalExpenses) >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  R$ {(totalIncome - totalExpenses).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por título ou descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="income">Receitas</SelectItem>
                  <SelectItem value="expense">Despesas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Categoria</label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              Transações ({filteredTransactions.length})
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {filteredTransactions.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Nenhuma transação encontrada com os filtros aplicados.</p>
              </div>
            ) : (
              filteredTransactions.map((transaction) => (
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
                      
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionList;
