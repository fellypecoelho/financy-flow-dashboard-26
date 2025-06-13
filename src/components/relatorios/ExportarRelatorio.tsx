
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, FileSpreadsheet, Mail, Calendar, Loader2 } from 'lucide-react';

interface ExportarRelatorioProps {
  dadosRelatorio: any;
  periodo: Date;
}

const ExportarRelatorio = ({ dadosRelatorio, periodo }: ExportarRelatorioProps) => {
  const [formatoSelecionado, setFormatoSelecionado] = useState('pdf');
  const [secoesSelecionadas, setSecoesSelecionadas] = useState({
    resumoFinanceiro: true,
    despesasDetalhadas: true,
    aportes: true,
    graficos: false,
    vencimentos: true
  });
  const [exportando, setExportando] = useState(false);

  const formatos = [
    { value: 'pdf', label: 'PDF', icon: FileText, description: 'Documento formatado para impressão' },
    { value: 'excel', label: 'Excel', icon: FileSpreadsheet, description: 'Planilha para análise de dados' },
    { value: 'csv', label: 'CSV', icon: FileSpreadsheet, description: 'Dados tabulares simples' }
  ];

  const secoes = [
    { id: 'resumoFinanceiro', label: 'Resumo Financeiro', description: 'Cards de totais e saldos' },
    { id: 'despesasDetalhadas', label: 'Despesas Detalhadas', description: 'Tabela completa de despesas' },
    { id: 'aportes', label: 'Aportes', description: 'Lista de todos os aportes do período' },
    { id: 'graficos', label: 'Gráficos', description: 'Charts visuais (apenas PDF)' },
    { id: 'vencimentos', label: 'Próximos Vencimentos', description: 'Despesas a vencer' }
  ];

  const handleSecaoToggle = (secaoId: string) => {
    setSecoesSelecionadas(prev => ({
      ...prev,
      [secaoId]: !prev[secaoId as keyof typeof prev]
    }));
  };

  const handleExportar = async () => {
    setExportando(true);
    
    // Simular processo de exportação
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const secoesSelecionadasArray = Object.entries(secoesSelecionadas)
      .filter(([_, selecionada]) => selecionada)
      .map(([secao, _]) => secao);

    console.log('Exportando relatório:', {
      formato: formatoSelecionado,
      secoes: secoesSelecionadasArray,
      periodo: periodo,
      dados: dadosRelatorio
    });

    // Simular download
    const nomeArquivo = `relatorio-financeiro-${periodo.getFullYear()}-${(periodo.getMonth() + 1).toString().padStart(2, '0')}.${formatoSelecionado}`;
    
    setExportando(false);
    
    // Em um cenário real, aqui seria feito o download do arquivo
    alert(`Relatório "${nomeArquivo}" exportado com sucesso!`);
  };

  const contarSecoesSelecionadas = () => {
    return Object.values(secoesSelecionadas).filter(Boolean).length;
  };

  const formatoAtual = formatos.find(f => f.value === formatoSelecionado);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Download className="h-5 w-5 text-green-500" />
          Exportar Relatório
        </CardTitle>
        <CardDescription>
          Gere e baixe relatórios personalizados em diferentes formatos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Seleção de Formato */}
        <div>
          <h4 className="text-sm font-medium mb-3">Formato de Exportação</h4>
          <Select value={formatoSelecionado} onValueChange={setFormatoSelecionado}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {formatos.map((formato) => (
                <SelectItem key={formato.value} value={formato.value}>
                  <div className="flex items-center gap-2">
                    <formato.icon className="w-4 h-4" />
                    <div>
                      <div className="font-medium">{formato.label}</div>
                      <div className="text-xs text-gray-500">{formato.description}</div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {formatoAtual && (
            <p className="text-xs text-gray-500 mt-2">{formatoAtual.description}</p>
          )}
        </div>

        {/* Seleção de Seções */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium">Seções do Relatório</h4>
            <Badge variant="outline">
              {contarSecoesSelecionadas()} de {secoes.length} selecionadas
            </Badge>
          </div>
          <div className="space-y-3">
            {secoes.map((secao) => (
              <div key={secao.id} className="flex items-start space-x-3">
                <Checkbox
                  id={secao.id}
                  checked={secoesSelecionadas[secao.id as keyof typeof secoesSelecionadas]}
                  onCheckedChange={() => handleSecaoToggle(secao.id)}
                  disabled={secao.id === 'graficos' && formatoSelecionado !== 'pdf'}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor={secao.id}
                    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer ${
                      secao.id === 'graficos' && formatoSelecionado !== 'pdf' ? 'text-gray-400' : ''
                    }`}
                  >
                    {secao.label}
                  </label>
                  <p className="text-xs text-muted-foreground">
                    {secao.description}
                    {secao.id === 'graficos' && formatoSelecionado !== 'pdf' && ' (Disponível apenas em PDF)'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Informações do Relatório */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Resumo da Exportação
          </h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div>Período: {periodo.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</div>
            <div>Formato: {formatoAtual?.label}</div>
            <div>Seções: {contarSecoesSelecionadas()} incluídas</div>
          </div>
        </div>

        {/* Botão de Exportação */}
        <Button 
          onClick={handleExportar}
          disabled={exportando || contarSecoesSelecionadas() === 0}
          className="w-full"
          size="lg"
        >
          {exportando ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Gerando Relatório...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Exportar Relatório
            </>
          )}
        </Button>

        {contarSecoesSelecionadas() === 0 && (
          <p className="text-xs text-red-500 text-center">
            Selecione pelo menos uma seção para exportar
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ExportarRelatorio;
