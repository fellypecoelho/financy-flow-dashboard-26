
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, BellOff, Mail, Smartphone, Settings, CheckCircle } from 'lucide-react';

const NotificacaoVencimentos = () => {
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);
  const [configuracoes, setConfiguracoes] = useState({
    antecedenciaDias: '3',
    tiposNotificacao: {
      email: true,
      push: false,
      sms: false
    },
    horarioNotificacao: '09:00',
    diasSemana: ['seg', 'ter', 'qua', 'qui', 'sex']
  });

  const proximosVencimentos = [
    {
      id: '1',
      descricao: 'Aluguel',
      valor: 2200.00,
      dataVencimento: '2024-12-15',
      diasRestantes: 2,
      prioridade: 'alta'
    },
    {
      id: '2',
      descricao: 'Conta de Luz',
      valor: 280.50,
      dataVencimento: '2024-12-17',
      diasRestantes: 4,
      prioridade: 'media'
    },
    {
      id: '3',
      descricao: 'Internet',
      valor: 89.90,
      dataVencimento: '2024-12-19',
      diasRestantes: 6,
      prioridade: 'baixa'
    }
  ];

  const handleTipoNotificacaoToggle = (tipo: string) => {
    setConfiguracoes(prev => ({
      ...prev,
      tiposNotificacao: {
        ...prev.tiposNotificacao,
        [tipo]: !prev.tiposNotificacao[tipo as keyof typeof prev.tiposNotificacao]
      }
    }));
  };

  const testarNotificacao = () => {
    alert('Notificação de teste enviada! Verifique sua caixa de entrada.');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            {notificacoesAtivas ? (
              <Bell className="h-5 w-5 text-blue-500" />
            ) : (
              <BellOff className="h-5 w-5 text-gray-400" />
            )}
            Notificações de Vencimento
          </CardTitle>
          <Switch
            checked={notificacoesAtivas}
            onCheckedChange={setNotificacoesAtivas}
          />
        </div>
        <CardDescription>
          Configure alertas automáticos para despesas próximas do vencimento
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {notificacoesAtivas ? (
          <>
            {/* Configurações de Antecedência */}
            <div>
              <h4 className="text-sm font-medium mb-3">Antecedência dos Alertas</h4>
              <Select 
                value={configuracoes.antecedenciaDias} 
                onValueChange={(value) => setConfiguracoes(prev => ({ ...prev, antecedenciaDias: value }))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 dia antes</SelectItem>
                  <SelectItem value="3">3 dias antes</SelectItem>
                  <SelectItem value="5">5 dias antes</SelectItem>
                  <SelectItem value="7">1 semana antes</SelectItem>
                  <SelectItem value="14">2 semanas antes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tipos de Notificação */}
            <div>
              <h4 className="text-sm font-medium mb-3">Canais de Notificação</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-blue-500" />
                    <div>
                      <div className="text-sm font-medium">Email</div>
                      <div className="text-xs text-gray-500">Notificações por email</div>
                    </div>
                  </div>
                  <Switch
                    checked={configuracoes.tiposNotificacao.email}
                    onCheckedChange={() => handleTipoNotificacaoToggle('email')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-4 h-4 text-green-500" />
                    <div>
                      <div className="text-sm font-medium">Push Notifications</div>
                      <div className="text-xs text-gray-500">Notificações no navegador</div>
                    </div>
                  </div>
                  <Switch
                    checked={configuracoes.tiposNotificacao.push}
                    onCheckedChange={() => handleTipoNotificacaoToggle('push')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-4 h-4 text-purple-500" />
                    <div>
                      <div className="text-sm font-medium">SMS</div>
                      <div className="text-xs text-gray-500">Mensagens de texto</div>
                    </div>
                  </div>
                  <Switch
                    checked={configuracoes.tiposNotificacao.sms}
                    onCheckedChange={() => handleTipoNotificacaoToggle('sms')}
                  />
                </div>
              </div>
            </div>

            {/* Horário das Notificações */}
            <div>
              <h4 className="text-sm font-medium mb-3">Horário das Notificações</h4>
              <input
                type="time"
                value={configuracoes.horarioNotificacao}
                onChange={(e) => setConfiguracoes(prev => ({ ...prev, horarioNotificacao: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Preview dos Próximos Alertas */}
            <div>
              <h4 className="text-sm font-medium mb-3">Próximos Alertas Programados</h4>
              <div className="space-y-2">
                {proximosVencimentos.map((vencimento) => {
                  const diasParaAlerta = vencimento.diasRestantes - parseInt(configuracoes.antecedenciaDias);
                  if (diasParaAlerta <= 0) return null;
                  
                  return (
                    <div key={vencimento.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <div className="text-sm font-medium">{vencimento.descricao}</div>
                        <div className="text-xs text-gray-500">
                          Alerta em {diasParaAlerta} dia{diasParaAlerta > 1 ? 's' : ''}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        R$ {vencimento.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Botão de Teste */}
            <div className="pt-4 border-t">
              <Button variant="outline" onClick={testarNotificacao} className="w-full">
                <CheckCircle className="w-4 h-4 mr-2" />
                Testar Notificação
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <BellOff className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Notificações Desativadas</h3>
            <p className="text-gray-500 mb-4">
              Ative as notificações para receber alertas sobre vencimentos próximos
            </p>
            <Button onClick={() => setNotificacoesAtivas(true)}>
              <Bell className="w-4 h-4 mr-2" />
              Ativar Notificações
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificacaoVencimentos;
