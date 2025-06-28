# Sistema de Controle Financeiro

Um sistema completo de controle financeiro pessoal com autenticação, dashboard, gestão de lançamentos, metas e relatórios.

## 🚀 Funcionalidades

- **Autenticação Segura**: Login e registro com Supabase Auth
- **Dashboard Interativo**: Visão geral das finanças com gráficos
- **Gestão de Lançamentos**: Adicionar, editar e excluir receitas/despesas
- **Categorização**: Organize seus gastos por categorias
- **Metas Financeiras**: Defina e acompanhe suas metas
- **Relatórios**: Visualize relatórios detalhados
- **Sistema de Permissões**: Admin e Investidor com diferentes níveis de acesso
- **Interface Responsiva**: Funciona em desktop e mobile

## 🛠️ Tecnologias

- **Frontend**: React 18 + TypeScript + Vite
- **UI**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Gráficos**: Recharts
- **Formulários**: React Hook Form + Zod
- **Estado**: React Query + Context API

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Supabase

## 🔧 Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd financy-flow-dashboard-26
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o Supabase**

Crie um projeto no [Supabase](https://supabase.com) e configure as variáveis de ambiente:

```bash
# Crie um arquivo .env.local na raiz do projeto
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

4. **Execute as migrações do banco**

No painel do Supabase, vá para SQL Editor e execute o conteúdo do arquivo:
```
supabase/migrations/20250615172500-fba9b11e-125a-48eb-9eff-250f80d79187.sql
```

5. **Crie o usuário administrador**

Após executar as migrações, execute o seguinte SQL no Supabase para criar o primeiro admin:

```sql
SELECT public.create_admin_user(
  'admin@financas.com',  -- Email do admin
  'admin123',            -- Senha do admin
  'Administrador'        -- Nome do admin
);
```

**⚠️ IMPORTANTE**: Altere o email e senha para valores seguros!

6. **Execute o projeto**
```bash
npm run dev
```

O projeto estará disponível em `http://localhost:8080`

## 👥 Sistema de Permissões

### Administrador
- Acesso total ao sistema
- Pode criar, editar e excluir lançamentos
- Pode gerenciar categorias
- Pode criar novos usuários (admin ou investidor)
- Pode ativar/desativar usuários
- Visualiza dados de todos os usuários

### Investidor
- Acesso somente leitura
- Pode visualizar lançamentos, categorias e relatórios
- Não pode fazer alterações no sistema
- Visualiza apenas seus próprios dados

## 📱 Como Usar

### Login como Administrador
1. Acesse `http://localhost:8080`
2. Use as credenciais criadas no passo 5 da instalação
3. Você terá acesso completo ao sistema

### Criar Novos Usuários (Admin)
1. Faça login como administrador
2. Vá para o menu "Usuários"
3. Clique em "Novo Usuário"
4. Preencha os dados e escolha o tipo (admin ou investidor)
5. O usuário será criado e poderá fazer login imediatamente

### Login como Investidor
1. Use as credenciais fornecidas pelo administrador
2. Você terá acesso somente leitura ao sistema
3. Pode visualizar dados mas não fazer alterações

## 🗄️ Estrutura do Banco

### Tabelas Principais
- **profiles**: Perfis dos usuários (admin/investidor)
- **categorias**: Categorias de receitas e despesas
- **lancamentos**: Lançamentos financeiros
- **metas**: Metas financeiras dos usuários

### Políticas de Segurança (RLS)
- Admins podem ver e modificar todos os dados
- Investidores só podem ver seus próprios dados
- Todas as operações de escrita são restritas a admins

## 🔒 Segurança

- Autenticação via Supabase Auth
- Row Level Security (RLS) no PostgreSQL
- Validação de formulários com Zod
- Proteção de rotas
- Senhas criptografadas

## 📊 Funcionalidades do Dashboard

- **Saldo Total**: Saldo atual da conta
- **Receitas do Mês**: Total de receitas do mês atual
- **Despesas do Mês**: Total de despesas do mês atual
- **Saldo do Mês**: Diferença entre receitas e despesas
- **Gráfico de Categorias**: Distribuição de gastos por categoria
- **Lançamentos Recentes**: Últimos lançamentos realizados
- **Evolução Mensal**: Gráfico de evolução financeira

## 🎯 Metas Financeiras

- Defina metas de economia ou limite de gastos
- Acompanhe o progresso em tempo real
- Metas podem ser por categoria ou gerais
- Visualização clara do progresso

## 📈 Relatórios

- **Relatório Geral**: Visão geral das finanças
- **Relatório por Categoria**: Análise detalhada por categoria
- **Relatório de Fluxo de Caixa**: Entradas e saídas
- **Exportação**: Exporte relatórios em diferentes formatos

## 🚀 Deploy

### Vercel
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático

### Netlify
1. Conecte seu repositório ao Netlify
2. Configure as variáveis de ambiente
3. Deploy automático

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique se todas as dependências estão instaladas
2. Confirme se as variáveis de ambiente estão configuradas
3. Verifique se as migrações foram executadas corretamente
4. Abra uma issue no repositório

## 🔄 Atualizações

Para atualizar o projeto:

```bash
git pull origin main
npm install
npm run dev
```

---

**Desenvolvido com ❤️ para controle financeiro pessoal**
