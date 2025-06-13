
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Bell, 
  Palette, 
  Database, 
  Shield, 
  CreditCard,
  Calculator,
  Mail,
  Smartphone,
  Globe,
  Save,
  RefreshCw
} from 'lucide-react';

const Configuracoes = () => {
  const [notificacoes, setNotificacoes] = useState({
    email: true,
    push: false,
    vencimentos: true,
    relatorios: false
  });

  const [tema, setTema] = useState('claro');
  const [moeda, setMoeda] = useState('BRL');
  const [idioma, setIdioma] = useState('pt-BR');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground">Gerencie as configurações do seu sistema financeiro</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Restaurar Padrões
          </Button>
          <Button size="sm">
            <Save className="w-4 h-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Perfil do Usuário */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Perfil do Usuário
            </CardTitle>
            <CardDescription>
              Informações básicas da sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input id="nome" defaultValue="João Silva" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" defaultValue="joao@exemplo.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" defaultValue="(11) 99999-9999" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cargo">Cargo/Função</Label>
                <Input id="cargo" defaultValue="Administrador Financeiro" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notificações
            </CardTitle>
            <CardDescription>
              Configure como e quando receber notificações
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Notificações por E-mail</Label>
                <p className="text-sm text-muted-foreground">
                  Receba alertas e relatórios por e-mail
                </p>
              </div>
              <Switch 
                checked={notificacoes.email}
                onCheckedChange={(checked) => setNotificacoes(prev => ({ ...prev, email: checked }))}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Notificações Push</Label>
                <p className="text-sm text-muted-foreground">
                  Alertas no navegador em tempo real
                </p>
              </div>
              <Switch 
                checked={notificacoes.push}
                onCheckedChange={(checked) => setNotificacoes(prev => ({ ...prev, push: checked }))}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Alertas de Vencimento</Label>
                <p className="text-sm text-muted-foreground">
                  Avisos automáticos para contas próximas do vencimento
                </p>
              </div>
              <Switch 
                checked={notificacoes.vencimentos}
                onCheckedChange={(checked) => setNotificacoes(prev => ({ ...prev, vencimentos: checked }))}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Relatórios Automáticos</Label>
                <p className="text-sm text-muted-foreground">
                  Envio automático de relatórios mensais
                </p>
              </div>
              <Switch 
                checked={notificacoes.relatorios}
                onCheckedChange={(checked) => setNotificacoes(prev => ({ ...prev, relatorios: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Aparência */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Aparência e Interface
            </CardTitle>
            <CardDescription>
              Personalize a aparência do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tema">Tema</Label>
                <Select value={tema} onValueChange={setTema}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="claro">Claro</SelectItem>
                    <SelectItem value="escuro">Escuro</SelectItem>
                    <SelectItem value="auto">Automático</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="moeda">Moeda Padrão</Label>
                <Select value={moeda} onValueChange={setMoeda}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BRL">Real (R$)</SelectItem>
                    <SelectItem value="USD">Dólar ($)</SelectItem>
                    <SelectItem value="EUR">Euro (€)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="idioma">Idioma</Label>
                <Select value={idioma} onValueChange={setIdioma}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-BR">Português (BR)</SelectItem>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="es-ES">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configurações Financeiras */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Configurações Financeiras
            </CardTitle>
            <CardDescription>
              Parâmetros para cálculos e relatórios financeiros
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dias-vencimento">Dias para Alerta de Vencimento</Label>
                <Input id="dias-vencimento" type="number" defaultValue="7" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="limite-credito">Limite de Crédito Padrão</Label>
                <Input id="limite-credito" defaultValue="R$ 10.000,00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxa-juros">Taxa de Juros Padrão (%)</Label>
                <Input id="taxa-juros" type="number" step="0.01" defaultValue="2.5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="periodo-relatorio">Período Padrão dos Relatórios</Label>
                <Select defaultValue="mensal">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semanal">Semanal</SelectItem>
                    <SelectItem value="mensal">Mensal</SelectItem>
                    <SelectItem value="trimestral">Trimestral</SelectItem>
                    <SelectItem value="anual">Anual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Segurança */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Segurança
            </CardTitle>
            <CardDescription>
              Configurações de segurança e privacidade
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Autenticação de Dois Fatores</Label>
                  <p className="text-sm text-muted-foreground">
                    Adicione uma camada extra de segurança
                  </p>
                </div>
                <Badge variant="outline">Inativo</Badge>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="senha-atual">Senha Atual</Label>
                <Input id="senha-atual" type="password" placeholder="Digite sua senha atual" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nova-senha">Nova Senha</Label>
                  <Input id="nova-senha" type="password" placeholder="Digite a nova senha" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
                  <Input id="confirmar-senha" type="password" placeholder="Confirme a nova senha" />
                </div>
              </div>
              
              <Button variant="outline">Alterar Senha</Button>
            </div>
          </CardContent>
        </Card>

        {/* Backup e Dados */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Backup e Dados
            </CardTitle>
            <CardDescription>
              Gerenciamento de dados e backup do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Backup Automático</Label>
                <p className="text-sm text-muted-foreground">
                  Backup diário automático dos dados
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label>Último Backup</Label>
              <p className="text-sm text-muted-foreground">13/06/2025 às 03:00</p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline">
                <Database className="w-4 h-4 mr-2" />
                Fazer Backup Agora
              </Button>
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Restaurar Backup
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Configuracoes;
