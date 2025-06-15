
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Users, DollarSign } from 'lucide-react';
import { useInvestidores } from '@/hooks/useInvestidores';

const InvestidorManagement = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { investidores, createInvestidor, deleteInvestidor, updateInvestidor, isLoading } = useInvestidores();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    saldo_inicial: ''
  });

  const handleCreateInvestidor = (e: React.FormEvent) => {
    e.preventDefault();
    
    const investidorData = {
      nome: formData.nome,
      email: formData.email,
      saldo_atual: parseFloat(formData.saldo_inicial) || 0,
      ativo: true
    };

    createInvestidor(investidorData);
    setFormData({
      nome: '',
      email: '',
      saldo_inicial: ''
    });
    setIsCreateModalOpen(false);
  };

  const handleDeleteInvestidor = (id: string) => {
    if (confirm('Tem certeza que deseja deletar este investidor?')) {
      deleteInvestidor(id);
    }
  };

  const handleToggleStatus = (id: string, currentStatus: boolean) => {
    updateInvestidor({ id, ativo: !currentStatus });
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Carregando...</div>;
  }

  const totalInvestidores = investidores.length;
  const investidoresAtivos = investidores.filter(inv => inv.ativo).length;
  const saldoTotal = investidores.reduce((sum, inv) => sum + inv.saldo_atual, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Investidores</h1>
          <p className="text-muted-foreground">
            Gerencie todos os investidores e seus saldos
          </p>
        </div>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Investidor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Investidor</DialogTitle>
              <DialogDescription>
                Adicione um novo investidor ao sistema
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateInvestidor} className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="saldo_inicial">Saldo Inicial (opcional)</Label>
                <Input
                  id="saldo_inicial"
                  type="number"
                  step="0.01"
                  value={formData.saldo_inicial}
                  onChange={(e) => setFormData({ ...formData, saldo_inicial: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  Cadastrar Investidor
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Investidores</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInvestidores}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investidores Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{investidoresAtivos}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {saldoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Investidores</CardTitle>
          <CardDescription>Todos os investidores cadastrados no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Saldo Atual</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {investidores.map((investidor) => (
                <TableRow key={investidor.id}>
                  <TableCell className="font-medium">{investidor.nome}</TableCell>
                  <TableCell>{investidor.email}</TableCell>
                  <TableCell>R$ {investidor.saldo_atual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={investidor.ativo ? 'default' : 'destructive'}
                      className="cursor-pointer"
                      onClick={() => handleToggleStatus(investidor.id, investidor.ativo)}
                    >
                      {investidor.ativo ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteInvestidor(investidor.id)}
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

export default InvestidorManagement;
