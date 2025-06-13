
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter, X, RotateCcw } from 'lucide-react';

interface FiltrosAvancadosProps {
  onFiltrosChange: (filtros: any) => void;
}

const FiltrosAvancados = ({ onFiltrosChange }: FiltrosAvancadosProps) => {
  const [filtrosAtivos, setFiltrosAtivos] = useState({
    categorias: [] as string[],
    investidores: [] as string[],
    statusDespesa: [] as string[],
    valorMin: '',
    valorMax: '',
    periodo: 'mes-atual'
  });

  const categorias = ['Moradia', 'Alimentação', 'Transporte', 'Saúde', 'Educação', 'Lazer'];
  const investidores = ['João Silva', 'Maria Santos', 'Pedro Costa', 'Ana Lima'];
  const statusOptions = ['Pago', 'Pendente', 'Atrasado'];

  const handleCategoriaToggle = (categoria: string) => {
    const novasCategorias = filtrosAtivos.categorias.includes(categoria)
      ? filtrosAtivos.categorias.filter(c => c !== categoria)
      : [...filtrosAtivos.categorias, categoria];
    
    const novosFiltros = { ...filtrosAtivos, categorias: novasCategorias };
    setFiltrosAtivos(novosFiltros);
    onFiltrosChange(novosFiltros);
  };

  const handleInvestidorToggle = (investidor: string) => {
    const novosInvestidores = filtrosAtivos.investidores.includes(investidor)
      ? filtrosAtivos.investidores.filter(i => i !== investidor)
      : [...filtrosAtivos.investidores, investidor];
    
    const novosFiltros = { ...filtrosAtivos, investidores: novosInvestidores };
    setFiltrosAtivos(novosFiltros);
    onFiltrosChange(novosFiltros);
  };

  const handleStatusToggle = (status: string) => {
    const novosStatus = filtrosAtivos.statusDespesa.includes(status)
      ? filtrosAtivos.statusDespesa.filter(s => s !== status)
      : [...filtrosAtivos.statusDespesa, status];
    
    const novosFiltros = { ...filtrosAtivos, statusDespesa: novosStatus };
    setFiltrosAtivos(novosFiltros);
    onFiltrosChange(novosFiltros);
  };

  const limparFiltros = () => {
    const filtrosLimpos = {
      categorias: [],
      investidores: [],
      statusDespesa: [],
      valorMin: '',
      valorMax: '',
      periodo: 'mes-atual'
    };
    setFiltrosAtivos(filtrosLimpos);
    onFiltrosChange(filtrosLimpos);
  };

  const contarFiltrosAtivos = () => {
    return filtrosAtivos.categorias.length + 
           filtrosAtivos.investidores.length + 
           filtrosAtivos.statusDespesa.length +
           (filtrosAtivos.valorMin ? 1 : 0) +
           (filtrosAtivos.valorMax ? 1 : 0);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Filter className="h-5 w-5 text-blue-500" />
            Filtros Avançados
            {contarFiltrosAtivos() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {contarFiltrosAtivos()} ativo{contarFiltrosAtivos() > 1 ? 's' : ''}
              </Badge>
            )}
          </CardTitle>
          {contarFiltrosAtivos() > 0 && (
            <Button variant="outline" size="sm" onClick={limparFiltros}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Limpar
            </Button>
          )}
        </div>
        <CardDescription>
          Refine os dados dos relatórios aplicando filtros específicos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Filtro por Categorias */}
        <div>
          <h4 className="text-sm font-medium mb-3">Categorias</h4>
          <div className="flex flex-wrap gap-2">
            {categorias.map((categoria) => (
              <Badge
                key={categoria}
                variant={filtrosAtivos.categorias.includes(categoria) ? "default" : "outline"}
                className="cursor-pointer hover:bg-blue-100"
                onClick={() => handleCategoriaToggle(categoria)}
              >
                {categoria}
                {filtrosAtivos.categorias.includes(categoria) && (
                  <X className="w-3 h-3 ml-1" />
                )}
              </Badge>
            ))}
          </div>
        </div>

        {/* Filtro por Investidores */}
        <div>
          <h4 className="text-sm font-medium mb-3">Investidores</h4>
          <div className="flex flex-wrap gap-2">
            {investidores.map((investidor) => (
              <Badge
                key={investidor}
                variant={filtrosAtivos.investidores.includes(investidor) ? "default" : "outline"}
                className="cursor-pointer hover:bg-green-100"
                onClick={() => handleInvestidorToggle(investidor)}
              >
                {investidor}
                {filtrosAtivos.investidores.includes(investidor) && (
                  <X className="w-3 h-3 ml-1" />
                )}
              </Badge>
            ))}
          </div>
        </div>

        {/* Filtro por Status */}
        <div>
          <h4 className="text-sm font-medium mb-3">Status das Despesas</h4>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((status) => (
              <Badge
                key={status}
                variant={filtrosAtivos.statusDespesa.includes(status) ? "default" : "outline"}
                className="cursor-pointer hover:bg-orange-100"
                onClick={() => handleStatusToggle(status)}
              >
                {status}
                {filtrosAtivos.statusDespesa.includes(status) && (
                  <X className="w-3 h-3 ml-1" />
                )}
              </Badge>
            ))}
          </div>
        </div>

        {/* Filtro por Valor */}
        <div>
          <h4 className="text-sm font-medium mb-3">Faixa de Valores</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Valor Mínimo</label>
              <input
                type="number"
                placeholder="0,00"
                value={filtrosAtivos.valorMin}
                onChange={(e) => {
                  const novosFiltros = { ...filtrosAtivos, valorMin: e.target.value };
                  setFiltrosAtivos(novosFiltros);
                  onFiltrosChange(novosFiltros);
                }}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Valor Máximo</label>
              <input
                type="number"
                placeholder="10.000,00"
                value={filtrosAtivos.valorMax}
                onChange={(e) => {
                  const novosFiltros = { ...filtrosAtivos, valorMax: e.target.value };
                  setFiltrosAtivos(novosFiltros);
                  onFiltrosChange(novosFiltros);
                }}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FiltrosAvancados;
