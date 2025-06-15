import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Receipt, Settings } from 'lucide-react';
import { useDespesas } from '@/hooks/useDespesas';
import { useCategorias } from '@/hooks/useCategorias';
import CategoryModal from '@/components/expenses/CategoryModal';
import CategoryIcon from '@/components/ui/CategoryIcon';

const ExpenseManagement = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const { despesas, createDespesa, deleteDespesa, isLoading } = useDespesas();
  const { categorias } = useCategorias();

  const [formData, setFormData] = useState({
    descricao: '',
    valor: '',
    categoria_id: '',
    data_vencimento: '',
    forma_pagamento: 'transferencia' as 'transferencia' | 'cartao' | 'dinheiro',
    status: 'pendente' as 'pendente' | 'pago'
  });

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    
    const despesaData = {
      descricao: formData.descricao,
      origem: 'Manual', // Valor padrão
      categoria_id: formData.categoria_id,
      valor: parseFloat(formData.valor),
      data_compra: formData.data_vencimento, // Usando mesma data por enquanto
      data_vencimento: formData.data_vencimento,
      forma_pagamento: formData.forma_pagamento,
      status: formData.status,
      tipo: 'unica' as 'unica'
    };

    createDespesa(despesaData);
    setFormData({
      descricao: '',
      valor: '',
      categoria_id: '',
      data_vencimento: '',
      forma_pagamento: 'transferencia',
      status: 'pendente'
    });
    setIsCreateModalOpen(false);
  };

  const handleDeleteExpense = (id: string) => {
    if (confirm('Tem certeza que deseja deletar esta despesa?')) {
      deleteDespesa(id);
    }
  };

  const handleManageCategories = () => {
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategories = () => {
    // As categorias são automaticamente atualizadas pelo hook useCategorias
    setIsCategoryModalOpen(false);
  };

  const totalPendente = despesas.filter(e => e.status === 'pendente').reduce((sum, e) => sum + e.valor, 0);
  const totalPago = despesas.filter(e => e.status === 'pago').reduce((sum, e) => sum + e.valor, 0);

  const getCategoriaName = (categoriaId: string) => {
    const categoria = categorias.find(c => c.id === categoriaId);
    return categoria?.nome || 'Categoria não encontrada';
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Despesas</h1>
          <p className="text-muted-foreground">
            Controle e acompanhe todas as despesas
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleManageCategories}>
            <Settings className="mr-2 h-4 w-4" />
            Gerenciar Categorias
          </Button>
          
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
                  <Label htmlFor="categoria">Categoria</Label>
                  <Select value={formData.categoria_id} onValueChange={(value) => setFormData({ ...formData, categoria_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.map((categoria) => (
                        <SelectItem key={categoria.id} value={categoria.id}>
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-4 h-4 rounded flex items-center justify-center"
                              style={{ backgroundColor: categoria.cor }}
                            >
                              <CategoryIcon 
                                iconName={categoria.icone} 
                                size={12} 
                                className="text-white" 
                              />
                            </div>
                            <span>{categoria.nome}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  <Select value={formData.forma_pagamento} onValueChange={(value) => setFormData({ ...formData, forma_pagamento: value as typeof formData.forma_pagamento })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="transferencia">Transferência</SelectItem>
                      <SelectItem value="cartao">Cartão</SelectItem>
                      <SelectItem value="dinheiro">Dinheiro</SelectItem>
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
              {despesas.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.descricao}</TableCell>
                  <TableCell>R$ {expense.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                  <TableCell>{getCategoriaName(expense.categoriaId)}</TableCell>
                  <TableCell>{new Date(expense.dataVencimento).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>
                    <Badge variant={expense.status === 'pago' ? 'default' : 'destructive'}>
                      {expense.status === 'pago' ? 'Pago' : 'Pendente'}
                    </Badge>
                  </TableCell>
                  <TableCell>{expense.formaPagamento.toUpperCase()}</TableCell>
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

      {/* Modal de Gerenciamento de Categorias */}
      {isCategoryModalOpen && (
        <CategoryModal
          categorias={categorias}
          onSave={handleSaveCategories}
          onClose={() => setIsCategoryModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ExpenseManagement;
