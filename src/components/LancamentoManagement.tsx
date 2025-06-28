import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import { useLancamentos } from '@/hooks/useLancamentos';
import { useCategorias } from '@/hooks/useCategorias';
import { useAuth } from '@/hooks/useAuth';
import { Lancamento, FiltrosLancamento } from '@/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';

const LancamentoManagement = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingLancamento, setEditingLancamento] = useState<Lancamento | null>(null);
  const { lancamentos, addLancamento, updateLancamento, deleteLancamento, loading } = useLancamentos();
  const { categorias, getCategoriasByTipo } = useCategorias();
  const { isAdmin } = useAuth();
  const { toast } = useToast();

  const [filtros, setFiltros] = useState<FiltrosLancamento>({
    tipo: 'todos',
    categoria: '',
    dataInicio: '',
    dataFim: '',
    busca: ''
  });

  const [formData, setFormData] = useState({
    titulo: '',
    valor: '',
    data: '',
    tipo: 'despesa' as 'receita' | 'despesa',
    categoria_id: '',
    descricao: ''
  });

  const handleCreateLancamento = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAdmin) {
      toast({
        title: "Acesso Negado",
        description: "Apenas administradores podem adicionar lançamentos",
        variant: "destructive"
      });
      return;
    }

    try {
      const lancamentoData = {
        titulo: formData.titulo,
        valor: parseFloat(formData.valor),
        data: formData.data,
        tipo: formData.tipo,
        categoria_id: formData.categoria_id,
        descricao: formData.descricao || undefined
      };

      await addLancamento(lancamentoData);
      toast({
        title: "Sucesso",
        description: "Lançamento criado com sucesso"
      });
      resetForm();
      setIsCreateModalOpen(false);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleUpdateLancamento = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingLancamento) return;

    if (!isAdmin) {
      toast({
        title: "Acesso Negado",
        description: "Apenas administradores podem editar lançamentos",
        variant: "destructive"
      });
      return;
    }

    try {
      const lancamentoData = {
        titulo: formData.titulo,
        valor: parseFloat(formData.valor),
        data: formData.data,
        tipo: formData.tipo,
        categoria_id: formData.categoria_id,
        descricao: formData.descricao || undefined
      };

      await updateLancamento(editingLancamento.id, lancamentoData);
      toast({
        title: "Sucesso",
        description: "Lançamento atualizado com sucesso"
      });
      resetForm();
      setEditingLancamento(null);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleEdit = (lancamento: Lancamento) => {
    if (!isAdmin) {
      toast({
        title: "Acesso Negado",
        description: "Apenas administradores podem editar lançamentos",
        variant: "destructive"
      });
      return;
    }

    setEditingLancamento(lancamento);
    setFormData({
      titulo: lancamento.titulo,
      valor: lancamento.valor.toString(),
      data: lancamento.data,
      tipo: lancamento.tipo,
      categoria_id: lancamento.categoriaId,
      descricao: lancamento.descricao || ''
    });
  };

  const handleDelete = async (id: string) => {
    if (!isAdmin) {
      toast({
        title: "Acesso Negado",
        description: "Apenas administradores podem excluir lançamentos",
        variant: "destructive"
      });
      return;
    }

    if (confirm('Tem certeza que deseja deletar este lançamento?')) {
      try {
        await deleteLancamento(id);
        toast({
          title: "Sucesso",
          description: "Lançamento excluído com sucesso"
        });
      } catch (error: any) {
        toast({
          title: "Erro",
          description: error.message,
          variant: "destructive"
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      titulo: '',
      valor: '',
      data: '',
      tipo: 'despesa',
      categoria_id: '',
      descricao: ''
    });
  };

  // Filtrar lançamentos
  const lancamentosFiltrados = lancamentos.filter(lancamento => {
    const matchesTipo = filtros.tipo === 'todos' || lancamento.tipo === filtros.tipo;
    const matchesCategoria = !filtros.categoria || lancamento.categoriaId === filtros.categoria;
    const matchesDataInicio = !filtros.dataInicio || lancamento.data >= filtros.dataInicio;
    const matchesDataFim = !filtros.dataFim || lancamento.data <= filtros.dataFim;
    const matchesBusca = !filtros.busca || 
      lancamento.titulo.toLowerCase().includes(filtros.busca.toLowerCase()) ||
      (lancamento.descricao && lancamento.descricao.toLowerCase().includes(filtros.busca.toLowerCase()));

    return matchesTipo && matchesCategoria && matchesDataInicio && matchesDataFim && matchesBusca;
  });

  const getCategoriaName = (categoriaId: string) => {
    const categoria = categorias.find(c => c.id === categoriaId);
    return categoria?.nome || 'Categoria não encontrada';
  };

  const getCategoriaColor = (categoriaId: string) => {
    const categoria = categorias.find(c => c.id === categoriaId);
    return categoria?.cor || '#6b7280';
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Lançamentos</h1>
          <p className="text-muted-foreground">
            {isAdmin ? 'Controle suas receitas e despesas' : 'Visualize os lançamentos do sistema'}
          </p>
          {!isAdmin && (
            <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <Eye className="inline w-4 h-4 mr-1" />
                Modo de visualização - Apenas administradores podem fazer alterações
              </p>
            </div>
          )}
        </div>
        
        {isAdmin && (
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Lançamento
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Novo Lançamento</DialogTitle>
                <DialogDescription>
                  Adicione uma nova receita ou despesa
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateLancamento} className="space-y-4">
                <div>
                  <Label htmlFor="titulo">Título</Label>
                  <Input
                    id="titulo"
                    value={formData.titulo}
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
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
                  <Label htmlFor="tipo">Tipo</Label>
                  <Select value={formData.tipo} onValueChange={(value) => setFormData({ ...formData, tipo: value as 'receita' | 'despesa' })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="receita">Receita</SelectItem>
                      <SelectItem value="despesa">Despesa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="categoria">Categoria</Label>
                  <Select value={formData.categoria_id} onValueChange={(value) => setFormData({ ...formData, categoria_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {getCategoriasByTipo(formData.tipo).map((categoria) => (
                        <SelectItem key={categoria.id} value={categoria.id}>
                          {categoria.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="data">Data</Label>
                  <Input
                    id="data"
                    type="date"
                    value={formData.data}
                    onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="descricao">Descrição (opcional)</Label>
                  <Input
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    <Plus className="mr-2 h-4 w-4" />
                    Criar Lançamento
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="busca">Buscar</Label>
              <Input
                id="busca"
                placeholder="Título ou descrição..."
                value={filtros.busca}
                onChange={(e) => setFiltros({ ...filtros, busca: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="tipo">Tipo</Label>
              <Select value={filtros.tipo} onValueChange={(value) => setFiltros({ ...filtros, tipo: value as any })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="receita">Receitas</SelectItem>
                  <SelectItem value="despesa">Despesas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="categoria">Categoria</Label>
              <Select value={filtros.categoria} onValueChange={(value) => setFiltros({ ...filtros, categoria: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas as categorias</SelectItem>
                  {categorias.map((categoria) => (
                    <SelectItem key={categoria.id} value={categoria.id}>
                      {categoria.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dataInicio">Data Início</Label>
              <Input
                id="dataInicio"
                type="date"
                value={filtros.dataInicio}
                onChange={(e) => setFiltros({ ...filtros, dataInicio: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="dataFim">Data Fim</Label>
              <Input
                id="dataFim"
                type="date"
                value={filtros.dataFim}
                onChange={(e) => setFiltros({ ...filtros, dataFim: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Lançamentos */}
      <Card>
        <CardHeader>
          <CardTitle>Lançamentos</CardTitle>
          <CardDescription>
            {lancamentosFiltrados.length} lançamento(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                {isAdmin && <TableHead className="text-right">Ações</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {lancamentosFiltrados.map((lancamento) => (
                <TableRow key={lancamento.id}>
                  <TableCell>
                    {format(new Date(lancamento.data), 'dd/MM/yyyy', { locale: ptBR })}
                  </TableCell>
                  <TableCell className="font-medium">{lancamento.titulo}</TableCell>
                  <TableCell>
                    <Badge 
                      style={{ backgroundColor: getCategoriaColor(lancamento.categoriaId) }}
                      className="text-white"
                    >
                      {getCategoriaName(lancamento.categoriaId)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={lancamento.tipo === 'receita' ? 'default' : 'secondary'}>
                      {lancamento.tipo === 'receita' ? 'Receita' : 'Despesa'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={lancamento.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}>
                      {lancamento.tipo === 'receita' ? '+' : '-'} R$ {lancamento.valor.toFixed(2)}
                    </span>
                  </TableCell>
                  {isAdmin && (
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(lancamento)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(lancamento.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de Edição */}
      {editingLancamento && (
        <Dialog open={!!editingLancamento} onOpenChange={() => setEditingLancamento(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Lançamento</DialogTitle>
              <DialogDescription>
                Atualize os dados do lançamento
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpdateLancamento} className="space-y-4">
              <div>
                <Label htmlFor="edit-titulo">Título</Label>
                <Input
                  id="edit-titulo"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-valor">Valor</Label>
                <Input
                  id="edit-valor"
                  type="number"
                  step="0.01"
                  value={formData.valor}
                  onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-tipo">Tipo</Label>
                <Select value={formData.tipo} onValueChange={(value) => setFormData({ ...formData, tipo: value as 'receita' | 'despesa' })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="receita">Receita</SelectItem>
                    <SelectItem value="despesa">Despesa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-categoria">Categoria</Label>
                <Select value={formData.categoria_id} onValueChange={(value) => setFormData({ ...formData, categoria_id: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {getCategoriasByTipo(formData.tipo).map((categoria) => (
                      <SelectItem key={categoria.id} value={categoria.id}>
                        {categoria.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-data">Data</Label>
                <Input
                  id="edit-data"
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-descricao">Descrição (opcional)</Label>
                <Input
                  id="edit-descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setEditingLancamento(null)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  <Edit className="mr-2 h-4 w-4" />
                  Atualizar Lançamento
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default LancamentoManagement; 