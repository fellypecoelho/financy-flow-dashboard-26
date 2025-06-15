
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, CreditCard } from 'lucide-react';

const CartaoManagement = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [cartoes, setCartoes] = useState([
    {
      id: '1',
      nome: 'Cartão Principal',
      bandeira: 'Visa',
      limite: 5000.00,
      dia_fechamento: 15,
      dia_vencimento: 10,
      investidor: 'João Silva'
    },
    {
      id: '2',
      nome: 'Cartão Empresarial',
      bandeira: 'Mastercard',
      limite: 10000.00,
      dia_fechamento: 5,
      dia_vencimento: 25,
      investidor: 'Maria Santos'
    }
  ]);

  const [formData, setFormData] = useState({
    nome: '',
    bandeira: 'Visa',
    limite: '',
    dia_fechamento: '',
    dia_vencimento: '',
    investidor_id: ''
  });

  const investidores = [
    { id: '1', nome: 'João Silva' },
    { id: '2', nome: 'Maria Santos' },
    { id: '3', nome: 'Pedro Costa' }
  ];

  const handleCreateCartao = (e: React.FormEvent) => {
    e.preventDefault();
    const investidor = investidores.find(inv => inv.id === formData.investidor_id);
    const newCartao = {
      id: Date.now().toString(),
      ...formData,
      limite: parseFloat(formData.limite),
      dia_fechamento: parseInt(formData.dia_fechamento),
      dia_vencimento: parseInt(formData.dia_vencimento),
      investidor: investidor?.nome || ''
    };
    setCartoes([...cartoes, newCartao]);
    setFormData({
      nome: '',
      bandeira: 'Visa',
      limite: '',
      dia_fechamento: '',
      dia_vencimento: '',
      investidor_id: ''
    });
    setIsCreateModalOpen(false);
  };

  const handleDeleteCartao = (id: string) => {
    if (confirm('Tem certeza que deseja deletar este cartão?')) {
      setCartoes(cartoes.filter(cartao => cartao.id !== id));
    }
  };

  const limiteTotal = cartoes.reduce((sum, cartao) => sum + cartao.limite, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Cartões</h1>
          <p className="text-muted-foreground">
            Gerencie todos os cartões de crédito dos investidores
          </p>
        </div>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Cartão
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Cartão</DialogTitle>
              <DialogDescription>
                Adicione um novo cartão de crédito ao sistema
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateCartao} className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome do Cartão</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="bandeira">Bandeira</Label>
                <Select value={formData.bandeira} onValueChange={(value) => setFormData({ ...formData, bandeira: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Visa">Visa</SelectItem>
                    <SelectItem value="Mastercard">Mastercard</SelectItem>
                    <SelectItem value="Elo">Elo</SelectItem>
                    <SelectItem value="American Express">American Express</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="limite">Limite</Label>
                <Input
                  id="limite"
                  type="number"
                  step="0.01"
                  value={formData.limite}
                  onChange={(e) => setFormData({ ...formData, limite: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dia_fechamento">Dia do Fechamento</Label>
                  <Input
                    id="dia_fechamento"
                    type="number"
                    min="1"
                    max="31"
                    value={formData.dia_fechamento}
                    onChange={(e) => setFormData({ ...formData, dia_fechamento: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dia_vencimento">Dia do Vencimento</Label>
                  <Input
                    id="dia_vencimento"
                    type="number"
                    min="1"
                    max="31"
                    value={formData.dia_vencimento}
                    onChange={(e) => setFormData({ ...formData, dia_vencimento: e.target.value })}
                    required
                  />
                </div>
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
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  Cadastrar Cartão
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Cartões</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cartoes.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Limite Total</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {limiteTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Limite Médio</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {cartoes.length > 0 ? (limiteTotal / cartoes.length).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '0,00'}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Cartões</CardTitle>
          <CardDescription>Todos os cartões cadastrados no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Bandeira</TableHead>
                <TableHead>Limite</TableHead>
                <TableHead>Fechamento</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Investidor</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartoes.map((cartao) => (
                <TableRow key={cartao.id}>
                  <TableCell className="font-medium">{cartao.nome}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{cartao.bandeira}</Badge>
                  </TableCell>
                  <TableCell>R$ {cartao.limite.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                  <TableCell>Dia {cartao.dia_fechamento}</TableCell>
                  <TableCell>Dia {cartao.dia_vencimento}</TableCell>
                  <TableCell>{cartao.investidor}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteCartao(cartao.id)}
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

export default CartaoManagement;
