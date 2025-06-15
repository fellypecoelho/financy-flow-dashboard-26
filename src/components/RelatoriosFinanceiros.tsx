
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { BarChart3, Download, Filter, PieChart as PieChartIcon, TrendingUp } from 'lucide-react';

const RelatoriosFinanceiros = () => {
  const [filtros, setFiltros] = useState({
    periodo: '2024-12',
    categoria: 'todas',
    investidor: 'todos'
  });

  // Dados para os gráficos
  const despesasPorCategoria = [
    { categoria: 'Habitação', valor: 2500, cor: '#8884d8' },
    { categoria: 'Alimentação', valor: 800, cor: '#82ca9d' },
    { categoria: 'Transporte', valor: 600, cor: '#ffc658' },
    { categoria: 'Lazer', valor: 400, cor: '#ff7c7c' },
    { categoria: 'Outros', valor: 300, cor: '#8dd1e1' }
  ];

  const fluxoCaixaMensal = [
    { mes: 'Jul', receitas: 15000, despesas: 12000, saldo: 3000 },
    { mes: 'Ago', receitas: 18000, despesas: 13500, saldo: 4500 },
    { mes: 'Set', receitas: 16000, despesas: 14000, saldo: 2000 },
    { mes: 'Out', receitas: 20000, despesas: 15000, saldo: 5000 },
    { mes: 'Nov', receitas: 17000, despesas: 13000, saldo: 4000 },
    { mes: 'Dez', receitas: 19000, despesas: 14500, saldo: 4500 }
  ];

  const investidoresSaldo = [
    { nome: 'João Silva', saldo: 15000 },
    { nome: 'Maria Santos', saldo: 8500 },
    { nome: 'Pedro Costa', saldo: 5000 },
    { nome: 'Ana Lima', saldo: 12000 }
  ];

  const handleExportRelatorio = (tipo: string) => {
    console.log(`Exportando relatório: ${tipo}`);
    // Aqui seria implementada a lógica de exportação
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios Financeiros</h1>
          <p className="text-muted-foreground">
            Analise os dados financeiros com gráficos e relatórios detalhados
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExportRelatorio('pdf')}>
            <Download className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
          <Button variant="outline" onClick={() => handleExportRelatorio('excel')}>
            <Download className="mr-2 h-4 w-4" />
            Exportar Excel
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="periodo">Período</Label>
              <Input
                id="periodo"
                type="month"
                value={filtros.periodo}
                onChange={(e) => setFiltros({ ...filtros, periodo: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="categoria">Categoria</Label>
              <Select value={filtros.categoria} onValueChange={(value) => setFiltros({ ...filtros, categoria: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as categorias</SelectItem>
                  <SelectItem value="habitacao">Habitação</SelectItem>
                  <SelectItem value="alimentacao">Alimentação</SelectItem>
                  <SelectItem value="transporte">Transporte</SelectItem>
                  <SelectItem value="lazer">Lazer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="investidor">Investidor</Label>
              <Select value={filtros.investidor} onValueChange={(value) => setFiltros({ ...filtros, investidor: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os investidores</SelectItem>
                  <SelectItem value="joao">João Silva</SelectItem>
                  <SelectItem value="maria">Maria Santos</SelectItem>
                  <SelectItem value="pedro">Pedro Costa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs com diferentes relatórios */}
      <Tabs defaultValue="categorias" className="space-y-4">
        <TabsList>
          <TabsTrigger value="categorias">Despesas por Categoria</TabsTrigger>
          <TabsTrigger value="fluxo">Fluxo de Caixa</TabsTrigger>
          <TabsTrigger value="investidores">Saldos dos Investidores</TabsTrigger>
        </TabsList>
        
        <TabsContent value="categorias" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5" />
                  Distribuição por Categoria
                </CardTitle>
                <CardDescription>Visualização das despesas por categoria</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={despesasPorCategoria}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="valor"
                      label={({ categoria, valor }) => `${categoria}: R$ ${valor.toLocaleString('pt-BR')}`}
                    >
                      {despesasPorCategoria.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.cor} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Valor']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Valores por Categoria
                </CardTitle>
                <CardDescription>Comparação dos valores entre categorias</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={despesasPorCategoria}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="categoria" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Valor']} />
                    <Bar dataKey="valor" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="fluxo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Fluxo de Caixa Mensal
              </CardTitle>
              <CardDescription>Evolução das receitas, despesas e saldo ao longo dos meses</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={fluxoCaixaMensal}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, '']} />
                  <Line type="monotone" dataKey="receitas" stroke="#82ca9d" strokeWidth={2} name="Receitas" />
                  <Line type="monotone" dataKey="despesas" stroke="#ff7c7c" strokeWidth={2} name="Despesas" />
                  <Line type="monotone" dataKey="saldo" stroke="#8884d8" strokeWidth={2} name="Saldo" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="investidores" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Saldos dos Investidores</CardTitle>
              <CardDescription>Distribuição dos saldos entre os investidores</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={investidoresSaldo} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="nome" width={100} />
                  <Tooltip formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Saldo']} />
                  <Bar dataKey="saldo" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RelatoriosFinanceiros;
