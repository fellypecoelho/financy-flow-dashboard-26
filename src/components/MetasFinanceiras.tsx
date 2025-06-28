import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Plus, Target, TrendingUp, TrendingDown } from 'lucide-react';
import { useCategorias } from '@/hooks/useCategorias';
import { Meta } from '@/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const MetasFinanceiras = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { categoriasDespesa } = useCategorias();

  // Dados mock para demonstração
  const metas: Meta[] = [
    {
      id: '1',
      titulo: 'Economizar para viagem',
      valor: 5000,
      tipo: 'economia',
      mes: '2024-12',
      valorAtual: 3200,
      created_at: '2024-12-01'
    },
    {
      id: '2',
      titulo: 'Limite de gastos com alimentação',
      valor: 800,
      tipo: 'limite',
      categoriaId: '1',
      mes: '2024-12',
      valorAtual: 450,
      created_at: '2024-12-01'
    },
    {
      id: '3',
      titulo: 'Limite de gastos com lazer',
      valor: 300,
      tipo: 'limite',
      categoriaId: '4',
      mes: '2024-12',
      valorAtual: 280,
      created_at: '2024-12-01'
    }
  ];

  const [formData, setFormData] = useState({
    titulo: '',
    valor: '',
    tipo: 'economia' as 'economia' | 'limite',
    categoria_id: '',
    mes: format(new Date(), 'yyyy-MM')
  });

  const handleCreateMeta = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar criação de meta
    console.log('Criar meta:', formData);
    setIsCreateModalOpen(false);
  };

  const getCategoriaName = (categoriaId: string) => {
    const categoria = categoriasDespesa.find(c => c.id === categoriaId);
    return categoria?.nome || 'Categoria não encontrada';
  };

  const getProgressPercentage = (meta: Meta) => {
    if (meta.tipo === 'economia') {
      return Math.min((meta.valorAtual / meta.valor) * 100, 100);
    } else {
      return Math.min((meta.valorAtual / meta.valor) * 100, 100);
    }
  };

  const getProgressColor = (meta: Meta) => {
    const percentage = getProgressPercentage(meta);
    if (meta.tipo === 'economia') {
      return percentage >= 100 ? 'bg-green-500' : 'bg-blue-500';
    } else {
      return percentage >= 100 ? 'bg-red-500' : 'bg-orange-500';
    }
  };

  const getStatusText = (meta: Meta) => {
    const percentage = getProgressPercentage(meta);
    if (meta.tipo === 'economia') {
      if (percentage >= 100) return 'Meta atingida!';
      return `${percentage.toFixed(1)}% concluído`;
    } else {
      if (percentage >= 100) return 'Limite excedido!';
      return `${percentage.toFixed(1)}% utilizado`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Metas Financeiras</h1>
          <p className="text-muted-foreground">
            Defina e acompanhe suas metas de economia e limites de gastos
          </p>
        </div>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Meta
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Nova Meta</DialogTitle>
              <DialogDescription>
                Defina uma meta de economia ou limite de gastos
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateMeta} className="space-y-4">
              <div>
                <Label htmlFor="titulo">Título da Meta</Label>
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
                <Select value={formData.tipo} onValueChange={(value) => setFormData({ ...formData, tipo: value as 'economia' | 'limite' })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="economia">Meta de Economia</SelectItem>
                    <SelectItem value="limite">Limite de Gastos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.tipo === 'limite' && (
                <div>
                  <Label htmlFor="categoria">Categoria (opcional)</Label>
                  <Select value={formData.categoria_id} onValueChange={(value) => setFormData({ ...formData, categoria_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas as categorias" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todas as categorias</SelectItem>
                      {categoriasDespesa.map((categoria) => (
                        <SelectItem key={categoria.id} value={categoria.id}>
                          {categoria.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div>
                <Label htmlFor="mes">Mês</Label>
                <Input
                  id="mes"
                  type="month"
                  value={formData.mes}
                  onChange={(e) => setFormData({ ...formData, mes: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  Criar Meta
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cards de metas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metas.map((meta) => (
          <Card key={meta.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{meta.titulo}</CardTitle>
                {meta.tipo === 'economia' ? (
                  <TrendingUp className="h-5 w-5 text-green-600" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-orange-600" />
                )}
              </div>
              <CardDescription>
                {meta.tipo === 'economia' ? 'Meta de economia' : 'Limite de gastos'}
                {meta.categoriaId && (
                  <span className="ml-2">
                    • {getCategoriaName(meta.categoriaId)}
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {meta.tipo === 'economia' ? 'Economizado' : 'Gasto'}
                  </span>
                  <span className="font-medium">
                    R$ {meta.valorAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} / 
                    R$ {meta.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <Progress 
                  value={getProgressPercentage(meta)} 
                  className="h-2"
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {getStatusText(meta)}
                  </span>
                  <Badge variant={meta.tipo === 'economia' ? 'default' : 'secondary'}>
                    {meta.tipo === 'economia' ? 'Economia' : 'Limite'}
                  </Badge>
                </div>
              </div>
              
              {meta.tipo === 'economia' && meta.valorAtual >= meta.valor && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">
                    🎉 Parabéns! Você atingiu sua meta!
                  </p>
                </div>
              )}
              
              {meta.tipo === 'limite' && meta.valorAtual >= meta.valor && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800 font-medium">
                    ⚠️ Atenção! Você ultrapassou o limite.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dicas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Dicas para suas metas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-green-700">Metas de Economia</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Defina valores realistas</li>
                <li>• Acompanhe o progresso regularmente</li>
                <li>• Celebre pequenas conquistas</li>
                <li>• Automatize transferências</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-orange-700">Limites de Gastos</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Estabeleça limites por categoria</li>
                <li>• Monitore gastos diariamente</li>
                <li>• Ajuste conforme necessário</li>
                <li>• Use notificações de alerta</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetasFinanceiras; 