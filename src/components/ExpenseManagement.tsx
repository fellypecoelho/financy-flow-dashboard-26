
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Receipt, Filter } from 'lucide-react';

const ExpenseManagement = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [expenses, setExpenses] = useState([
    {
      id: '1',
      descricao: 'Aluguel',
      valor: 2500.00,
      categoria: 'Habitação',
      data_vencimento: '2024-12-25',
      status: 'pendente',
      forma_pagamento: 'pix'
    },
    {
      id: '2',
      descricao: 'Supermercado',
      valor: 450.00,
      categoria: 'Alimentação',
      data_vencimento: '2024-12-20',
      status: 'pago',
      forma_pagamento: 'cartao'
    }
  ]);

  const [formData, setFormData] = useState({
    descricao: '',
    valor: '',
    categoria_id: '',
    data_vencimento: '',
    forma_pagamento: 'pix',
    status: 'pendente'
  });

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense = {
      id: Date.now().toString(),
      ...formData,
      valor: parseFloat(formData.valor),
    };
    setExpenses([...expenses, newExpense]);
    setFormData({
      descricao: '',
      valor: '',
      categoria_id: '',
      data_vencimento: '',
      forma_pagamento: 'pix',
      status: 'pendente'
    });
    setIsCreateModalOpen(false);
  };

  const handleDeleteExpense = (id: string) => {
    if (confirm('Tem certeza que deseja deletar esta despesa?')) {
      setExpenses(expenses.filter(exp => exp.id !== id));
    }
  };

  const totalPendente = expenses.filter(e => e.status === 'pendente').reduce((sum, e) => sum + e.valor, 0);
  const totalPago = expenses.filter(e => e.status === 'pago').reduce((sum, e) => sum + e.valor, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Despesas</h1>
          <p className="text-muted-foreground">
            Controle e acompanhe todas as despesas
          </p>
        </div>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Despesa
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Nova Despesa</DialogTitle>
              <DialogDescription>
                Adicione uma nova despesa ao sistema
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateExpense} className="space-y-4">
              <div>
                <Label htmlFor="descricao">Descrição</Label>
                <Input
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="valor">Valor</Label>
                <Input
                  id="valor"
                  type="number"
                  step="0.01"
                  value={formData.valor}
                  onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="data_vencimento">Data de Vencimento</Label>
                <Input
                  id="data_vencimento"
                  type="date"
                  value={formData.data_vencimento}
                  onChange={(e) => setFormData({ ...formData, data_vencimento: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="forma_pagamento">Forma de Pagamento</Label>
                <Select value={formData.forma_pagamento} onValueChange={(value) => setFormData({ ...formData, forma_pagamento: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pix">PIX</SelectItem>
                    <SelectItem value="cartao">Cartão</SelectItem>
                    <SelectItem value="dinheiro">Dinheiro</SelectItem>
                    <SelectItem value="transferencia">Transferência</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  Criar Despesa
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pendente</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              R$ {totalPendente.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pago</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {totalPago.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Geral</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {(totalPendente + totalPago).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Despesas</CardTitle>
          <CardDescription>Todas as despesas cadastradas no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descrição</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Pagamento</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.descricao}</TableCell>
                  <TableCell>R$ {expense.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                  <TableCell>{expense.categoria}</TableCell>
                  <TableCell>{new Date(expense.data_vencimento).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>
                    <Badge variant={expense.status === 'pago' ? 'default' : 'destructive'}>
                      {expense.status === 'pago' ? 'Pago' : 'Pendente'}
                    </Badge>
                  </TableCell>
                  <TableCell>{expense.forma_pagamento.toUpperCase()}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteExpense(expense.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseManagement;
