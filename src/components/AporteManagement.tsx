
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Trash2, TrendingUp } from 'lucide-react';

const AporteManagement = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [aportes, setAportes] = useState([
    {
      id: '1',
      descricao: 'Aporte inicial',
      valor: 10000.00,
      investidor: 'João Silva',
      data: '2024-12-01'
    },
    {
      id: '2',
      descricao: 'Aporte mensal',
      valor: 5000.00,
      investidor: 'Maria Santos',
      data: '2024-12-15'
    }
  ]);

  const [formData, setFormData] = useState({
    descricao: '',
    valor: '',
    investidor_id: '',
    data: ''
  });

  const investidores = [
    { id: '1', nome: 'João Silva' },
    { id: '2', nome: 'Maria Santos' },
    { id: '3', nome: 'Pedro Costa' }
  ];

  const handleCreateAporte = (e: React.FormEvent) => {
    e.preventDefault();
    const investidor = investidores.find(inv => inv.id === formData.investidor_id);
    const newAporte = {
      id: Date.now().toString(),
      ...formData,
      valor: parseFloat(formData.valor),
      investidor: investidor?.nome || ''
    };
    setAportes([...aportes, newAporte]);
    setFormData({
      descricao: '',
      valor: '',
      investidor_id: '',
      data: ''
    });
    setIsCreateModalOpen(false);
  };

  const handleDeleteAporte = (id: string) => {
    if (confirm('Tem certeza que deseja deletar este aporte?')) {
      setAportes(aportes.filter(aporte => aporte.id !== id));
    }
  };

  const totalAportes = aportes.reduce((sum, aporte) => sum + aporte.valor, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Aportes</h1>
          <p className="text-muted-foreground">
            Controle todos os aportes realizados pelos investidores
          </p>
        </div>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Aporte
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registrar Novo Aporte</DialogTitle>
              <DialogDescription>
                Registre um novo aporte de investidor
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateAporte} className="space-y-4">
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
                <Label htmlFor="investidor">Investidor</Label>
                <Select value={formData.investidor_id} onValueChange={(value) => setFormData({ ...formData, investidor_id: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um investidor" />
                  </SelectTrigger>
                  <SelectContent>
                    {investidores.map((investidor) => (
                      <SelectItem key={investidor.id} value={investidor.id}>
                        {investidor.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="data">Data do Aporte</Label>
                <Input
                  id="data"
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  Registrar Aporte
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Aportes</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {totalAportes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quantidade de Aportes</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{aportes.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média por Aporte</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {aportes.length > 0 ? (totalAportes / aportes.length).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '0,00'}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Aportes</CardTitle>
          <CardDescription>Todos os aportes registrados no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descrição</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Investidor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {aportes.map((aporte) => (
                <TableRow key={aporte.id}>
                  <TableCell className="font-medium">{aporte.descricao}</TableCell>
                  <TableCell>R$ {aporte.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                  <TableCell>{aporte.investidor}</TableCell>
                  <TableCell>{new Date(aporte.data).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteAporte(aporte.id)}
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

export default AporteManagement;
