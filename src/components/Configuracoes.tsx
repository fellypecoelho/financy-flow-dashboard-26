
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Settings, User, Bell, Shield, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Configuracoes = () => {
  const { toast } = useToast();
  const [configuracoes, setConfiguracoes] = useState({
    perfil: {
      nome: 'Administrador',
      email: 'fellypecoelho2306@gmail.com',
      telefone: '',
      empresa: 'Minha Empresa'
    },
    notificacoes: {
      emailVencimentos: true,
      emailRelatorios: false,
      pushNotifications: true,
      antecedenciaVencimento: '7'
    },
    sistema: {
      tema: 'light',
      idioma: 'pt-BR',
      timezone: 'America/Sao_Paulo',
      moeda: 'BRL'
    },
    backup: {
      automatico: true,
      frequencia: 'semanal',
      ultimoBackup: '2024-12-15'
    }
  });

  const handleSalvarConfiguracoes = (secao: string) => {
    console.log(`Salvando configurações da seção: ${secao}`);
    toast({
      title: "Configurações salvas!",
      description: "As configurações foram atualizadas com sucesso."
    });
  };

  const handleExportarDados = () => {
    console.log('Exportando dados...');
    toast({
      title: "Exportação iniciada",
      description: "Os dados estão sendo preparados para download."
    });
  };

  const handleImportarDados = () => {
    console.log('Importando dados...');
    toast({
      title: "Importação iniciada",
      description: "Os dados estão sendo processados."
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie as configurações do sistema e sua conta
        </p>
      </div>

      <Tabs defaultValue="perfil" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="perfil">Perfil</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
          <TabsTrigger value="sistema">Sistema</TabsTrigger>
          <TabsTrigger value="dados">Dados</TabsTrigger>
        </TabsList>
        
        <TabsContent value="perfil" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações Pessoais
              </CardTitle>
              <CardDescription>
                Atualize suas informações pessoais e de contato
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    value={configuracoes.perfil.nome}
                    onChange={(e) => setConfiguracoes({
                      ...configuracoes,
                      perfil: { ...configuracoes.perfil, nome: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={configuracoes.perfil.email}
                    onChange={(e) => setConfiguracoes({
                      ...configuracoes,
                      perfil: { ...configuracoes.perfil, email: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={configuracoes.perfil.telefone}
                    onChange={(e) => setConfiguracoes({
                      ...configuracoes,
                      perfil: { ...configuracoes.perfil, telefone: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="empresa">Empresa</Label>
                  <Input
                    id="empresa"
                    value={configuracoes.perfil.empresa}
                    onChange={(e) => setConfiguracoes({
                      ...configuracoes,
                      perfil: { ...configuracoes.perfil, empresa: e.target.value }
                    })}
                  />
                </div>
              </div>
              <Separator />
              <Button onClick={() => handleSalvarConfiguracoes('perfil')}>
                Salvar Alterações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notificacoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Preferências de Notificação
              </CardTitle>
              <CardDescription>
                Configure como e quando você deseja receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email de Vencimentos</Label>
                  <p className="text-sm text-muted-foreground">
                    Receber emails sobre vencimentos próximos
                  </p>
                </div>
                <Switch
                  checked={configuracoes.notificacoes.emailVencimentos}
                  onCheckedChange={(checked) => setConfiguracoes({
                    ...configuracoes,
                    notificacoes: { ...configuracoes.notificacoes, emailVencimentos: checked }
                  })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email de Relatórios</Label>
                  <p className="text-sm text-muted-foreground">
                    Receber relatórios mensais por email
                  </p>
                </div>
                <Switch
                  checked={configuracoes.notificacoes.emailRelatorios}
                  onCheckedChange={(checked) => setConfiguracoes({
                    ...configuracoes,
                    notificacoes: { ...configuracoes.notificacoes, emailRelatorios: checked }
                  })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações Push</Label>
                  <p className="text-sm text-muted-foreground">
                    Receber notificações no navegador
                  </p>
                </div>
                <Switch
                  checked={configuracoes.notificacoes.pushNotifications}
                  onCheckedChange={(checked) => setConfiguracoes({
                    ...configuracoes,
                    notificacoes: { ...configuracoes.notificacoes, pushNotifications: checked }
                  })}
                />
              </div>
              
              <div>
                <Label htmlFor="antecedencia">Antecedência para Vencimentos</Label>
                <Select 
                  value={configuracoes.notificacoes.antecedenciaVencimento} 
                  onValueChange={(value) => setConfiguracoes({
                    ...configuracoes,
                    notificacoes: { ...configuracoes.notificacoes, antecedenciaVencimento: value }
                  })}
                >
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 dia</SelectItem>
                    <SelectItem value="3">3 dias</SelectItem>
                    <SelectItem value="7">7 dias</SelectItem>
                    <SelectItem value="15">15 dias</SelectItem>
                    <SelectItem value="30">30 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              <Button onClick={() => handleSalvarConfiguracoes('notificacoes')}>
                Salvar Preferências
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sistema" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configurações do Sistema
              </CardTitle>
              <CardDescription>
                Ajuste as configurações gerais do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tema">Tema</Label>
                  <Select 
                    value={configuracoes.sistema.tema} 
                    onValueChange={(value) => setConfiguracoes({
                      ...configuracoes,
                      sistema: { ...configuracoes.sistema, tema: value }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Escuro</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="idioma">Idioma</Label>
                  <Select 
                    value={configuracoes.sistema.idioma} 
                    onValueChange={(value) => setConfiguracoes({
                      ...configuracoes,
                      sistema: { ...configuracoes.sistema, idioma: value }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="es-ES">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <Select 
                    value={configuracoes.sistema.timezone} 
                    onValueChange={(value) => setConfiguracoes({
                      ...configuracoes,
                      sistema: { ...configuracoes.sistema, timezone: value }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                      <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="moeda">Moeda</Label>
                  <Select 
                    value={configuracoes.sistema.moeda} 
                    onValueChange={(value) => setConfiguracoes({
                      ...configuracoes,
                      sistema: { ...configuracoes.sistema, moeda: value }
                    })}
                  >
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
              </div>
              
              <Separator />
              <Button onClick={() => handleSalvarConfiguracoes('sistema')}>
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="dados" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Gerenciamento de Dados
              </CardTitle>
              <CardDescription>
                Backup, importação e exportação de dados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Backup Automático</h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="space-y-0.5">
                    <Label>Backup Automático</Label>
                    <p className="text-sm text-muted-foreground">
                      Realizar backup automático dos dados
                    </p>
                  </div>
                  <Switch
                    checked={configuracoes.backup.automatico}
                    onCheckedChange={(checked) => setConfiguracoes({
                      ...configuracoes,
                      backup: { ...configuracoes.backup, automatico: checked }
                    })}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="frequencia">Frequência</Label>
                    <Select 
                      value={configuracoes.backup.frequencia} 
                      onValueChange={(value) => setConfiguracoes({
                        ...configuracoes,
                        backup: { ...configuracoes.backup, frequencia: value }
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diario">Diário</SelectItem>
                        <SelectItem value="semanal">Semanal</SelectItem>
                        <SelectItem value="mensal">Mensal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Último Backup</Label>
                    <p className="text-sm text-muted-foreground mt-2">
                      {new Date(configuracoes.backup.ultimoBackup).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-4">Exportar/Importar Dados</h3>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handleExportarDados}>
                    Exportar Dados
                  </Button>
                  <Button variant="outline" onClick={handleImportarDados}>
                    Importar Dados
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Exporte seus dados para backup ou importe dados de outro sistema
                </p>
              </div>
              
              <Separator />
              <Button onClick={() => handleSalvarConfiguracoes('dados')}>
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Configuracoes;
